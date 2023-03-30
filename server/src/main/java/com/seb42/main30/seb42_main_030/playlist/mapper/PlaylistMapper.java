package com.seb42.main30.seb42_main_030.playlist.mapper;


import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import com.seb42.main30.seb42_main_030.playlist.dto.TrackResponseDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.entity.Track;
import com.seb42.main30.seb42_main_030.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PlaylistMapper {

    /** Post **/
    default Playlist playlistPostToPlaylist(PlaylistDto.Post post, User user) {
        if (post == null) {
            return null;

    } else {
        Playlist playlist = new Playlist();
        playlist.setPlaylistTitle(post.getPlaylistTitle());
        playlist.setUser(user);
        return playlist;
    }
    }

    /** Patch **/
    default Playlist playlistPatchDtoToPlaylist(PlaylistDto.Patch patch) {
        if (patch == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setPlaylistId(patch.getPlaylistId());
            playlist.setPlaylistTitle(patch.getPlaylistTitle());

            return playlist;
        }
    }

    /** Response **/
    default PlaylistResponseDto playlistToPlaylistResponseDto(Playlist playlist) {
        if (playlist == null) {
            return null;
        } else {
            PlaylistResponseDto.PlaylistResponseDtoBuilder playlistResponseDto = PlaylistResponseDto.builder();
            List<Track> tracks = playlist.getTracks();
            playlistResponseDto.playlistId(playlist.getPlaylistId());
            playlistResponseDto.playlistTitle(playlist.getPlaylistTitle());
            playlistResponseDto.createdAt(playlist.getCreatedAt());
            playlistResponseDto.modifiedAt(playlist.getModifiedAt());
            playlistResponseDto.userId(playlist.getUser().getUserId());
            playlistResponseDto.nickname(playlist.getUser().getNickname());

            playlistResponseDto.tracks(playlistItemsToPlaylistItemResponseDto(tracks));
            return playlistResponseDto.build();
        }
    }

    /** Track > TrackResponse **/
    default List<TrackResponseDto> playlistItemsToPlaylistItemResponseDto(List<Track> tracks) {
        return  tracks
                .stream()
                .map(track -> TrackResponseDto
                        .builder()
                        .url(track.getUrl())
                        .channelTitle(track.getChannelTitle())
                        .thumbnail(track.getThumbnail())
                        .videoId(track.getVideoId())
                        .trackTitle(track.getTrackTitle())
                        .build())
                .collect(Collectors.toList());
    }

//    Playlist playlistPatchToPaylist (PlaylistDto.Patch patch);
//
//    @Mapping(source = "diary.diaryId", target = "diaryId")
//    @Mapping(source = "user.nickname", target = "userNickname")
//
//    PlaylistDto playlistToPlaylistDto(Playlist playlist);
//
//    List<PlaylistDto> playlistsToResponses (List<Playlist> playlists);


}
