package com.seb42.main30.seb42_main_030.comment.playlist.entity;


import com.seb42.main30.seb42_main_030.audit.Auditable;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Playlist extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long playlistId;
    @Column(nullable = false)
    private String playlistTitle;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<Track> tracks = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;
}
