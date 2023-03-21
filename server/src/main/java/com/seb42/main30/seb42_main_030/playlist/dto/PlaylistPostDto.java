package com.seb42.main30.seb42_main_030.playlist.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class PlaylistPostDto {

    @NotNull(message = "제목을 입력하세요.")
    private String title;

    private List<SongDto> songs;
    private List<String> tagList;


}
