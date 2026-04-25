package com.wealthmetrics.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetSummaryDTO {
    private String category;
    private Double limitAmount;
    private Double spentAmount;
    private Double remainingAmount;
}
