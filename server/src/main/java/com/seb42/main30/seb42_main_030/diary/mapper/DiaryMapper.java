package com.seb42.main30.seb42_main_030.diary.mapper;

import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public interface DiaryMapper {

    Diary diaryPostToDiary (DiaryDto.Post post);
    Diary diaryPatchToDiary (DiaryDto.Patch patch);


    @Mapping(source = "user.nickname", target = "userNickname")
    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDTo")
    DiaryDto.Response diaryToResponse(Diary diary);

    @Mapping(source = "comments", target = "comments", qualifiedByName = "commentToCommentDto")
    List<DiaryDto.Response> diaryToResponses(List<Diary> diaries);

    @Named("commentToCommnetDto")
    @Mapping(source = "user.nickname", target = "user.Nickname")
    @Mapping(source = "diary.diaryId", target = "diaryId")
    CommentDto commentToCommentDto(Comment comment);

}
