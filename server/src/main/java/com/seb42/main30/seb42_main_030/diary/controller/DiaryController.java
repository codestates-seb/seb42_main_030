package com.seb42.main30.seb42_main_030.diary.controller;

import com.seb42.main30.seb42_main_030.comment.service.CommentService;
import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.mapper.DiaryMapper;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/diary")
@AllArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final DiaryMapper diaryMapper;
    private final CommentService commentService;

    // 게시물 등록
    @PostMapping
    public ResponseEntity postDiary(@Valid @RequestBody DiaryDto.Post post){
        Diary diary = diaryService.createDiary(diaryMapper.diaryPostToDiary(post));

        DiaryDto.Response response = diaryMapper.diaryToResponse(diary);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 게시물 조회
    @GetMapping("/{diary-id}")
    public ResponseEntity getDiary(@PathVariable("diary-id") long diaryId) throws BusinessException {
        try{
            Diary diary = diaryService.readDiary(diaryId);
            DiaryDto.Response response = diaryMapper.diaryToResponse(diary);
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (BusinessException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 게시물 '전체'조회
//    @GetMapping
//    public ResponseEntity getDiary(){
//        List<Diary> diaries = diaryService.readDiarys();
//        List<DiaryDto.Response> responsess = diaryMapper.diaryToResponses(diaries);
//
//        return new ResponseEntity(responsess, HttpStatus.OK);
//    }

    //메인페이지 전체 게시글 조회 + 페이지네이션
    @GetMapping("/main")
    public String diaryList(Model model, @PageableDefault(page = 0, size = 12, sort = "diaryId", direction = Sort.Direction.DESC) Pageable pageable){

        Page<Diary> list = diaryService.readDiaryList(pageable);

        int nowPage = list.getPageable().getPageNumber() + 1;
        int startPage = Math.max(nowPage - 4, 1);
        int endPage = Math.min(nowPage + 5, list.getTotalPages());

        model.addAttribute("list", list);
        model.addAttribute("nowPage", nowPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        model.addAttribute("list", diaryService.readDiaryList(pageable));
        return "diaryList";
    }

    // 게시물 수정
    @PatchMapping("/{diary-id}")
    public ResponseEntity patchDiary (@PathVariable("diary-id") long diaryId,
                                      @Valid @RequestBody DiaryDto.Patch patch) throws BusinessException {
        try {
            Diary diary = diaryService.updateDiary(diaryId, diaryMapper.diaryPatchToDiary(patch));
            DiaryDto.Response response = diaryMapper.diaryToResponse(diary);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 게시물 삭제
    @DeleteMapping("/{diary-id}")
    public ResponseEntity deleteDiary (@PathVariable("diary-id") long diaryId) throws BusinessException {
        try {
            diaryService.deleteDiary(diaryId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (BusinessException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
