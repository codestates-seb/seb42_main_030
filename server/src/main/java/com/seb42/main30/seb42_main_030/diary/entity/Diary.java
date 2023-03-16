package com.seb42.main30.seb42_main_030.diary.entity;

import com.seb42.main30.seb42_main_030.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Diary extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @Column
    private String title;
    @Column
    private String body;
    @Column
    private String tag;
    @Column
    private int like;
    @Column
    private int view;




}
