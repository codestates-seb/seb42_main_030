package com.seb42.main30.seb42_main_030.playlist.repository;


import com.seb42.main30.seb42_main_030.playlist.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByPlTitleContaining(String plTitle);
}
