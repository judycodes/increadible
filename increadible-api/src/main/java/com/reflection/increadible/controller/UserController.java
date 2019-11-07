package com.reflection.increadible.controller;

import com.reflection.increadible.model.JwtResponse;
import com.reflection.increadible.model.User;
import com.reflection.increadible.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    /**
     * GET REQUEST: List users
     * @return all users in db
     */
    @GetMapping("/listUsers")
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

//    /**
//     * GET REQUEST: Endpoint connection check
//     * @return Hello World!!
//     */
//    @GetMapping("/hello")
//    public String helloWorld() {
//        return "Hello World!! - from User Controller";
//    }

    /**
     * POST REQUEST: Create new user
     * @param newUser
     * @return creates a new user and responds with a user-associated token
     */
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
    }

    /**
     *
     * @param existingUser
     * @return user-associated token if user exists in db
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User existingUser) {
        return ResponseEntity.ok(new JwtResponse(userService.login(existingUser)));
    }

    @PatchMapping("/goal")
    public User addUserGoal(@RequestBody User userGoal) {
        return userService.addUserGoal(userGoal);
    }

    @GetMapping("/goal")
    public User getUserGoal(){
        return userService.getUserGoal();
    }

}
