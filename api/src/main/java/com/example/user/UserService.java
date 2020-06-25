package com.example.user;

import com.example.model.User;

public interface UserService {
	public User save(User user) throws Exception;
	public boolean checkUniqueField(String phone, String email);
}
