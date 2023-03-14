package com.seb42.main30.seb42_main_030.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "내용을 입력해주세요.")
        private String body;

    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        @NotBlank(message = "내용을 입력해주세요.")
        private String body;

    }


    @Getter
    @AllArgsConstructor
    public static class Response {

        private long commentId;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
//        user랑 연결하면 user의 nickname 가져옴
        private String nickname;

    }

}
