package com.wealthmetrics.service;

import com.wealthmetrics.dto.TransactionDTO;
import com.wealthmetrics.dto.TransactionRequest;
import java.util.List;

public interface TransactionService {
    List<TransactionDTO> getTransactionsForUser(String email);
    TransactionDTO addTransaction(String email, TransactionRequest request);
    void deleteTransaction(String email, Long id);
}
