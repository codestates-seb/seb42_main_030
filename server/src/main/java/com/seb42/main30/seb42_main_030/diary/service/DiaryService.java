package com.seb42.main30.seb42_main_030.diary.service;


import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.repository.DiaryRepository;

public class DiaryService {

    public Diary createDiar(Diary diary){
        Diary savedDiary = DiaryRepository.save(Diary);

        return savedDiary;
    }

    public Diary updateDiary(Diary diary){
        Diary verfiedDiary = findVerifiedDiaryid(diary.)
    }
}
