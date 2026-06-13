package com.wealthmetrics.controller;

import com.wealthmetrics.dto.ApiResponse;
import com.wealthmetrics.dto.InvestmentRequest;
import com.wealthmetrics.dto.InvestmentSummaryDTO;
import com.wealthmetrics.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @GetMapping
    public ResponseEntity<List<InvestmentSummaryDTO>> getInvestments(Principal principal) {
        List<InvestmentSummaryDTO> list = investmentService.getInvestmentsForUser(principal.getName());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<InvestmentSummaryDTO> addInvestment(Principal principal, @RequestBody InvestmentRequest request) {
        InvestmentSummaryDTO dto = investmentService.addInvestment(principal.getName(), request);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteInvestment(Principal principal, @PathVariable Long id) {
        try {
            investmentService.deleteInvestment(principal.getName(), id);
            return ResponseEntity.ok(new ApiResponse(true, "Investment deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}
