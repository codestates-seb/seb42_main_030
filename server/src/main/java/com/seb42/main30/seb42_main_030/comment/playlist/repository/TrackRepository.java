package com.seb42.main30.seb42_main_030.comment.playlist.repository;



import com.seb42.main30.seb42_main_030.comment.playlist.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
}
