package com.seb42.main30.seb42_main_030.diary.mapper;

import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;


import java.util.List;

@Mapper(componentModel = "spring")
public interface DiaryMapper {

    Diary diaryPostToDiary (DiaryDto.Post post);
    Diary diaryPatchToDiary (DiaryDto.Patch patch);


    @Named("commentToCommentDto")
    @Mapping(source = "user.nickname", target = "userNickname")
    @Mapping(source = "diary.diaryId", target = "diaryId")
    CommentDto.Response commentToCommentDto(Comment comment);
    @Mapping(source = "user.nickname", target = "userNickname")
    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
    DiaryDto.Response diaryToResponse(Diary diary);

//    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
//    List<DiaryDto.Response> diaryToResponses(List<Diary> diaries);




    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
    List<DiaryDto.Response> diaryToResponses(Page<Diary> diaries);
}
