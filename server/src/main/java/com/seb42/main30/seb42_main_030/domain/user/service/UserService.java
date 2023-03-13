package com.seb42.main30.seb42_main_030.domain.user.service;

import com.seb42.main30.seb42_main_030.domain.user.entity.User;
import com.seb42.main30.seb42_main_030.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    // todo (1) user 등록(소셜 회원 가입)

    // (2) user 정보 수정
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getNickname())
                .ifPresent(name -> findUser.setNickname(name));
        Optional.ofNullable(user.getImageUrl())
                .ifPresent(url -> findUser.setImageUrl(url));

        // 회원정보 업데이트
        return userRepository.save(findUser);
    }

    // todo (3) user 정보 조회
    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    // todo (4) 회원 탈퇴
    public void deleteUser(long userId) {

    }


}

