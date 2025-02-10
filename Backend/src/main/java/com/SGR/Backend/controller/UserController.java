package com.SGR.Backend.controller;

import com.SGR.Backend.dto.CredentialsDto;
import com.SGR.Backend.model.User;
import com.SGR.Backend.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private AuthUserService authUserService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody CredentialsDto credentialsDto) {
        System.out.println(credentialsDto.name() + " ====> " + String.valueOf(credentialsDto.password()));
        User savedUser = authUserService.RegisterUser(credentialsDto);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUser() {
        List<User> users = authUserService.getAllUsers();
        System.out.println("Aaaaaaaaa ================");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody CredentialsDto credentialsDto) {

        String result = authUserService.verifyUser(credentialsDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
