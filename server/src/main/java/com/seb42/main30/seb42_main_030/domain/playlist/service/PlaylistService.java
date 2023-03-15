package com.seb42.main30.seb42_main_030.domain.playlist.service;

import com.seb42.main30.seb42_main_030.domain.playlist.entity.Playlist;
import com.seb42.main30.seb42_main_030.domain.playlist.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playRepository;


}
