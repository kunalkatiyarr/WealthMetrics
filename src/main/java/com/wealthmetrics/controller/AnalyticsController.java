package com.wealthmetrics.controller;

import com.wealthmetrics.dto.AnalyticsResponse;
import com.wealthmetrics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(Principal principal) {
        AnalyticsResponse response = analyticsService.getAnalytics(principal.getName());
        return ResponseEntity.ok(response);
    }
}
