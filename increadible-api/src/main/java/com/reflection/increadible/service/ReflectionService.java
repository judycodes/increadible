package com.reflection.increadible.service;

import com.reflection.increadible.model.Reflection;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReflectionService {

    public Reflection createReflection(Reflection newReflection);

    public Iterable<Reflection> listAllReflections();

    public ResponseEntity deleteSpecificReflection(long reflection_id) throws Exception;

    public Reflection getSpecificReflection(long reflection_id);

    public List<Reflection> listUserReflections();

    public ResponseEntity updateReflectionSubject(Reflection updatedReflectionSubject, long reflection_id) throws Exception;

    public ResponseEntity updateReflectionTidbit(Reflection updatedReflectionTidbit, long reflection_id) throws Exception;

    public ResponseEntity updateReflection(Reflection updatedReflection, long reflection_id) throws Exception;

}