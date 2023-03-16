package com.seb42.main30.seb42_main_030.mainpage.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Data
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;
    private String title;
    private String body;
    private String playlistId;
    private int like;
    private String tag;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int viewcount;
}
