package com.wealthmetrics.controller;

import com.wealthmetrics.dto.DashboardSummaryDTO;
import com.wealthmetrics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary(Principal principal) {
        DashboardSummaryDTO dto = analyticsService.getDashboardSummary(principal.getName());
        return ResponseEntity.ok(dto);
    }
}