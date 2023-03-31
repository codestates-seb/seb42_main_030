package com.seb42.main30.seb42_main_030.comment.mapper;


import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


import java.util.List;

@Mapper (componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "diaryId", target = "diary.diaryId")
    Comment commentPostToComment (CommentDto.Post post);

    @Mapping(source = "diaryId", target = "diary.diaryId")
    Comment commentPatchToComment (CommentDto.Patch patch);

    @Mapping(source = "diary.diaryId", target = "diaryId")
    @Mapping(source = "user.nickname", target = "userNickname")
    CommentDto.Response commentToCommentDto(Comment comment);

    List<CommentDto.Response> commentsToResponses (List<Comment> comments);

}
