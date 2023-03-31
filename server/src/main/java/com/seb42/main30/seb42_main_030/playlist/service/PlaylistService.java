package com.seb42.main30.seb42_main_030.playlist.service;



import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.entity.Track;
import com.seb42.main30.seb42_main_030.playlist.repository.PlaylistRepository;
import com.seb42.main30.seb42_main_030.playlist.repository.TrackRepository;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;
//    private final DiaryRepository diaryRepository;
//    private final DiaryService diaryService;
    private final UserService userService;
    private final UserRepository userRepository;



    /** CREATE */
    public Playlist createPlaylist(Playlist playlist, PlaylistDto.Post post) {
        List<Track> trackList = new ArrayList<>();
        for (int i = 0; i < post.getTracks().size(); i++) {
            Track track = new Track();
            track.setUrl(post.getTracks().get(i).getUrl());
            track.setTrackTitle(post.getTracks().get(i).getTrackTitle());
            track.setThumbnail(post.getTracks().get(i).getThumbnail());
            track.setChannelTitle(post.getTracks().get(i).getChannelTitle());
            track.setVideoId(post.getTracks().get(i).getVideoId());
            track.setPlaylist(playlist);
            trackList.add(track);
            trackRepository.save(track);
        }
        playlist.setTracks(trackList);
        Playlist savedPlaylist = playlistRepository.save(playlist);

        return savedPlaylist;
    }
    /** READ */
    // Single
    public Playlist findPlaylist(long playlistId) {

        return verifiedPlaylist(playlistId);
    }
    // All
    public Page<Playlist> findAllPlayList(int page, int size) {

        Page<Playlist> findAllPlaylist = playlistRepository.findAll(
                PageRequest.of(page, size, Sort.by("playlistId").descending()));

        return findAllPlaylist;
    }

    /** UPDATE */
    public Playlist updatePlaylist(Playlist playlist, PlaylistDto.Patch patch, Long loginUserId) {
        Playlist findPlaylist = verifiedPlaylist(playlist.getPlaylistId()); //수정할 플레이리스트 검증

        Optional.ofNullable(playlist.getPlaylistTitle()) //제목수정
                .ifPresent(title -> findPlaylist.setPlaylistTitle(title));

        for (int i = 0; i < findPlaylist.getTracks().size(); i++) {
            trackRepository.delete(findPlaylist.getTracks().get(i));
        }

        List<Track> trackList = new ArrayList<>();
        for (int i = 0; i < patch.getTracks().size(); i++) {
            Track track = new Track();
            track.setUrl(patch.getTracks().get(i).getUrl());
            track.setTrackTitle(patch.getTracks().get(i).getTrackTitle());
            track.setThumbnail(patch.getTracks().get(i).getThumbnail());
            track.setChannelTitle(patch.getTracks().get(i).getChannelTitle());
            track.setVideoId(patch.getTracks().get(i).getVideoId());
            track.setPlaylist(playlist);
            trackList.add(track);
            trackRepository.save(track);
        }
        findPlaylist.setTracks(trackList);

        return playlistRepository.save(findPlaylist);
    }
    /** DELETE */
//    public void deletePlaylist(long playlistId) {
//        Playlist findPlaylist = verifiedPlaylist(playlistId);
//
//        List<Diary> diaries = diaryRepository.findByPlaylistId(findPlaylist.getPlaylistId());
//        for (Diary diary : diaries) {
//            diaryService.deleteDiary(diary.getDiaryId());
//        }
//
//        playlistRepository.delete(findPlaylist);
//    }

    public void deletePlaylist (long playlistId) {

        Playlist verifyPlaylist = verifyWriter(playlistId);
        playlistRepository.deleteById(verifyPlaylist.getPlaylistId());

    }



    // 작성자 검증
    private Playlist verifyWriter (long playlistId) {

        long userId = userService.getLoginUser().getUserId();
        Playlist playlist = verifiedPlaylist(playlistId);
        if (playlist.getUser().getUserId() != userId) {
            throw new BusinessException(ExceptionCode.NOT_AUTHORITY);
        }
        return playlist;
    }

    // 플레이리스트 검증
    private Playlist verifiedPlaylist(long playlistId) {
        Playlist findPlaylist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST));

        return findPlaylist;
    }

    // 플레이리스트 없을때
    private void verifiedNoPlaylist(Page<Playlist> findAllPlaylist) {
        if (findAllPlaylist.getTotalElements() == 0) {
            throw new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST);
        }
    }
}
