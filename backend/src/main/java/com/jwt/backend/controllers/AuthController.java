package com.jwt.backend.controllers;

import com.jwt.backend.services.Authentification.UserServiceImpl;
import com.jwt.backend.config.UserAuthenticationProvider;
import com.jwt.backend.dtos.CredentialsDto;
import com.jwt.backend.dtos.SignUpDto;
import com.jwt.backend.dtos.UserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")

@RequiredArgsConstructor
public class AuthController {

    private final UserServiceImpl userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

}
