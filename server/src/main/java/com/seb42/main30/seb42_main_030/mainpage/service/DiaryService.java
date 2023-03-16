package com.seb42.main30.seb42_main_030.mainpage.service;

import com.seb42.main30.seb42_main_030.mainpage.entity.Diary;
import com.seb42.main30.seb42_main_030.mainpage.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class DiaryService {
    @Autowired
    private DiaryRepository diaryRepository;

    //게시글 리스트 처리
    public Page<Diary> diaryList(Pageable pageable) {
        return diaryRepository.findAll(pageable);
    }

    //특정 게시글 불러오기
    public Diary diaryView(Long diaryId) {
        return diaryRepository.findById(diaryId).get();
    }
}
