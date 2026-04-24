package com.wealthmetrics.repository;

import com.wealthmetrics.entity.Investment;
import com.wealthmetrics.entity.InvestmentType;
import com.wealthmetrics.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    List<Investment> findByUser(User user);
    List<Investment> findByUserAndType(User user, InvestmentType type);

    @Query("SELECT SUM(i.amount) FROM Investment i WHERE i.user = :user")
    Double sumAmountByUser(@Param("user") User user);
}
