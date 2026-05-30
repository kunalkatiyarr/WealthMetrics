package com.wealthmetrics.service.impl;

import com.wealthmetrics.dto.BudgetSummaryDTO;
import com.wealthmetrics.entity.BudgetLimit;
import com.wealthmetrics.entity.Transaction;
import com.wealthmetrics.entity.TransactionType;
import com.wealthmetrics.entity.User;
import com.wealthmetrics.repository.BudgetRepository;
import com.wealthmetrics.repository.TransactionRepository;
import com.wealthmetrics.repository.UserRepository;
import com.wealthmetrics.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<BudgetSummaryDTO> getBudgetsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<BudgetLimit> limits = budgetRepository.findByUser(user);
        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);

        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();
        int currentYear = now.getYear();

        return limits.stream().map(limit -> {
            Double spent = transactions.stream()
                    .filter(t -> t.getType() == TransactionType.EXPENSE)
                    .filter(t -> t.getCategory().equalsIgnoreCase(limit.getCategory()))
                    .filter(t -> t.getDate().getMonthValue() == currentMonth && t.getDate().getYear() == currentYear)
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            Double remaining = limit.getLimitAmount() - spent;
            return new BudgetSummaryDTO(
                    limit.getCategory(),
                    limit.getLimitAmount(),
                    spent,
                    remaining
            );
        }).collect(Collectors.toList());
    }

    @Override
    public BudgetLimit saveBudget(String email, String category, Double limitAmount) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<BudgetLimit> existingOpt = budgetRepository.findByUserAndCategory(user, category);
        BudgetLimit budget;
        if (existingOpt.isPresent()) {
            budget = existingOpt.get();
            budget.setLimitAmount(limitAmount);
        } else {
            budget = new BudgetLimit();
            budget.setUser(user);
            budget.setCategory(category);
            budget.setLimitAmount(limitAmount);
        }
        return budgetRepository.save(budget);
    }

    @Override
    public void deleteBudget(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        BudgetLimit budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized delete budget request");
        }
        budgetRepository.delete(budget);
    }
}
