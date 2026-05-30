package com.wealthmetrics.service;

import com.wealthmetrics.dto.AnalyticsResponse;
import com.wealthmetrics.dto.DashboardSummaryDTO;

public interface AnalyticsService {
    DashboardSummaryDTO getDashboardSummary(String email);
    AnalyticsResponse getAnalytics(String email);
}
