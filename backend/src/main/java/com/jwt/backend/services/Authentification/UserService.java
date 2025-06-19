package com.jwt.backend.services.Authentification;

import com.jwt.backend.dtos.CredentialsDto;
import com.jwt.backend.dtos.SignUpDto;
import com.jwt.backend.dtos.UserDto;

public interface UserService {

    public UserDto login(CredentialsDto credentialsDto);

    public UserDto register(SignUpDto userDto);

    public UserDto findByLogin(String login);
}
