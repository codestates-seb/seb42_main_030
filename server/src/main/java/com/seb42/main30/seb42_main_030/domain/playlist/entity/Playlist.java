package com.seb42.main30.seb42_main_030.domain.playlist.entity;

import com.seb42.main30.seb42_main_030.domain.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlist_id;

    @Column
    private String title;
    @Column
    private String album;
    @Column
    private String track;
    @Column
    private String artist;
    @Column
    private String album_art;

    // 연관관계 매핑
    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @Column
    private int likePlus = 0;
}
