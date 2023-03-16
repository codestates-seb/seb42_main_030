package com.seb42.main30.seb42_main_030.playlist.service;

import com.seb42.main30.seb42_main_030.playlist.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playRepository;


}
