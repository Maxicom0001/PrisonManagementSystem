package com.prison.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}

// Dodaj kontroler, który będzie obsługiwał żądania HTTP
@RestController
class HelloController {

	@GetMapping("/")
	public String home() {
		return "Witaj w aplikacji Prison Management System!";
	}
}