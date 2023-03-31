package com.seb42.main30.seb42_main_030.comment.playlist.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long trackId;

    @Column(nullable = false)
    private String url;
    private String trackTitle;
    private String thumbnail;
    private String channelTitle;

    /** 필요할려나 */
    private String videoId;

    @ManyToOne
    @JoinColumn(name = "Playlist_id")
    private Playlist playlist;
}


