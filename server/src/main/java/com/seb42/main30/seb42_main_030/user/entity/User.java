package com.seb42.main30.seb42_main_030.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private long userId;
    private String email;
    private String nickname;
    private String password;
    private String ImageUrl;
}
