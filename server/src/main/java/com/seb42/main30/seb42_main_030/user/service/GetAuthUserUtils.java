package com.seb42.main30.seb42_main_030.user.service;


import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public class GetAuthUserUtils {
    public static Authentication getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            throw new BusinessException(ExceptionCode.USER_NOT_FOUND);
        }
        authentication.getPrincipal();
        return authentication;
    }
}
