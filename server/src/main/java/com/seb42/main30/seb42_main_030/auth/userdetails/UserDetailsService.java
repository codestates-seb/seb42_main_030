package com.seb42.main30.seb42_main_030.auth.userdetails;

import com.seb42.main30.seb42_main_030.auth.utils.CustomAuthorityUtils;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class UserDetailsService implements MemberDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;

    public UserDetailsService(UserRepository userRepository, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public MemberDetails loadMemberByMemberName(String membername) throws MembernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(membername);
        User findUser = optionalUser.orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));

        return new UserDetails(findUser);
    }

    private final class UserDetails extends User implements MemberDetails {
    }

    UserDetails(User user) {
        setUserId(user.getUserId());
        setNickname(user.getNickname());
        setEmail(user.getEmail());
        setPassword(user.getPassword());
        setRoles(user.getRoles());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorityUtils.createAuthorities(this.getRoles());
    }

    @Override
    public String getNickname() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
