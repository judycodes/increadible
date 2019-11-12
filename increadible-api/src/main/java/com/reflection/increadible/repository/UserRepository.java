package com.reflection.increadible.repository;

import com.reflection.increadible.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    public User findUserByUsername(String username);
    public User findByUsername(String username);

}
