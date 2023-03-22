package com.seb42.main30.seb42_main_030.playlist.controller;

import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.mapper.PlaylistMapper;
import com.seb42.main30.seb42_main_030.playlist.service.PlaylistService;
import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/playlists")
@Valid
public class PlaylistController {
    private final PlaylistService playlistService;
    private final PlaylistMapper mapper;

    // 플레이리스트 생성
    @PostMapping("")
    public ResponseEntity postplaylist(@Valid @RequestBody PlaylistDto.Post post_){
        Playlist playlist = playlistService.createPlaylist(plalistMapper.playlistPostToPlaylist(post));

        PlaylistDto.Response response = mapper.playlistToResponse(playlist);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 플레이리스 조회
    @GetMapping
    public ResponseEntity getPlList(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                    @Positive @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Playlist> pagePlList = playlistService.findPlList(page - 1, size);
        List<Playlist> playlists = pagePlList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.playlistToPlaylistResponseDtoList(playlists), pagePlList), HttpStatus.OK);
    }

    // 플레이리스트 삭제
    @DeleteMapping("/{playlist-id}")
    public String deletePlaylist(@PathVariable("playlist-id") @Positive long playlistId) {

        playlistService.deletePlaylist(playlistId);

        return "success playlist deleted";
    }

    // 곡 등록
    @PostMapping("/{playlist_id}/tracks")
    public ResponseEntity posttrack(@Valid @RequestBody )
}
