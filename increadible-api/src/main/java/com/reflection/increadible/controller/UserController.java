package com.reflection.increadible.controller;

import com.reflection.increadible.model.JwtResponse;
import com.reflection.increadible.model.User;
import com.reflection.increadible.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    /**
     * GET REQUEST: Endpoint connection check
     * @return Hello World!!
     */
    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World!! - from User Controller";
    }

    /**
     * GET REQUEST: List users
     * @return all users in db
     */
    @GetMapping("/listUsers")
    public Iterable<User> listUsers() {
        return userService.listUsers();
    }

    /**
     * POST REQUEST: Create new user
     * @param newUser
     * @return creates a new user and responds with a user-associated token
     */
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        try{
            return ResponseEntity.ok(new JwtResponse(userService.createUser(newUser)));
        }
        catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.valueOf(226), "This username already exists. Try again!", e);
        }
    }

    /**
     * POST REQUEST: Log in existing user
     * @param returningUser
     * @param request
     * @param session
     * @return logs in existing user and responds with a user-associated token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User returningUser, HttpServletRequest request, HttpSession session) {
        try {
            return ResponseEntity.ok(new JwtResponse(userService.login(returningUser, request, session)));
        }
        catch (Exception e){
            throw new ResponseStatusException(
                    HttpStatus.valueOf(401), "Username/Password Incorrect.", e);
        }

    }

    /**
     * PATCH REQUEST: Create and update user goal
     * @param userGoal
     * @return User with goal added
     */
    @PatchMapping("/goal")
    public User addUserGoal(@RequestBody User userGoal) {
        return userService.addUserGoal(userGoal);
    }

    /**
     * GET REQUEST: Show user with goal
     * @return User with goal
     */
    @GetMapping("/goal")
    public User getUserGoal(){
        return userService.getUserGoal();
    }

}
