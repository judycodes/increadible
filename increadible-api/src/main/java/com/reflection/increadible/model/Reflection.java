package com.reflection.increadible.model;

import javax.persistence.*;

@Entity
@Table(name = "reflections")
public class Reflection {

    @Id
    @Column(name = "reflection_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String tidbit;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Reflection() {}

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getSubject() {return subject;}

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTidbit() {
        return tidbit;
    }

    public void setTidbit(String tidbit) {
        this.tidbit = tidbit;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}