package com.seb42.main30.seb42_main_030.comment.entity;


import com.seb42.main30.seb42_main_030.audit.basetime.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(columnDefinition = "text", nullable = false)
    private String body;


    @Column(name = "createdAt", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "modifiedAt", insertable = false, updatable = false)
    private LocalDateTime modifiedAt;





//    유저랑 다이어리 연결
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "diary_id")
//    private Diary diary;



}
