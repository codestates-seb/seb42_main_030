package com.seb42.main30.seb42_main_030.diary.repository;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByDiary(Diary diary);
}
