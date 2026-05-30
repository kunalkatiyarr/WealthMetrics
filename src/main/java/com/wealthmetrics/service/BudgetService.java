package com.wealthmetrics.service;

import com.wealthmetrics.dto.BudgetSummaryDTO;
import com.wealthmetrics.entity.BudgetLimit;
import java.util.List;

public interface BudgetService {
    List<BudgetSummaryDTO> getBudgetsForUser(String email);
    BudgetLimit saveBudget(String email, String category, Double limitAmount);
    void deleteBudget(String email, Long id);
}
