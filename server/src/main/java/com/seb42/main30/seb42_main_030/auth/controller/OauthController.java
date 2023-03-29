package com.seb42.main30.seb42_main_030.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

// Spotify OAuth2 Login AccessToken 받아오기
// "/oauth2/authorization/spotify"
@RestController
@RequestMapping("/callback")
@Validated
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class OauthController {
    @Value("${spring.security.oauth2.client.registration.spotify.clientId}") //application.yml에서 clientId 가져오기
    String clientId;

    @Value("${spring.security.oauth2.client.registration.spotify.clientSecret}") //application.yml에서 clientSecret 가져오기
    String clientSecret;

    @Value("${spring.security.oauth2.client.registration.spotify.redirect_uri}")
    String redirectUri;


    //URL의 쿼리에서 Authorization code 받아오기
    @ResponseBody
    @GetMapping("/login")
    public ResponseEntity<String> spotifyCallback(@RequestParam("code") String code){
        return getSpotifyAccessToken(code);
    }

    //Authorization code로 AccessToken 받아오기
    private ResponseEntity<String> getSpotifyAccessToken(String code){
        //HttpHeader에 데이터 담기
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded");
        //Authorization: Basic <base64 encoded client_id:client_secret>
        headers.add("Authorization", "Basic "+ base64(clientId+":"+clientSecret));

        //HttpBody에 데이터 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", redirectUri);    //application.yml의 redirect-uri와 동일한 uri

        RestTemplate restTemplate = new RestTemplate();
        //HttpHeader와 HttpBody를 하나로 묶기
        HttpEntity<MultiValueMap<String, String>> spotifyTokenRequest = new HttpEntity<>(params, headers);
        //Http요청
        ResponseEntity<String> response = restTemplate.exchange(
                "https://accounts.spotify.com/api/token",
                HttpMethod.POST,
                spotifyTokenRequest,
                String.class
        );
        return response;
    }

    //base64인코딩
    public static String base64(String authorization){
        Base64.Encoder encoder = Base64.getEncoder();

        String target = authorization;
        byte[] targetBytes = target.getBytes();
        byte[] encodedBytes = encoder.encode(targetBytes);

        return new String(encodedBytes);
    }
}

