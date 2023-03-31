package com.seb42.main30.seb42_main_030.comment.playlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class TrackDto {
    @Getter
    @AllArgsConstructor
    public class Post{
        @NotBlank(message = "영상을 추가하세요.")
        private String url;
        private String trackTitle;
        private String thumbnail;
        private String channelTitle;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public class Patch{
        private String url;
        private String trackTitle;
        private String thumbnail;
        private String channelTitle;
    }
    @Getter
    @AllArgsConstructor
    public class Response{
        private String url;
        private String trackTitle;
        private String thumbnail;
        private String channelTitle;
        private String videoId;

    }
}
