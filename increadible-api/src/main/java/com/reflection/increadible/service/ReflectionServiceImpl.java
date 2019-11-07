package com.reflection.increadible.service;

import com.reflection.increadible.controller.SecurityController;
import com.reflection.increadible.model.Reflection;
import com.reflection.increadible.model.User;
import com.reflection.increadible.repository.ReflectionRepository;
import com.reflection.increadible.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReflectionServiceImpl implements ReflectionService {

    @Autowired
    ReflectionRepository reflectionRepository;

    @Autowired
    ReflectionService reflectionService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SecurityController securityController;

    @Override
    public Reflection createReflection(Reflection newReflection) {
        String username = securityController.getCurrentUserName();
        User user = userRepository.findUserByUsername(username);
        newReflection.setUser(user);
        return reflectionRepository.save(newReflection);
    }

    @Override
    public Iterable<Reflection> listAllReflections() {
        return reflectionRepository.findAll();
    }

    @Override
    public ResponseEntity deleteSpecificReflection(long reflection_id) {

        String currentUsername = securityController.getCurrentUserName();

        if(reflectionRepository.findReflectionById(reflection_id).getUser().getUsername().equals(currentUsername)){
            reflectionRepository.deleteById(reflection_id);
            return new ResponseEntity(HttpStatus.valueOf(200));
        }else{
            return new ResponseEntity(HttpStatus.valueOf(405));
        }
    }

    @Override
    public Reflection getSpecificReflection(long reflection_id) {
        return reflectionRepository.findById(reflection_id).get();
    }

    @Override
    public List<Reflection> listUserReflections() {
        String username = securityController.getCurrentUserName();
        User user = userRepository.findUserByUsername(username);
        return reflectionRepository.findReflectionsByUser(user); }

    @Override
    public ResponseEntity updateReflection(Reflection updatedReflection, long reflection_id) throws Exception {

        String currentUsername = securityController.getCurrentUserName();

        if (reflectionRepository.findReflectionById(reflection_id).getUser().getUsername().equals(currentUsername)) {
            Reflection reflection = reflectionRepository.findById(reflection_id).get();
            reflection.setSubject(updatedReflection.getSubject());
            reflection.setTidbit(updatedReflection.getTidbit());
            
            final Reflection updatedReflectionVersion = reflectionRepository.save(reflection);

            return new ResponseEntity(updatedReflectionVersion, HttpStatus.valueOf(200));
        }
        throw new Exception();
    }
}