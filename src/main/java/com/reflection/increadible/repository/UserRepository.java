package com.reflection.increadible.repository;

import com.reflection.increadible.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
//    @Query("FROM User u WHERE u.username = ?1 AND u.password = ?2")
//    public User login(String username, String password);

    public User findUserByUsername(String username);
    public User findByUsername(String username);

}
