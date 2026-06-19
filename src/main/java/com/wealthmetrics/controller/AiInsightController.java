package com.wealthmetrics.controller;

import com.wealthmetrics.service.impl.AiInsightServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AiInsightController {

    @Autowired
    private AiInsightServiceImpl aiInsightService;

    @GetMapping("/insights")
    public ResponseEntity<List<String>> getInsights(Principal principal) {
        List<String> insights = aiInsightService.getInsights(principal.getName());
        return ResponseEntity.ok(insights);
    }
}
