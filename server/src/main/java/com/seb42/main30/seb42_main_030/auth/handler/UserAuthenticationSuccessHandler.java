package com.seb42.main30.seb42_main_030.auth.handler;

import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업(여기에)

        String userId = authentication.getName();

        System.out.println("User " + userId + " successfully authenticated");
        try(PrintWriter writer = response.getWriter()){
            JsonObject json = new JsonObject();
            json.addProperty("email", userId);

            response.setStatus(HttpStatus.ACCEPTED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());

            writer.write(json.toString());
        }
        log.info("# Authenticated successfully!: {}");
    }
}
