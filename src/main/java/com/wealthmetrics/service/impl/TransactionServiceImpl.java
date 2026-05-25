package com.wealthmetrics.service.impl;

import com.wealthmetrics.dto.TransactionDTO;
import com.wealthmetrics.dto.TransactionRequest;
import com.wealthmetrics.entity.Transaction;
import com.wealthmetrics.entity.User;
import com.wealthmetrics.repository.TransactionRepository;
import com.wealthmetrics.repository.UserRepository;
import com.wealthmetrics.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TransactionDTO> getTransactionsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findByUserOrderByDateDesc(user).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO addTransaction(String email, TransactionRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setType(request.getType());
        transaction.setDate(request.getDate());

        Transaction saved = transactionRepository.save(transaction);
        return mapToDTO(saved);
    }

    @Override
    public void deleteTransaction(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized delete transaction request");
        }
        transactionRepository.delete(transaction);
    }

    private TransactionDTO mapToDTO(Transaction t) {
        return new TransactionDTO(
                t.getId(),
                t.getTitle(),
                t.getAmount(),
                t.getCategory(),
                t.getType(),
                t.getDate()
        );
    }
}
