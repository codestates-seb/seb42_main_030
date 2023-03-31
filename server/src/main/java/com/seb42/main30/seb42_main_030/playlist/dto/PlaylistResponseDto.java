package com.seb42.main30.seb42_main_030.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class PlaylistResponseDto{
    private long playlistId;
    private long userId;
    private String playlistTitle;
    private String title;
    private String nickname;
    /** 필요하려나 */
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private List<TrackResponseDto> tracks;

}