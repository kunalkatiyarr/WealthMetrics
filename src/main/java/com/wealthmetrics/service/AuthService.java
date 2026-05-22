package com.wealthmetrics.service;

import com.wealthmetrics.dto.JwtResponse;
import com.wealthmetrics.dto.LoginRequest;
import com.wealthmetrics.dto.RegisterRequest;

public interface AuthService {
    void register(RegisterRequest request);
    JwtResponse login(LoginRequest request);
}
