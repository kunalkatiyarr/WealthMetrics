package com.wealthmetrics.service.impl;

import com.wealthmetrics.dto.AnalyticsResponse;
import com.wealthmetrics.dto.DashboardSummaryDTO;
import com.wealthmetrics.dto.TransactionDTO;
import com.wealthmetrics.entity.*;
import com.wealthmetrics.repository.InvestmentRepository;
import com.wealthmetrics.repository.TransactionRepository;
import com.wealthmetrics.repository.UserRepository;
import com.wealthmetrics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public DashboardSummaryDTO getDashboardSummary(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Investment> investments = investmentRepository.findByUser(user);
        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);

        double realEstate = investments.stream().filter(i -> i.getType() == InvestmentType.REAL_ESTATE).mapToDouble(Investment::getAmount).sum();
        double stocks = investments.stream().filter(i -> i.getType() == InvestmentType.STOCKS).mapToDouble(Investment::getAmount).sum();
        double crypto = investments.stream().filter(i -> i.getType() == InvestmentType.CRYPTO).mapToDouble(Investment::getAmount).sum();
        double cash = investments.stream().filter(i -> i.getType() == InvestmentType.CASH).mapToDouble(Investment::getAmount).sum();
        double totalNetWorth = realEstate + stocks + crypto + cash;

        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();
        int currentYear = now.getYear();

        double monthlyInflow = transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .filter(t -> t.getDate().getMonthValue() == currentMonth && t.getDate().getYear() == currentYear)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double monthlyOutflow = transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .filter(t -> t.getDate().getMonthValue() == currentMonth && t.getDate().getYear() == currentYear)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double netSavings = monthlyInflow - monthlyOutflow;

        List<TransactionDTO> recentTransactions = transactions.stream()
                .limit(5)
                .map(t -> new TransactionDTO(t.getId(), t.getTitle(), t.getAmount(), t.getCategory(), t.getType(), t.getDate()))
                .collect(Collectors.toList());

        return new DashboardSummaryDTO(
                totalNetWorth,
                realEstate,
                stocks,
                crypto,
                cash,
                monthlyInflow,
                monthlyOutflow,
                netSavings,
                recentTransactions
        );
    }

    @Override
    public AnalyticsResponse getAnalytics(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);

        // Group past 6 months data
        List<AnalyticsResponse.MonthData> trends = new ArrayList<>();
        LocalDate now = LocalDate.now();

        for (int i = 5; i >= 0; i--) {
            LocalDate targetDate = now.minusMonths(i);
            int m = targetDate.getMonthValue();
            int y = targetDate.getYear();
            String monthName = targetDate.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);

            double income = transactions.stream()
                    .filter(t -> t.getType() == TransactionType.INCOME)
                    .filter(t -> t.getDate().getMonthValue() == m && t.getDate().getYear() == y)
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            double expense = transactions.stream()
                    .filter(t -> t.getType() == TransactionType.EXPENSE)
                    .filter(t -> t.getDate().getMonthValue() == m && t.getDate().getYear() == y)
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            trends.add(new AnalyticsResponse.MonthData(monthName, income, expense));
        }

        return new AnalyticsResponse(trends);
    }
}
