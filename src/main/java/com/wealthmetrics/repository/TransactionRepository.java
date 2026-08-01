package com.wealthmetrics.repository;

import com.wealthmetrics.entity.Transaction;
import com.wealthmetrics.entity.TransactionType;
import com.wealthmetrics.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserOrderByDateDesc(User user);
    List<Transaction> findByUserAndType(User user, TransactionType type);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user = :user AND t.type = :type")
    Double sumAmountByUserAndType(@Param("user") User user, @Param("type") TransactionType type);
}
