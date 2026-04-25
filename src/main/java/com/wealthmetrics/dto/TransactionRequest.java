package com.wealthmetrics.dto;

import com.wealthmetrics.entity.TransactionType;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    private String title;
    private Double amount;
    private String category;
    private TransactionType type;
    private LocalDate date;
}
