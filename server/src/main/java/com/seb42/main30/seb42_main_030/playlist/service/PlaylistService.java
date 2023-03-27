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
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
    private final UserRepository userRepository;

    // 플레이리스트 생성
    public Playlist createPlaylist(Playlist playlist, PlaylistPostDto playlistPostDto){
        List<Song> songList = new ArrayList<>();
        for (int i = 0; i < playlistPostDto.getSongs().size(); i++) {
            Song song = new Song();
            song.setUri(playlistPostDto.getSongs().get(i).getUri());
            song.setSongTitle(playlistPostDto.getSongs().get(i).getSongTitle());
            song.setAlbum(playlistPostDto.getSongs().get(i).getAlbum());
            song.setTrack(playlistPostDto.getSongs().get(i).getTrack());
            song.setArtist(playlistPostDto.getSongs().get(i).getArtist());
            song.setImages(playlistPostDto.getSongs().get(i).getImages());
            song.setPlaylist(playlist);
            songList.add(song);
            songRepository.save(song);
        }

        playlist.setSongs(songList);
        Playlist savedPlaylist = playlistRepository.save(playlist);

        return savedPlaylist;
    }

    // 플레이리스트 수정
    public Playlist updatePlaylist(Playlist playlist, PlaylistPatchDto playlistPatchDto, Long authUserId) {
        Playlist findPlaylist = verifiedPlaylist(playlist.getPlaylistId()); //수정할 플리가 있는지 검증

        if (findPlaylist.getUser().getUserId() != authUserId) {
            throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }

        Optional.ofNullable(playlist.getTitle()) // 제목 수정
                .ifPresent(title -> findPlaylist.setTitle(title));
//        Optional.ofNullable(playlist.getTagList()) // 태그 수정
//                .ifPresent(tags -> findPlaylist.setTagList(tags));

        for (int i = 0; i < findPlaylist.getSongs().size(); i++) {
            songRepository.delete(findPlaylist.getSongs().get(i));
        }

        List<Song> songList = new ArrayList<>();
        for (int i = 0; i < playlistPatchDto.getSongs().size(); i++) {
            Song song = new Song();
            song.setUri(playlistPatchDto.getSongs().get(i).getUri());
            song.setSongTitle(playlistPatchDto.getSongs().get(i).getSongTitle());
            song.setAlbum(playlistPatchDto.getSongs().get(i).getAlbum());
            song.setTrack(playlistPatchDto.getSongs().get(i).getTrack());
            song.setArtist(playlistPatchDto.getSongs().get(i).getArtist());
            song.setImages(playlistPatchDto.getSongs().get(i).getImages());
            song.setPlaylist(playlist);
            songList.add(song);
            songRepository.save(song);
        }
        findPlaylist.setSongs(songList);

//        findPlaylist.setModifiedAt(LocalDateTime.now());

        return playlistRepository.save(findPlaylist);
    }
    // 플레이리스트 서치
    public Page<Playlist> searchPlaylists(String type, String name, int page, int size) {

        List<Playlist> searchPlaylists = new ArrayList<>();

        if (type.equals("title")) {
            //해당 타이틀을 포함하는 플레이리스트 목록
            searchPlaylists = playlistRepository.findByPlTitleContaining(name);
        }
        else if (type.equals("name")) {
            // 멤버 이름이 포함된 member 검색
            List<User> searchMembers = userRepository.findByNameContaining(name);
            for (User user : searchUsers) {
                // 해당 member들이 포함된 플리 검색
                List<Playlist> playlists = playlistRepository.findByUser(user);
                int index = 0;
                for (Playlist playlist : playlists) {
                    // 추가
                    searchPlaylists.add(playlists.get(index));
                    index++;
                }
            }
        }
        else if (type.equals("category")) {
            // 해당 카테고리를 포함하는 플레이리스트 목록
//            List<String> search = new ArrayList<>();
//            search.add(name);
//            searchPlaylists = playlistRepository.findByCategoryListContaining(search);

            // 모든 플레이리스트를 조회해서 카테고리랑 일치하면 리스트에 넣기
            // 플레이리스트를 전부 조회하기 때문에 플레이리스트가 많아지면 문제가 있음
            List<Playlist> allPlaylists = playlistRepository.findAll();
            for (Playlist playlist : allPlaylists){
                for (int i=0; i<playlist.getCategoryList().size(); i++){
                    if (playlist.getCategoryList().get(i).equals(name)){
                        searchPlaylists.add(playlist);
                    }
                }
            }
        }
        else {throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("likes.size()").descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchPlaylists.size());
        Page<Playlist> playlistPage = new PageImpl<>(searchPlaylists.subList(start, end), pageRequest, searchPlaylists.size());
        return playlistPage;

    }
    // 플레이리스트 삭제
    public void deletePlaylist(long playlistId) {
        Playlist findPlaylist = verifiedPlaylist(playlistId);

        List<Diary> diarys = diaryRepository.findByPlaylistId(findPlaylist.getPlaylistId());
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
    public Playlist findPlaylist(long playlistId) {

        return verifiedPlaylist(playlistId);
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
