package com.seb42.main30.seb42_main_030.mainpage.service;

import com.seb42.main30.seb42_main_030.mainpage.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class DiaryService {
    //게시글 리스트 처리
    public Page<Diary> diaryList(Pageable pageable){
        return diaryRepository.findAll(pageable);
}
