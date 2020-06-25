package com.example.user;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.User;

@RestController
@RequestMapping(path = "user")
public class UserController {

	Logger log = Logger.getLogger(UserController.class.getName());
	
	@Autowired
	UserService userService;

	@GetMapping(value = "/health")
	private String GetHealth() {
		return HttpStatus.OK.toString();
	}

	@PostMapping()
	private ResponseEntity<String> Register(@RequestBody User user) {
		log.info(user.toString());
		
		boolean valid = userService.checkUniqueField(user.getPhone(), user.getEmail());
		if (valid) {
			userService.save(user);
			return new ResponseEntity<>("User successfully saved", HttpStatus.OK);
		}
		return new ResponseEntity<>("Save user failed", HttpStatus.UNPROCESSABLE_ENTITY);
	}

	@GetMapping(value = "/check-unique-field")
	private boolean CheckUnique(@RequestParam(value = "phone", required = false) String phone,
			@RequestParam(value = "email", required = false) String email) {
		return userService.checkUniqueField(phone, email);
	}
}
