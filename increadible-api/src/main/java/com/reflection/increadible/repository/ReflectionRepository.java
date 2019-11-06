package com.reflection.increadible.repository;

import com.reflection.increadible.model.Reflection;
import com.reflection.increadible.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReflectionRepository extends CrudRepository<Reflection, Long> {

    void deleteById(Long reflection_id);

    //find specific reflection
    @Query(" {'id' : ?0} ")
    public Reflection findReflectionById (Long reflection_id);

    //find user's reflections by user object
    public List<Reflection> findReflectionsByUser(User user);

}