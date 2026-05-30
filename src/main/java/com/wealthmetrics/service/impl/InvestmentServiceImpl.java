package com.wealthmetrics.service.impl;

import com.wealthmetrics.dto.InvestmentRequest;
import com.wealthmetrics.dto.InvestmentSummaryDTO;
import com.wealthmetrics.entity.Investment;
import com.wealthmetrics.entity.User;
import com.wealthmetrics.repository.InvestmentRepository;
import com.wealthmetrics.repository.UserRepository;
import com.wealthmetrics.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvestmentServiceImpl implements InvestmentService {

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<InvestmentSummaryDTO> getInvestmentsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return investmentRepository.findByUser(user).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvestmentSummaryDTO addInvestment(String email, InvestmentRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Investment investment = new Investment();
        investment.setUser(user);
        investment.setTitle(request.getTitle());
        investment.setAmount(request.getAmount());
        investment.setType(request.getType());

        Investment saved = investmentRepository.save(investment);
        return mapToDTO(saved);
    }

    @Override
    public void deleteInvestment(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Investment investment = investmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investment not found"));

        if (!investment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized delete investment request");
        }
        investmentRepository.delete(investment);
    }

    private InvestmentSummaryDTO mapToDTO(Investment i) {
        return new InvestmentSummaryDTO(
                i.getId(),
                i.getTitle(),
                i.getAmount(),
                i.getType()
        );
    }
}
