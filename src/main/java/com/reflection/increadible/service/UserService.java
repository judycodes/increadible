package com.reflection.increadible.service;

import com.reflection.increadible.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends UserDetailsService {

    public User getUser(String username);

    public String createUser(User newUser) throws Exception;

    public String login(User user);

}
