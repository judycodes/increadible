package com.reflection.increadible.service;

import com.reflection.increadible.config.JwtUtil;
import com.reflection.increadible.controller.SecurityController;
import com.reflection.increadible.model.User;
import com.reflection.increadible.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    @Qualifier("encoder")
    PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    SecurityController securityController;

    @Override
    public Iterable<User> listUsers() {return userRepository.findAll();}

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);

        if(user==null)
            throw new UsernameNotFoundException("User null");

        return new org.springframework.security.core.userdetails.User (user.getUsername(), bCryptPasswordEncoder.encode(user.getPassword()),
                true, true, true, true, getGrantedAuthorities(user));
    }

    @Override
    public User getUser(String username){
        return userRepository.findByUsername(username);
    }

    private List<GrantedAuthority> getGrantedAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(user.getUsername()));

        return authorities;
    }

    @Override
    public String login(User user) {
        User newUser = userRepository.findByUsername(user.getUsername());
        if (newUser != null && bCryptPasswordEncoder.matches(user.getPassword(), newUser.getPassword())) {
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        return null;
    }

    @Override
    public String createUser(User newUser) throws Exception {
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        if(userRepository.save(newUser) != null){
            UserDetails userDetails = loadUserByUsername(newUser.getUsername());
            return jwtUtil.generateToken(userDetails);
        }
        throw new Exception();
    }

    @Override
    public User addUserGoal(User userGoal) {
        String username = securityController.getCurrentUserName();
        User user = userRepository.findByUsername(username);
        user.setGoal(userGoal.getGoal());
        return userRepository.save(user);
    }

    @Override
    public User getUserGoal() {
        String username = securityController.getCurrentUserName();
        return userRepository.findByUsername(username);

    }

}