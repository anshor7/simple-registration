package com.example.user;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
	@Query("SELECT count(u) FROM User u WHERE UPPER(u.phone)=(:phone) OR UPPER(u.email)= (:email)")
    int checkUniqueField(@Param("phone") String phone, @Param("email") String email);
}
