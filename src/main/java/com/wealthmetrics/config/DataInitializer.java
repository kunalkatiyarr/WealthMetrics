package com.wealthmetrics.config;

import com.wealthmetrics.entity.*;
import com.wealthmetrics.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String email = "kunalkatiyar916@gmail.com";
        User user;
        
        java.util.Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            user = existingUser.get();
            // Clear existing records to seed fresh demo data
            investmentRepository.deleteAll(investmentRepository.findByUser(user));
            transactionRepository.deleteAll(transactionRepository.findByUserOrderByDateDesc(user));
            budgetRepository.deleteAll(budgetRepository.findByUser(user));
            
            // Also reset password to 9057 just in case they used another during signup
            user.setPassword(passwordEncoder.encode("9057"));
            userRepository.save(user);
        } else {
            user = new User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("9057"));
            user.setRole(Role.ROLE_USER);
            userRepository.save(user);
        }

        // Seed Real Estate
        saveInvestment(user, "Jaipur Residential Plot", 2950000.0, InvestmentType.REAL_ESTATE);
        saveInvestment(user, "Bengaluru Apartment", 10200000.0, InvestmentType.REAL_ESTATE);
        saveInvestment(user, "Commercial Shop", 1520000.0, InvestmentType.REAL_ESTATE);

        // Seed Stocks
        saveInvestment(user, "TCS", 420000.0, InvestmentType.STOCKS);
        saveInvestment(user, "Infosys", 282000.0, InvestmentType.STOCKS);
        saveInvestment(user, "Reliance", 462000.0, InvestmentType.STOCKS);
        saveInvestment(user, "HDFC Bank", 240000.0, InvestmentType.STOCKS);
        saveInvestment(user, "Nifty 50 ETF", 446000.0, InvestmentType.STOCKS);

        // Seed Mutual Funds (saved as STOCKS in DB to bypass database enum constraints)
        saveInvestment(user, "Parag Parikh Flexi Cap", 258000.0, InvestmentType.STOCKS);
        saveInvestment(user, "Quant Small Cap", 156000.0, InvestmentType.STOCKS);
        saveInvestment(user, "SBI Bluechip", 172000.0, InvestmentType.STOCKS);

        // Seed Crypto
        saveInvestment(user, "Bitcoin", 295000.0, InvestmentType.CRYPTO);
        saveInvestment(user, "Ethereum", 72000.0, InvestmentType.CRYPTO);
        saveInvestment(user, "Solana", 53000.0, InvestmentType.CRYPTO);

        // Seed Cash
        saveInvestment(user, "Cash & Bank Balance", 675000.0, InvestmentType.CASH);

        // Seed Budgets
        saveBudget(user, "Food", 18000.0);
        saveBudget(user, "Rent", 25000.0);
        saveBudget(user, "Transport", 8000.0);
        saveBudget(user, "Entertainment", 10000.0);
        saveBudget(user, "Shopping", 12000.0);
        saveBudget(user, "Utilities", 6000.0);

        // Seed Transactions
        saveTransaction(user, "Bought TCS Shares", 50000.0, TransactionType.EXPENSE, "Investment", LocalDate.of(2026, 7, 27));
        saveTransaction(user, "Received Apartment Rent", 32000.0, TransactionType.INCOME, "Rent", LocalDate.of(2026, 7, 26));
        saveTransaction(user, "Monthly Salary", 180000.0, TransactionType.INCOME, "Salary", LocalDate.of(2026, 7, 25));
        saveTransaction(user, "Electricity Bill", 4500.0, TransactionType.EXPENSE, "Utilities", LocalDate.of(2026, 7, 24));
        saveTransaction(user, "Bought Bitcoin", 25000.0, TransactionType.EXPENSE, "Investment", LocalDate.of(2026, 7, 23));
        saveTransaction(user, "Restaurant", 2200.0, TransactionType.EXPENSE, "Food", LocalDate.of(2026, 7, 22));
        saveTransaction(user, "Fuel", 3100.0, TransactionType.EXPENSE, "Utilities", LocalDate.of(2026, 7, 21));
        saveTransaction(user, "Grocery", 9500.0, TransactionType.EXPENSE, "Food", LocalDate.of(2026, 7, 20));
        saveTransaction(user, "Mutual Fund SIP", 15000.0, TransactionType.EXPENSE, "Investment", LocalDate.of(2026, 7, 19));
    }

    private void saveInvestment(User user, String title, Double amount, InvestmentType type) {
        Investment inv = new Investment();
        inv.setUser(user);
        inv.setTitle(title);
        inv.setAmount(amount);
        inv.setType(type);
        investmentRepository.save(inv);
    }

    private void saveBudget(User user, String category, Double limitAmount) {
        BudgetLimit bl = new BudgetLimit();
        bl.setUser(user);
        bl.setCategory(category);
        bl.setLimitAmount(limitAmount);
        budgetRepository.save(bl);
    }

    private void saveTransaction(User user, String title, Double amount, TransactionType type, String category, LocalDate date) {
        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setTitle(title);
        tx.setAmount(amount);
        tx.setType(type);
        tx.setCategory(category);
        tx.setDate(date);
        transactionRepository.save(tx);
    }
}
