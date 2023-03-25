package com.seb42.main30.seb42_main_030.playlist.entity;

import com.seb42.main30.seb42_main_030.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Song extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long song_id;

    @Column(nullable = false)
    private String url;

    private String songTitle;

    private String album;

    private String track;

    private String artist;

    private String album_art;


    @ManyToOne
    @JoinColumn(name = "Playlist_id")
    private Playlist playlist;
}