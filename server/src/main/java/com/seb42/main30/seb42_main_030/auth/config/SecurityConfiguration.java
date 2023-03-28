package com.seb42.main30.seb42_main_030.auth.config;

import com.seb42.main30.seb42_main_030.auth.filter.JwtAuthenticationFilter;
import com.seb42.main30.seb42_main_030.auth.filter.JwtVerificationFilter;
import com.seb42.main30.seb42_main_030.auth.handler.UserAccessDeniedHandler;
import com.seb42.main30.seb42_main_030.auth.handler.UserAuthenticationEntryPoint;
import com.seb42.main30.seb42_main_030.auth.handler.UserAuthenticationFailureHandler;
import com.seb42.main30.seb42_main_030.auth.handler.UserAuthenticationSuccessHandler;
import com.seb42.main30.seb42_main_030.auth.jwt.JwtTokenizer;
import com.seb42.main30.seb42_main_030.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        // 회원 접근 제어
                        .antMatchers(HttpMethod.POST, "/users").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/users").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/users").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/users").hasRole("USER")
                        // 다이어리 접근 제어
                        .antMatchers(HttpMethod.POST, "/diary").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/diary").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/diary").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/diary").hasRole("USER")
                        // 댓글 접근 제어
                        .antMatchers(HttpMethod.POST, "/comments").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/comments").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/comments").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments").hasRole("USER")
                        // 로그아웃 접근 제어
                        .antMatchers(HttpMethod.POST, "/auth/logout").hasRole("USER")

                        .anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
