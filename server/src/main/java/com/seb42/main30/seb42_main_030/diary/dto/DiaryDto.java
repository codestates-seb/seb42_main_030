package com.seb42.main30.seb42_main_030.diary.dto;


import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class DiaryDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private int likeCount;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private int likeCount;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {

        private long diaryId;
        private String title;
        private String body;
        private int viewCount;
        private int likeCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

//        user 데이터 가져오는 것
        private String nickname;


        private List<CommentDto> comments;

    }


    @Getter
    @Setter
    public static class ResponseCheck{
        private long Id;
    }

}
