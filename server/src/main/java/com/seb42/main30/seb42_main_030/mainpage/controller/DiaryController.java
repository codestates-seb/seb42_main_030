package com.seb42.main30.seb42_main_030.mainpage.controller;

import com.seb42.main30.seb42_main_030.mainpage.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DiaryController {
    @GetMapping("/diary/list")
    public String diaryList(Model model, @PageableDefault(page = 0, size = 12, sort = "diaryId", direction = Sort.Direction.DESC) Pageable pageable){

        Page<Diary> list = diaryService.diaryList(pageable);


        int nowPage = list.getPageable().getPageNumber() + 1;
        int startPage = Math.max(nowPage - 4, 1);
        int endPage = Math.min(nowPage + 5, list.getTotalPages());

        model.addAttribute("list", list);
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        model.addAttribute("list", diaryService.diaryList(pageable));
        return "diaryList";
    }
}
