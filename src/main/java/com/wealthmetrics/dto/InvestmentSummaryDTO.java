package com.wealthmetrics.dto;

import com.wealthmetrics.entity.InvestmentType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentSummaryDTO {
    private Long id;
    private String title;
    private Double amount;
    private InvestmentType type;
}
