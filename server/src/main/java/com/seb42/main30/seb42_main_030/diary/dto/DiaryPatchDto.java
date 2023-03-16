package com.seb42.main30.seb42_main_030.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiaryPatchDto {
    @Positive
    private long userId;

    @Positive
    private long diaryId;

    @NotBlank
    private String title;

    @NotBlank
    private String body;

}
