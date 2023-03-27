package com.seb42.main30.seb42_main_030.playlist.controller;

import com.seb42.main30.seb42_main_030.playlist.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Valid
public class SongController {
    private final SongRepository songRepository;

    // 곡 서치
    @PostMapping("/v1/search/")



}
