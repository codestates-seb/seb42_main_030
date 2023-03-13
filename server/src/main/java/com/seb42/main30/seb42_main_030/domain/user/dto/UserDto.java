package com.seb42.main30.seb42_main_030.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotNull
        private String nickname;

        private String imageUrl;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private long userId;

        @NotNull
        private String nickname;

        private String imageUrl;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private long userId;

        private String nickname;
        private String imageUrl;
    }


}
