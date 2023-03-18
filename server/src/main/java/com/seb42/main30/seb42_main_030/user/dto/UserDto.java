package com.seb42.main30.seb42_main_030.user.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        private String nickname;

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private String imageUrl;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private long userId;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        private String nickname;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        private String password;

        private String imageUrl;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private long userId;

        private String nickname;
        private String email;
        private String password;
        private String imageUrl;
    }



}
