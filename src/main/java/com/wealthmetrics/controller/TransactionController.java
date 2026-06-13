package com.wealthmetrics.controller;

import com.wealthmetrics.dto.ApiResponse;
import com.wealthmetrics.dto.TransactionDTO;
import com.wealthmetrics.dto.TransactionRequest;
import com.wealthmetrics.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getTransactions(Principal principal) {
        List<TransactionDTO> list = transactionService.getTransactionsForUser(principal.getName());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> addTransaction(Principal principal, @RequestBody TransactionRequest request) {
        TransactionDTO dto = transactionService.addTransaction(principal.getName(), request);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTransaction(Principal principal, @PathVariable Long id) {
        try {
            transactionService.deleteTransaction(principal.getName(), id);
            return ResponseEntity.ok(new ApiResponse(true, "Transaction deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}
