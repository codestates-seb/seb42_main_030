package com.seb42.main30.seb42_main_030.mainpage.repository;

import com.seb42.main30.seb42_main_030.mainpage.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
