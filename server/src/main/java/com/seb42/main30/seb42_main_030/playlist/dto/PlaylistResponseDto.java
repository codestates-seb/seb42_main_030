package com.seb42.main30.seb42_main_030.playlist.dto;

import com.seb42.main30.seb42_main_030.playlist.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class PlaylistResponseDto {
    private long playlist_id;

    private long user_id;

    private String nickname;

    private String content;

    private String title;

    private int like;

    private List<Song> songs;

    private List<String> tagList;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}