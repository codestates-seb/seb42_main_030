package com.seb42.main30.seb42_main_030.diary.entity;

import com.seb42.main30.seb42_main_030.audit.basetime.BaseTimeEntity;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Diary extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text", nullable = false)
    private String body;

    @Column(nullable = false)
    private int viewCount;

    private int likeCount;

    @Column(name = "createdAt", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "modifiedAt", insertable = false, updatable = false)
    private LocalDateTime modifiedAt;

    @ManyToOne(targetEntity = User.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @Column
    private List<String> tagList;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<Likes> likes  = new ArrayList<>();


}
