package com.wealthmetrics.repository;

import com.wealthmetrics.entity.BudgetLimit;
import com.wealthmetrics.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<BudgetLimit, Long> {
    List<BudgetLimit> findByUser(User user);
    Optional<BudgetLimit> findByUserAndCategory(User user, String category);
}
