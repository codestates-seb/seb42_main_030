package com.seb42.main30.seb42_main_030.diary.entity;

<<<<<<< HEAD
=======
import com.seb42.main30.seb42_main_030.audit.basetime.BaseTimeEntity;
import com.seb42.main30.seb42_main_030.comment.entity.Comment;
import com.seb42.main30.seb42_main_030.user.entity.User;
>>>>>>> f6df19e229ceb12e4523b282283d8cbe30b282e7
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
<<<<<<< HEAD
=======
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
>>>>>>> f6df19e229ceb12e4523b282283d8cbe30b282e7


@NoArgsConstructor
@Getter
@Setter
@Entity
<<<<<<< HEAD
public class Diary {
=======
public class Diary extends BaseTimeEntity {

>>>>>>> f6df19e229ceb12e4523b282283d8cbe30b282e7
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

<<<<<<< HEAD
    private String title;
    private String body;
    private String playlistId;
    private String tag;
    private int like;
    private int view;



=======
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
>>>>>>> f6df19e229ceb12e4523b282283d8cbe30b282e7

}
