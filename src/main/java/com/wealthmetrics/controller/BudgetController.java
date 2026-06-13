package com.wealthmetrics.controller;

import com.wealthmetrics.dto.ApiResponse;
import com.wealthmetrics.dto.BudgetSummaryDTO;
import com.wealthmetrics.entity.BudgetLimit;
import com.wealthmetrics.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public ResponseEntity<List<BudgetSummaryDTO>> getBudgets(Principal principal) {
        List<BudgetSummaryDTO> list = budgetService.getBudgetsForUser(principal.getName());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<BudgetLimit> saveBudget(Principal principal, @RequestParam String category, @RequestParam Double limitAmount) {
        BudgetLimit saved = budgetService.saveBudget(principal.getName(), category, limitAmount);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBudget(Principal principal, @PathVariable Long id) {
        try {
            budgetService.deleteBudget(principal.getName(), id);
            return ResponseEntity.ok(new ApiResponse(true, "Budget deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}
