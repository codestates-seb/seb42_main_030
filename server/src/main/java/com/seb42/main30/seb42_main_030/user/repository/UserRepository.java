package com.seb42.main30.seb42_main_030.user.repository;

import com.seb42.main30.seb42_main_030.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
}
