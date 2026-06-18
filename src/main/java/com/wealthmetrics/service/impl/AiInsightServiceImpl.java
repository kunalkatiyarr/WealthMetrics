package com.wealthmetrics.service.impl;

import com.wealthmetrics.entity.Transaction;
import com.wealthmetrics.entity.TransactionType;
import com.wealthmetrics.entity.User;
import com.wealthmetrics.repository.TransactionRepository;
import com.wealthmetrics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AiInsightServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<String> getInsights(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);
        List<String> insights = new ArrayList<>();

        double totalInflow = transactions.stream().filter(t -> t.getType() == TransactionType.INCOME).mapToDouble(Transaction::getAmount).sum();
        double totalOutflow = transactions.stream().filter(t -> t.getType() == TransactionType.EXPENSE).mapToDouble(Transaction::getAmount).sum();

        if (totalInflow == 0) {
            insights.add("Apni monthly income add karein taaki personalized recommendations generate ki ja sakein.");
            insights.add("Sahi budget limits set karne ke liye expenses ko category wise track karein.");
            return insights;
        }

        double savingsRate = ((totalInflow - totalOutflow) / totalInflow) * 100;
        insights.add(String.format("Aapka savings rate %.1f%% hai. Ise 20%% ya usse upar rakhne ka prayas karein.", savingsRate));

        if (savingsRate > 30) {
            insights.add("Badhiya saving rate! Aap is savings ko Equity ya Mutual Funds me SIP ke roop me invest kar sakte hain.");
        } else {
            insights.add("Outflow kam karne ke liye emergency budget limit set karein.");
        }

        double foodExpenses = transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE && t.getCategory().equalsIgnoreCase("Food"))
                .mapToDouble(Transaction::getAmount).sum();

        if (foodExpenses > (totalOutflow * 0.25)) {
            insights.add("Food & Dining category me spending total outflow ka 25% se zyada hai. Bahar khana thoda kam karne par vichaar karein.");
        }

        return insights;
    }
}
