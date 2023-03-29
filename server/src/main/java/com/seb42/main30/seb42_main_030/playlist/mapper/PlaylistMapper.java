package com.seb42.main30.seb42_main_030.playlist.mapper;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import com.seb42.main30.seb42_main_030.playlist.dto.SongResponseDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.entity.Song;
import com.seb42.main30.seb42_main_030.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public interface PlaylistMapper {
    List<PlaylistResponseDto> playlistToPlaylistResponseDtoList(List<Playlist> playlistList);

    List<SimplePlaylistResponseDto> playlistToSimplePlaylistResponseDtoList(List<Playlist> playlistList);

    PlaylistResponseDto playlistToResponse(Playlist playlist);

    List<PlaylistResponseDto> playlistToResponses(List<Playlist> playlists);

    // Pl'Post' to Pl
    default Playlist playlistPostDtoToPlaylist(PlaylistPostDto playlistPostDto, User user) {
        if (playlistPostDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setTitle(playlistPostDto.getTitle());
            playlist.setUser(user);
            playlist.setTagList(playlistPostDto.getTagList());

            return playlist;
        }
    }

    // Pl to Pl'Response'
    default PlaylistResponseDto playlistToPlaylistResponseDto(Playlist playlist) {
        if (playlist == null) {
            return null;
        } else {
            PlaylistResponseDto.PlaylistResponseDtoBuilder playlistResponseDto = PlaylistResponseDto.builder();
            List<Song> playlistItems = playlist.getSongs();
            playlistResponseDto.playlist_id(playlist.getPlaylist_id());
            playlistResponseDto.title(playlist.getTitle());
            playlistResponseDto.createdAt(playlist.getCreatedAt());
            playlistResponseDto.modifiedAt(playlist.getModifiedAt());
            playlistResponseDto.user_id(playlist.getUser().getUserId());
            playlistResponseDto.nickname(playlist.getUser().getNickname());
            playlistResponseDto.tagList(playlist.gettagList());

            playlistResponseDto.songs(playlistItemsToPlaylistItemResponseDto(songs));
            return playlistResponseDto.build();
        }
    }

    default List<SongResponseDto> playlistItemsToPlaylistItemResponseDto(List<Song> songs) {
        return  songs
                .stream()
                .map(playlistItem -> SongResponseDto
                        .builder()
                        .url(playlistItem.getUrl())
                        .channelTitle(song.getChannelTitle())
                        .thumbnail(song.getThumbnail())
                        .videoId(song.getVideoId())
                        .title(song.getItemTitle())
                        .build())
                .collect(Collectors.toList());
    }

}
