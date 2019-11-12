package com.reflection.increadible.service;

import com.reflection.increadible.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public interface UserService extends UserDetailsService {

    public Iterable<User> listUsers();

    public User getUser(String username);

    public String createUser(User newUser);

    public String login(User returningUser, HttpServletRequest request, HttpSession session) throws Exception;

    public User addUserGoal(User userGoal);

    public User getUserGoal();

}
