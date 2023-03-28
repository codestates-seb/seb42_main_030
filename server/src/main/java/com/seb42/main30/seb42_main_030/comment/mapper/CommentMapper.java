package com.seb42.main30.seb42_main_030.comment.mapper;


import com.seb42.main30.seb42_main_030.comment.controller.dto.CommentDto;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper (componentModel = "spring")
public interface CommentMapper {

    Comment commentPostToComment (CommentDto.Post post);
    Comment commentPatchToComment (CommentDto.Patch patch);

    @Mapping(source = "diary.diaryId", target = "diaryId")
    @Mapping(source = "user.nickname", target = "userNickname")

    CommentDto commentToCommentDto(Comment comment);

    List<CommentDto> commentsToResponses (List<Comment> comments);

}
