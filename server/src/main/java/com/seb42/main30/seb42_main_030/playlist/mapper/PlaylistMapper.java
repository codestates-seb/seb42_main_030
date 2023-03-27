package com.seb42.main30.seb42_main_030.playlist.mapper;

import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPatchDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistPostDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import com.seb42.main30.seb42_main_030.playlist.dto.SongResponseDto;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.playlist.entity.Song;
import com.seb42.main30.seb42_main_030.user.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

// @Mapper(componentModel = "spring")
public interface PlaylistMapper {

    List<PlaylistResponseDto> playlistToPlaylistResponseDtoList(List<Playlist> playlistList);

//    List<SimplePlaylistResponseDto> playlistToSimplePlaylistResponseDtoList(List<Playlist> playlistList);


    default Playlist playlistPostDtoToPlaylist(PlaylistPostDto playlistPostDto, User user) {
                //  PLPostDto > PL
        if (playlistPostDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setTitle(playlistPostDto.getTitle());
            playlist.setUser(user);
/**         playlist.setCategoryList(playlistPostDto.getCategoryList());
            playlist.setStatus(playlistPostDto.isStatus());
*/
            return playlist;
        }
    }

    default Playlist playlistPatchDtoToPlaylist(PlaylistPatchDto playlistPatchDto) {
                // PLPatchDto > PL
        if (playlistPatchDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setPlaylistId(playlistPatchDto.getPlaylistId());
            playlist.setTitle(playlistPatchDto.getTitle());
/**         playlist.setCategoryList(playlistPatchDto.getCategoryList());
            playlist.setStatus(playlistPatchDto.isStatus());
*/
            return playlist;
        }
    }

    default PlaylistResponseDto playlistToPlaylistResponseDto(Playlist playlist) {
                    // PL > PLResponseDto
        if (playlist == null) {
            return null;
        } else {
            PlaylistResponseDto.PlaylistResponseDtoBuilder playlistResponseDto = PlaylistResponseDto.builder();
            List<Song> songs = playlist.getSongs();
            playlistResponseDto.playlistId(playlist.getPlaylistId());
            playlistResponseDto.title(playlist.getTitle());
            playlistResponseDto.createdAt(playlist.getCreatedAt());
            playlistResponseDto.modifiedAt(playlist.getModifiedAt());
            playlistResponseDto.userId(playlist.getUser().getUserId());
            playlistResponseDto.nickname(playlist.getUser().getNickname());
/**         playlistResponseDto.like(playlist.getLikes().size());
            playlistResponseDto.categoryList(playlist.getCategoryList());
            playlistResponseDto.status(playlist.isStatus());
*/
            playlistResponseDto.songs(songsToSongResponseDto(songs));
            return playlistResponseDto.build();
        }
    }

    default List<SongResponseDto> songsToSongResponseDto(List<Song> songs) {
        return  songs
                .stream()
                .map(song -> SongResponseDto
                        .builder()
                        .songTitle(song.getSongTitle())
                        .track(song.getTrack())
                        .uri(song.getUri())
                        .images(song.getImages())
                        .build())
                .collect(Collectors.toList());
    }
/**
    default LikePlaylistResponseDto playlistToDetailPlaylistResponseDto(Playlist playlist, Boolean likeState, Boolean bookmarkState) {
        if (playlist == null) {
            return null;
        } else {
            LikePlaylistResponseDto.LikePlaylistResponseDtoBuilder likePlaylistResponseDto = LikePlaylistResponseDto.builder();
            List<PlaylistItem> playlistItems = playlist.getPlaylistItems();
            likePlaylistResponseDto.playlistId(playlist.getPlaylistId());
            likePlaylistResponseDto.title(playlist.getPlTitle());
            likePlaylistResponseDto.memberId(playlist.getMember().getMemberId());
            likePlaylistResponseDto.name(playlist.getMember().getName());
            likePlaylistResponseDto.like(playlist.getLikes().size());
            likePlaylistResponseDto.categoryList(playlist.getCategoryList());
            likePlaylistResponseDto.status(playlist.isStatus());
            likePlaylistResponseDto.likeState(likeState);
            likePlaylistResponseDto.bookmarkState(bookmarkState);
            likePlaylistResponseDto.playlistItems(playlistItemsToPlaylistItemResponseDto(playlistItems));
            return likePlaylistResponseDto.build();
        }
    }

    default LikePlaylistResponseDto playlistToLikePlaylistResponseDto(Playlist playlist, Boolean likeState, Boolean bookmarkState) {
        if (playlist == null) {
            return null;
        } else {
            LikePlaylistResponseDto.LikePlaylistResponseDtoBuilder likePlaylistResponseDto = LikePlaylistResponseDto.builder();
            List<PlaylistItem> playlistItems = playlist.getPlaylistItems();
            likePlaylistResponseDto.playlistId(playlist.getPlaylistId());
            likePlaylistResponseDto.title(playlist.getPlTitle());
            likePlaylistResponseDto.memberId(playlist.getMember().getMemberId());
            likePlaylistResponseDto.name(playlist.getMember().getName());
            likePlaylistResponseDto.categoryList(playlist.getCategoryList());
            likePlaylistResponseDto.status(playlist.isStatus());
            if (likeState == true){likePlaylistResponseDto.like(playlist.getLikes().size()+1);}
            if (likeState == false){likePlaylistResponseDto.like(playlist.getLikes().size()-1);}
            likePlaylistResponseDto.likeState(likeState);
            likePlaylistResponseDto.bookmarkState(bookmarkState);
            likePlaylistResponseDto.playlistItems(playlistItemsToPlaylistItemResponseDto(playlistItems));
            return likePlaylistResponseDto.build();
        }
    }
    default List<LikePlaylistResponseDto> playlistToPlaylistResponseDtoList(List<Playlist> playlistList, List<Boolean> bookmarkStates) {
        if ( playlistList == null ) {
            return null;
        }

        List<LikePlaylistResponseDto> list = new ArrayList<>( playlistList.size() );
        for ( int i = 0; i<playlistList.size(); i++ ) {
            list.add( playlistToDetailPlaylistResponseDto(playlistList.get(i), true ,bookmarkStates.get(i) ) );
        }

        return list;
    }
*/
/**
    default SimplePlaylistResponseDto playlistToSimplePlaylistResponseDto(Playlist playlistList) {
        if ( playlistList == null ) {
            return null;
        }

        SimplePlaylistResponseDto.SimplePlaylistResponseDtoBuilder simplePlaylistResponseDto = SimplePlaylistResponseDto.builder();

        simplePlaylistResponseDto.playlistId( playlistList.getPlaylistId() );
        simplePlaylistResponseDto.title( playlistList.getPlTitle() );
        simplePlaylistResponseDto.playlistItems( playlistItemsToPlaylistItemResponseDto( playlistList.getPlaylistItems() ) );
        simplePlaylistResponseDto.status( playlistList.isStatus() );
        List<String> list1 = playlistList.getCategoryList();
        if ( list1 != null ) {
            simplePlaylistResponseDto.categoryList( new ArrayList<String>( list1 ) );
        }
        simplePlaylistResponseDto.createdAt( playlistList.getCreatedAt() );
        simplePlaylistResponseDto.modifiedAt( playlistList.getModifiedAt() );

        return simplePlaylistResponseDto.build();
    }
*/
    default List<PlaylistResponseDto> playlistRankDtoToUser(List<User> user) {
        List<Playlist> playlistList = new ArrayList<>();
        for (User user1 : user) {
            playlistList.add(user1.getPlaylists().get(0));
        }
        List<PlaylistResponseDto> playlistResponseDtoList = playlistList.stream()
                .map(playlist -> playlistToPlaylistResponseDto(playlist))
                .collect(Collectors.toList());

        return  playlistResponseDtoList;
    }

}
