package com.wealthmetrics.service;

import com.wealthmetrics.dto.InvestmentRequest;
import com.wealthmetrics.dto.InvestmentSummaryDTO;
import java.util.List;

public interface InvestmentService {
    List<InvestmentSummaryDTO> getInvestmentsForUser(String email);
    InvestmentSummaryDTO addInvestment(String email, InvestmentRequest request);
    void deleteInvestment(String email, Long id);
}
