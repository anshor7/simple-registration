# Simple Registration
A Simple registration. It consists of Java restful [API](#installing-and-running-the-api) as backend and Reactjs as [UI](#installing-and-running-the-ui). 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Java (8 or above)
- Maven
- PostgreSQL
- Node.js (10 or above)
- Clone of this project

### Installing and Running the API
- go to folder /api
`cd api`
- create database named `app`
- execute the query at [db/schema.sql] to create the tables
- install depedencies
`mvn clean install`
- run it
`mvn spring-boot:run`

### Installing and Running the UI

- go to folder /ui
`cd ui`
- install depedencies
`npm install`
- create build directory (optional)
`npm run build`
- run it
`npm run start`

### Tools
- import postman collections at api/tools/