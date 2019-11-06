package com.reflection.increadible;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class IncreadibleApplication {

	public static void main(String[] args) {
		SpringApplication.run(IncreadibleApplication.class, args);
	}

	@RequestMapping("/")
	public String testConnecton() {
		return "incREADible api connected!";
	}


}
