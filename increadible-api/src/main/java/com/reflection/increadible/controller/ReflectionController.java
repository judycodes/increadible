package com.reflection.increadible.controller;

import com.reflection.increadible.model.Reflection;
import com.reflection.increadible.repository.UserRepository;
import com.reflection.increadible.service.ReflectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/reflection")
public class ReflectionController {

    @Autowired
    ReflectionService reflectionService;

    @Autowired
    UserRepository userRepository;

    /**
     * POST REQUEST: Creates reflection for user
     * @param newReflection
     * @return new reflection linked to user added to database
     */
    @PostMapping("/create")
    public Reflection createReflection(@RequestBody Reflection newReflection) {
        return reflectionService.createReflection(newReflection);
    }

    /**
     * GET REQUEST: List all reflections
     * @return all database reflections
     */
    @GetMapping("/listAllReflections")
    public Iterable<Reflection> listAllReflections() {
        return reflectionService.listAllReflections();
    }

    /**
     * DELETE REQUEST: Deletes reflection if reflection was created by logged in user
     * @param reflection_id
     * @return Status code if method worked
     */
    @DeleteMapping("/delete-{reflection_id}")
    public ResponseEntity deleteSpecificReflection(@PathVariable long reflection_id) {
        try {
            return reflectionService.deleteSpecificReflection(reflection_id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.valueOf(405), "This reflection does not exist.", e);
        }
    }

    /**
     * GET REQUEST: List specified reflection
     * @param reflection_id
     * @return specified reflection
     */
    @GetMapping("/get-{reflection_id}")
    public Reflection getSpecificReflection(@PathVariable long reflection_id) {
        try {
            return reflectionService.getSpecificReflection(reflection_id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.valueOf(405), "This reflection does not exist.", e);
        }
    }

    /**
     * GET REQUEST: List all user linked reflections
     * @return reflections in database created by current user
     */
    @GetMapping("/listUserReflections")
    public List<Reflection> listUserReflections() { return reflectionService.listUserReflections();}

    /**
     * PATCH REQUEST: Update reflection content
     * @param updatedReflection
     * @return updated reflection if user created that reflection
     */
//    @PatchMapping("/update-{reflection_id}")
    @PutMapping("/update-{reflection_id}")
    public ResponseEntity updateReflection(@RequestBody Reflection updatedReflection, @PathVariable long reflection_id) {
        try {
            return reflectionService.updateReflection(updatedReflection, reflection_id);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.valueOf(405), "Error when updating reflection.", e);
        }
    }

}
