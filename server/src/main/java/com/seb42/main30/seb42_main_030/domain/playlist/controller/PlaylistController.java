package com.seb42.main30.seb42_main_030.domain.playlist.controller;

import com.seb42.main30.seb42_main_030.domain.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.domain.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/playlist")
@Valid
public class PlaylistController {
    private final PlaylistService playlistservice;

    // 플레이리스트 생성
    @PostMapping
    public ResponseEntity postplaylist(@Valid @RequestBody PlaylistPostDto)
}
