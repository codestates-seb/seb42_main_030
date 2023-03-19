package com.seb42.main30.seb42_main_030.rank;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RankRepository extends JpaRepository<Rank, Long> {

    List<Rank> findByUpdateAtLessThan(LocalDateTime aDayAgo);

}
