package com.seb42.main30.seb42_main_030.comment.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TrackResponseDto {
    private String url;
    private String trackTitle;
    private String thumbnail;
    private String channelTitle;
    private String videoId;

}
