package com.seb42.main30.seb42_main_030.playlist.repository;

import com.seb42.main30.seb42_main_030.playlist.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
