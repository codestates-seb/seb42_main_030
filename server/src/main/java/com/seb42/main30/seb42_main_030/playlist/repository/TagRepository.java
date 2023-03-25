package com.seb42.main30.seb42_main_030.playlist.repository;

import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.diary.entity.tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<tag, Long> {
    List<tag> findByPlaylist(Playlist playlist);
    List<tag> findByTagUserId(Long tagUserId);
}
