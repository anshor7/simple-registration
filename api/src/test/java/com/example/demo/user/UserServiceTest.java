package com.example.demo.user;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.UUID;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.exceptions.base.MockitoException;
import org.mockito.junit.MockitoJUnitRunner;

import com.example.model.User;
import com.example.user.UserRepository;
import com.example.user.UserService;
import com.example.user.UserServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

	@InjectMocks
	private UserService userService = new UserServiceImpl();
	
	@Mock
	private UserRepository userRepository; // mocked repository

	@Before
	public void setUp() {
	    MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void saveSuccess() throws Exception {
		ObjectMapper mapper = new ObjectMapper();

		String json = "{\n" + 
				"	\"phone\":\"test2\",\n" + 
				"	\"first_name\":\"test2\",\n" + 
				"	\"last_name\":\"test2\",\n" + 
				"	\"dob\":\"12-01-1993\",\n" + 
				"	\"gender\":\"male\",\n" + 
				"	\"email\":\"test2@gmail.com\"\n" + 
				"}";
		
		User newUser = new User();
		try {
			newUser = mapper.readValue(json, newUser.getClass());
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		newUser.setId(UUID.randomUUID());
        Mockito.lenient().when(userService.save(newUser)).thenReturn(newUser);
		
		Assert.assertNotEquals(newUser.getId(),new UUID(0L, 0L));
	}
	
	@Test(expected = MockitoException.class)
	public void saveFailed() throws Exception{
		ObjectMapper mapper = new ObjectMapper();

		String json = "{\n" + 
				"	\"phone\":\"test2\",\n" + 
				"	\"first_name\":\"test2\",\n" + 
				"	\"last_name\":\"test2\",\n" + 
				"	\"dob\":\"12-01-1993\",\n" + 
				"	\"gender\":\"male\",\n" + 
				"	\"email\":\"test2@gmail.com\"\n" + 
				"}";
		
		User newUser = new User();
		try {
			newUser = mapper.readValue(json, newUser.getClass());
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Mockito.doThrow(new SQLIntegrityConstraintViolationException()).when(userRepository).save(newUser);
        
		userService.save(newUser);
	}
}
