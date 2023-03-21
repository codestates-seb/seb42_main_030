package com.seb42.main30.seb42_main_030.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class PlaylistDto {
    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotNull(message = "제목을 입력하세요.")
        private String title;
        private List<String> tagList;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        private long playlist_id;
        private String title;
    }
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long playlist_id;
        private String title;
        private String album;
        private String track;
        private String artist;
        private String album_art;
        private long diary_id;
    }
}
