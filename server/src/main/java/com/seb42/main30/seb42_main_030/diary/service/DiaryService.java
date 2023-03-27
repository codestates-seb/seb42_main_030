package com.seb42.main30.seb42_main_030.diary.service;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.entity.Likes;
import com.seb42.main30.seb42_main_030.diary.repository.DiaryRepository;
import com.seb42.main30.seb42_main_030.diary.repository.LikesRepository;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class DiaryService {

    private DiaryRepository diaryRepository;
    private UserRepository  userRepository;
    private UserService userService;
    private LikesRepository likesRepository;


//    create
    public Diary createDiary(Diary diary){
        long userId = userService.getLoginUser().getUserId();
        User user = getUserFromId(userId);
        diary.setUser(user);
        return diaryRepository.save(diary);
    }

    private User getUserFromId(long userId) {return userRepository.findById(userId).get();}

//    read
    public Diary readDiary(long diaryId){
        Diary diary = existDiary(diaryId);

        diary.setViewCount(diary.getViewCount() + 1);
        return diaryRepository.save(diary);
    }

//    read all
//    public List<Diary> readDiarys() {return diaryRepository.findAll(); }

    //메인페이지 전체 게시글 조회 + 페이지네이션
    public Page<Diary> readDiaryList(Pageable pageable){
        return diaryRepository.findAll(pageable);
    }

//    update
    public Diary updateDiary(long diaryId, Diary diary){
        Diary verifyDiary = verifyWriter(diaryId);

        verifyDiary.setTitle(diary.getTitle());
        verifyDiary.setBody(diary.getBody());

        return diaryRepository.save(verifyDiary);
    }


//    delete
    public void deleteDiary(long diaryId){
        Diary verifyDiary = verifyWriter(diaryId);

        diaryRepository.deleteById(verifyDiary.getDiaryId());
    }


//    게시글 존재 확인
    private Diary existDiary(long diaryId){
        Optional<Diary> diary = diaryRepository.findById(diaryId);
        return diary.orElseThrow(() -> new BusinessException(ExceptionCode.DIARY_NOT_FOUND));
    }

//    게시글 작성자와 사용자가 같은지 확인
    private Diary verifyWriter(long diaryId){
        long userId = userService.getLoginUser().getUserId();
        Diary diary = existDiary(diaryId);
        if (diary.getUser().getUserId() != userId){
            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
        }
        return diary;
    }

// Diary 검증
    private Diary verifiedDiary(long diaryId) {
        Diary findDiary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST));

        return findDiary;
    }
// Diary 없을때
    private void verifiedNoDiary(Page<Diary> findAllDiary) {
        if (findAllDiary.getTotalElements() == 0) {
            throw new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST);
        }
    }

//  Like
    public void likeDiary(Long diaryId, Long authUserId) {

        // Like 해줄 다이어리
        Diary diary = verifiedDiary(diaryId);

        // 다이어리의 주인인 회원
        User user = diary.getUser();

        // 본인 다이어리에 좋아요 누르는 경우
        //if (user.getUserId() == authUserId){ throw new BusinessException(ExceptionCode.BAD_REQUEST);}

        // 다이어리 like의 합
        List<Diary> usersDiary = user.getDiaries();
        int Score = 0;

        for (Diary diary1 : usersDiary) {
            int like = diary1.getLikes().size();
            Score += like;
        }

        Long LikeCount = likesRepository.findByDiary(diary)// 해당 Diary를 Like한 entity
                .stream()
                .filter(f -> f.getLikeuserId().equals(authUserId)) // 그안에 내가 있는 경우
                .count(); // 0, 1

        // Unlike 처리
        if (LikeCount == 1) {
            // 내가 Like한 경우를 찾기
            Likes LikeDiary = likesRepository.findByDiary(diary)
                    .stream()
                    .filter(f -> f.getLikeuserId().equals(authUserId))
                    .findAny().get();

            // Repository에서 삭제
            likesRepository.delete(LikeDiary);
        }
        // Like 처리 LikeCount != 1
        else {
            // Like
            Likes LikeDiary = new Likes();
            LikeDiary.setLikeuserId(authUserId);
            LikeDiary.setDiary(diary);

            // Repository에 저장
            likesRepository.save(LikeDiary);
        }
    }
}
