package com.seb42.main30.seb42_main_030.domain.playlist.dto;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class PlaylistPostDto {

    @NotBlank(message = "제목을 입력하세요.")
    private String title;

    private List<String> tagList;


}
