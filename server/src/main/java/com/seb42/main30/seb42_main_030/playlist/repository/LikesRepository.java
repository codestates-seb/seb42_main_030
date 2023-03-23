package com.seb42.main30.seb42_main_030.playlist.repository;

import com.seb42.main30.seb42_main_030.diary.entity.Likes;
import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    List<Likes> findByPlaylist(Playlist playlist);
}
