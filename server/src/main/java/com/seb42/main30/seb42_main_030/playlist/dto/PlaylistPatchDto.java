package com.seb42.main30.seb42_main_030.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaylistPatchDto {
    private long playlist_id;

    private String title;

    private List<SongDto> songs;

    private List<String> tagList;


}