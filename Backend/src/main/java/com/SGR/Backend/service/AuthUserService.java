package com.SGR.Backend.service;

import com.SGR.Backend.CustomUserDetails;
import com.SGR.Backend.dto.CredentialsDto;
import com.SGR.Backend.model.User;
import com.SGR.Backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AuthUserService {


    private final UserRepository userRepository;


    private final AuthenticationManager authenticationManager;


    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JwtService jwtService;


    public AuthUserService(UserRepository userRepository, AuthenticationManager authenticationManager, BCryptPasswordEncoder bCryptPasswordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtService = jwtService;
    }

    public User RegisterUser(CredentialsDto credentialsDto) {
        User user = new User();
        user.setName(credentialsDto.name());
        user.setPassword(bCryptPasswordEncoder.encode(String.valueOf(credentialsDto.password())));
        user.setAdmin(false);
        System.out.println(bCryptPasswordEncoder.matches(String.valueOf(credentialsDto.password()), user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String verifyUser(CredentialsDto credentialsDto) {
        Authentication authenticate
                = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        credentialsDto.name(), String.valueOf(credentialsDto.password())
                )
        );

        if (authenticate.isAuthenticated()){
            User user = userRepository.findUserByName(credentialsDto.name());
            return jwtService.generateToken(user);
        }
        return null;
    }
}
