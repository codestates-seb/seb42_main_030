package com.seb42.main30.seb42_main_030.diary.entity;

import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Likes {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long likeId;

    // 좋아요를 누르는 UserId
    @Column
    private Long likeUserId;

    // 플레이리스트 연관관계 매핑
    @ManyToOne
    @JoinColumn(name = "diaryId")
    private Diary diary;

//    public void addDiarylist(Diary diary) {
//        this.diary = diary;
    }
