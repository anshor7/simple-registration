package com.example.user;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.User;

@Service
@Transactional
public class UserService {

	@Autowired
	UserRepository userRepository;

	public void save(User user) {
		userRepository.save(user);
	}
	
	public boolean checkUniqueField(String phone, String email) {
		int result = userRepository.checkUniqueField(phone != null ? phone.toUpperCase() : null,
				email != null ? email.toUpperCase() : null);
		return result > 0 ? false : true;
	}

}
