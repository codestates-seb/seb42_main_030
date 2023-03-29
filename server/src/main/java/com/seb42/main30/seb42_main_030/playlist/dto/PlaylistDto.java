package com.seb42.main30.seb42_main_030.playlist.dto;


import com.seb42.main30.seb42_main_030.playlist.entity.Track;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PlaylistDto {
    @Getter
    @AllArgsConstructor
    public class Post{
        @NotBlank(message = "제목을 입력하세요.")
        private String playlistTitle;

        private List<Track> tracks;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public class Patch{
        private long playlistId;
        private String playlistTitle;

        private List<Track> tracks;
    }
    @Getter
    @AllArgsConstructor
    @Builder
    public class Response{
        private long playlistId;
        private long userId;
        private String playlistTitle;
        private String title;
        private String nickname;
        /** 필요하려나 */
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        private List<TrackDto.Response> tracks;

    }
}