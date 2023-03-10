package com.seb42.main30.seb42_main_030.domain.user.controller;

import com.seb42.main30.seb42_main_030.domain.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.domain.user.entity.User;
import com.seb42.main30.seb42_main_030.domain.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    // UserMapper DI
    public UserController(UserService userService, Usermapper usermapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    // todo (1) user 등록(소셜 회원 가입-OAuth2)


    // (2) user 정보 조회
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(user)), HttpStatus.OK);
    }


    // (3) user 정보 수정
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody) {

        requestBody.setUserId(userId);

        User updateUser = userService.updateUser(mapper.userPatchToUser(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(updateUser)), HttpStatus.OK);
    }

    // (4) user 탈퇴
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}