package com.seb42.main30.seb42_main_030.rank;


import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Autowired
    public JobBuilderFactory jobBuilderFactory;

    @Autowired
    public StepBuilderFactory stepBuilderFactory;

    @Autowired
    private RankRepository rankRepository;

    @Autowired
    private RankService rankService;

    @Bean
    public Job job() {

        Job job = jobBuilderFactory.get("job")
                .start(step())
                .build();

        return job;

    }

    @Bean
    public Step step() {
        return stepBuilderFactory.get("step")
                .tasklet((contribution, chunkContext) -> {
                    log.info("Step!");
//                    업데이트 시각이 하루 이전인 문서 목록을 가져옴
//                    1.네이티브 쿼리 사용
//                    List<Rank> limitedRanks = rankRepository.selectLimitedRank();
//                2.JPQL 사용
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime aDayAgo = now.minusDays(1);
                    List<Rank> limitedRanks = rankRepository.findByUpdateAtLessThan(aDayAgo);

                    if (limitedRanks.size() > 0 && limitedRanks != null) {
                        for (Rank rank : limitedRanks) {
//                            deleteRank는 rank_id를 받아 서버와 db에서 문서 삭제를 구현하는 서비스
                            rankService.deleteRank(rank.getRankId());
                        }
                    }
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

}
