package com.seb42.main30.seb42_main_030.playlist.service;

import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.mainpage.entity.Diary;
import com.seb42.main30.seb42_main_030.mainpage.repository.DiaryRepository;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPatchDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.entity.Song;
import com.seb42.main30.seb42_main_030.playlist.repository.PlaylistRepository;
import com.seb42.main30.seb42_main_030.playlist.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;
    private final DiaryRepository diaryRepository;
    private final DiaryService diaryService;

    // 플레이리스트 생성
    public Playlist createPlaylist(Playlist playlist, PlaylistPostDto playlistPostDto){
        List<Song> songList = new ArrayList<>();
        for (int i = 0; i < playlistPostDto.getSongs().size(); i++) {
            Song song = new Song();
            song.setUrl(playlistPostDto.getSongs().get(i).getUrl());
            song.setSongTitle(playlistPostDto.getSongs().get(i).getSongTitle());
            song.setAlbum(playlistPostDto.getSongs().get(i).getAlbum());
            song.setTrack(playlistPostDto.getSongs().get(i).getTrack());
            song.setArtist(playlistPostDto.getSongs().get(i).getArtist());
            song.setAlbum_art(playlistPostDto.getSongs().get(i).getAlbum_art());
            song.setPlaylist(playlist);
            songList.add(song);
            songRepository.save(song);
        }

        playlist.setSongs(songList);
        Playlist savedPlaylist = playlistRepository.save(playlist);

        return savedPlaylist;
    }

    // 플레이리스트 수정
    public Playlist updatePlaylist(Playlist playlist, PlaylistPatchDto playlistPatchDto, Long authMemberId) {
        Playlist findPlaylist = verifiedPlaylist(playlist.getPlaylist_id()); //수정할 플리가 있는지 검증

        if (findPlaylist.getUser().getUserId() != authUserId) {
            throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }

        Optional.ofNullable(playlist.getTitle()) // 제목 수정
                .ifPresent(title -> findPlaylist.setTitle(title));
        Optional.ofNullable(playlist.getTagList()) // 태그 수정
                .ifPresent(tags -> findPlaylist.setTagList(tags));

        for (int i = 0; i < findPlaylist.getSongs().size(); i++) {
            songRepository.delete(findPlaylist.getSongs().get(i));
        }

        List<Song> songList = new ArrayList<>();
        for (int i = 0; i < playlistPatchDto.getSongs().size(); i++) {
            Song song = new Song();
            song.setUrl(playlistPatchDto.getSongs().get(i).getUrl());
            song.setSongTitle(playlistPatchDto.getSongs().get(i).getSongTitle());
            song.setAlbum(playlistPatchDto.getSongs().get(i).getAlbum());
            song.setTrack(playlistPatchDto.getSongs().get(i).getTrack());
            song.setArtist(playlistPatchDto.getSongs().get(i).getArtist());
            song.setAlbum_art(playlistPatchDto.getSongs().get(i).getAlbum_art());
            song.setPlaylist(playlist);
            songList.add(song);
            songRepository.save(song);
        }
        findPlaylist.setSongs(songList);

//        findPlaylist.setModifiedAt(LocalDateTime.now());

        return playlistRepository.save(findPlaylist);
    }

    // 플레이리스트 삭제
    public void deletePlaylist(long playlist_id) {
        Playlist findPlaylist = verifiedPlaylist(playlist_id);

        List<Diary> diarys = diaryRepository.findByPlaylistId(findPlaylist.getPlaylist_id());
        for (Diary diary : diarys) {
            diaryService.deleteDiary(diary.getDiaryId());
        }

        playlistRepository.delete(findPlaylist);
    }

    // 플레이리스트 검증
    private Playlist verifiedPlaylist(long playlistId) {
        Playlist findPlaylist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST));

        return findPlaylist;
    }
    //단일 조회
    public Playlist findPlaylist(long playlist_id) {

        return verifiedPlaylist(playlist_id);
    }
    //전체 조회
    public Page<Playlist> findPlayList(int page, int size) {

        Page<Playlist> findAllPlaylist = playlistRepository.findAll(
                PageRequest.of(page, size, Sort.by("playlistId").descending()));

        return findAllPlaylist;
    }
    // 플레이리스트가 존재하지 않을때
    private void verifiedNoPlaylist(Page<Playlist> findAllPlaylist) {
        if (findAllPlaylist.getTotalElements() == 0) {
            throw new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST);
        }
    }
}
