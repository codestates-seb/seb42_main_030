package com.seb42.main30.seb42_main_030.playlist.controller;



import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.mapper.PlaylistMapper;
import com.seb42.main30.seb42_main_030.playlist.repository.PlaylistRepository;
import com.seb42.main30.seb42_main_030.playlist.service.PlaylistService;
import com.seb42.main30.seb42_main_030.response.SingleResponseDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/playlist")
public class PlaylistController{
    private final PlaylistService service;
    private final PlaylistMapper mapper;
    private final PlaylistRepository repository;
    private final UserService userService;



// 플레이리스트 등록
    @PostMapping
    public ResponseEntity postPlaylist(@Valid @RequestBody PlaylistDto.Post post, Long loginUserId) {

        User user= userService.findUser(loginUserId);
        // Track을 제외한 playlist 생성
        Playlist playlist = mapper.playlistPostToPlaylist(post, user);

        Playlist savedPlaylist = service.createPlaylist(playlist, post);


        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.CREATED);
    }

// 플레이리스트 조회
    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlaylist(@PathVariable("playlist-id") @Positive long playlistId) {
        Playlist playlist = service.findPlaylist(playlistId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(playlist)), HttpStatus.OK);
    }

// 플레이리스트 수정
    @PatchMapping("/{playlist-id}")
    public ResponseEntity patchPlaylist(@PathVariable("playlist-id") @Positive long playlistId,
                                        @Valid @RequestBody PlaylistDto.Patch patch, Long loginUserId) {
        patch.setPlaylistId((playlistId));

        User user = userService.findUser(loginUserId);

        Playlist playlist = mapper.playlistPatchDtoToPlaylist(patch);
        Playlist savedPlaylist = service.updatePlaylist(playlist, patch, loginUserId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.OK);
    }

// 플레이리스트 삭제

    @DeleteMapping("/{playlist-id}")
    public String deletePlaylist(@PathVariable("playlist-id") @Positive long playlistId) {

        service.deletePlaylist(playlistId);

        return "success playlist deleted";
    }
}
