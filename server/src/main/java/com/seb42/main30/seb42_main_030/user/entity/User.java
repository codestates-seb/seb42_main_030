package com.seb42.main30.seb42_main_030.user.entity;

import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String nickname;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(nullable = true)
    private String imageUrl;

    // diary 맵핑(한 user:여러 diary)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Diary> diaries = new ArrayList<>();

    // comment 맵핑(한 user:여러 comment)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public User(String email, String nickname, String imageUrl) {
        this.email = email;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
