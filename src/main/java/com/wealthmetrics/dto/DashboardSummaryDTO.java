package com.wealthmetrics.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDTO {
    private Double totalNetWorth;
    private Double realEstateAmount;
    private Double stocksAmount;
    private Double cryptoAmount;
    private Double cashAmount;
    private Double monthlyInflow;
    private Double monthlyOutflow;
    private Double netSavings;
    private List<TransactionDTO> recentTransactions;
}
