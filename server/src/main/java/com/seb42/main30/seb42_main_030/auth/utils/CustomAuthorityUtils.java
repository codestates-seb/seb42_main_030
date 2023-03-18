package com.seb42.main30.seb42_main_030.auth.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomAuthorityUtils {

    public List<GrantedAuthority> stringToGrantedAuthority(String role) {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_"+role);
        List<GrantedAuthority> authorities = List.of(simpleGrantedAuthority);

        return authorities;
    }
}
