package com.reflection.increadible.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.persistence.GeneratedValue;

@Entity
@Table(name= "users")
public class User {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String goal;

    public User() {}

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public String getGoal() {return goal;}

    public void setGoal(String goal) {this.goal = goal;}




}