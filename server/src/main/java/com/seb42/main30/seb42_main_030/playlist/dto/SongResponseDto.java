package com.seb42.main30.seb42_main_030.playlist.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SongResponseDto {
    private String songTitle;

    private String track;

    private String uri;

    private String images;
}
