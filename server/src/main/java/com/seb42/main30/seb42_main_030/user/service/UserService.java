package com.seb42.main30.seb42_main_030.user.service;

import com.seb42.main30.seb42_main_030.auth.utils.CustomAuthorityUtils;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Transactional
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

//    public UserService(UserRepository memberRepository,
//                         ApplicationEventPublisher publisher,
//                         PasswordEncoder passwordEncoder,
//                         CustomAuthorityUtils authorityUtils) {
//        this.userRepository = memberRepository;
//        this.publisher = publisher;
//        this.passwordEncoder = passwordEncoder;
//        this.authorityUtils = authorityUtils;

    // (1) user 등록(자체 회원 가입)
    public User createUser(User user) {

        // 이미 등록된 이메일인지 검증
        verifyExistsEmail(user.getEmail());

        // password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // 회원가입시 기본 role = user 로 설정
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        user.setRoles(roles);

        // 회원정보 저장
        return userRepository.save(user);
    }

    // (2) user 정보 수정
    public User updateUser(User user) {

//        // 먼저 해당 회원의 이메일이 존재하는지 확인
//        verifyExistsEmail2(user.getEmail());
//
//        // 존재한다면 해당 회원의 아이디를 가져옴
        User findUser = findVerifiedUser(user.getUserId());

        // 회원정보 업데이트
        Optional.ofNullable(user.getNickname())
                .ifPresent(name -> findUser.setNickname(name));
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(password));
        Optional.ofNullable(user.getImageUrl())
                .ifPresent(url -> findUser.setImageUrl(url));

        // 회원정보 수정 저장
        return userRepository.save(findUser);
    }

    // (3) user 정보 조회
    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    // (4) 회원 탈퇴
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);

        userRepository.delete(findUser);

    }

    // (5) 이미 존재하는 유저인지 검증
    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() ->
                new BusinessException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }

    // (6) 이미 등록된 이메일인지 검증
    private void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent())
            throw new BusinessException(ExceptionCode.USER_EXISTS);
    }

}

