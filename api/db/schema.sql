create table "user" (
	"id" 			uuid 			not null,
	"phone" 		varchar(13),
	"first_name" 	varchar(255),
	"last_name" 	varchar(255),
	"dob" 			date,
	"gender" 		varchar(20),
	"email" 		varchar(255),
	primary key		(id),
	unique			(phone, email)
);