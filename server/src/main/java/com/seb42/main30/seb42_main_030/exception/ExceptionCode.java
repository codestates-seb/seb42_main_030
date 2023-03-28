package com.seb42.main30.seb42_main_030.exception;

import lombok.Getter;

public enum ExceptionCode {

    COMMENT_NOT_FOUND(1, "댓글을 찾지 못하였습니다"),
    COMMENT_EXIST(2,"댓글이 존재합니다"),
    NOT_AUTHORITY(3, "권한이 없습니다."),
    DIARY_NOT_FOUND(4, "해당 글을 찾지 못했습니다."),
    USER_NOT_FOUND(5, "해당 유저를 찾지 못했습니다."),
    USER_EXISTS(6, "헤당 유저가 존재합니다."),
    BAD_REQUEST(7, "잘못된 요청입니다."),
    PLAYLIST_NOT_EXIST(8, "플레이리스트가 존재하지 않습니다.")    ;


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
