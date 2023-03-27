package com.seb42.main30.seb42_main_030.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
public class SongDto {
    @NotNull(message = "음악을 추가하세요.")
    private String uri;
    private String songTitle;

    private String album;

    private String track;

    private String artist;

    private String images;

    private String duration_ms;
}

