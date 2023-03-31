package com.seb42.main30.seb42_main_030.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    @Setter
    @Getter
    @NoArgsConstructor
    public static class Post {

        private long diaryId;

        @NotBlank(message = "내용을 입력해주세요.")
        private String body;

    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {

        private long diaryId;

        private long commentId;

        @NotBlank(message = "내용을 입력해주세요.")
        private String body;


    }

    @Setter
    @Getter
    @AllArgsConstructor
    public static class Response {

        private long commentId;
        private long diaryId;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        //        user랑 연결하면 user의 nickname 가져옴
        private String userNickname;

    }

}
