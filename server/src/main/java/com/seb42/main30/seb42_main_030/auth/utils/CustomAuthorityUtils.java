package com.seb42.main30.seb42_main_030.auth.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    private final List<String> USER_ROLES_STRING = List.of("USER");

    public List<String> createRoles() {
        return USER_ROLES_STRING;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities =
                roles.stream()
                        .map(role -> new SimpleGrantedAuthority(String.format("ROLE_%s", role)))
                        .collect(Collectors.toList());

        return authorities;
    }
}