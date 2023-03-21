package com.seb42.main30.seb42_main_030.playlist.mapper;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;

import java.util.List;

public interface PlaylistMapper {
    Playlist playlistPostToPlaylist (PlaylistDto.Post post);
    Playlist playlistPatchToPlaylist (PlaylistDto.Patch patch);

    PlaylistDto.Response playlistToResponse(Playlist playlist);

    List<PlaylistDto.Response> playlistToResponses(List<Playlist> playlists);


}
