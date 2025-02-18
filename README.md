# Task Management System

This is a Task Management System built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to create, view, update, and delete tasks, providing an intuitive interface for managing tasks efficiently.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter and search tasks
- Responsive design for mobile and desktop

## Technologies Used

- Frontend:
  - React
  - Axios (for making HTTP requests)

- Backend:
  - Node.js
  - Express
  - MongoDB (with Mongoose for object modeling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/w3VillaAssignment.git
   cd w3VillaAssignment
   npm install  # This installs dependencies for both server and frontend
   npm run start

2. Runnning Server
  ```bash
     cd server
     npm run dev 


Open your browser and navigate to http://localhost:3000 to access the application.


Usage:
Create an account or log in to an existing account.
Once logged in, you can add new tasks using the provided form.
Click on a task to view its details, or to edit and delete it.
Use the search bar to find specific task


# API Endpoints

Here are some of the key API endpoints used in the application:

## User Authentication:
- SIGNUP_API: BASE_URL + "/auth/signup",
- LOGIN_API: BASE_URL + "/auth/login",

## Task Management: 
- FETCH_TASK_LIST: BASE_URL+"/taskLists",
- ADD_TASK_LIST: BASE_URL+"/addTaskList/id",
- DELETE_LIST: BASE_URL+"/deleteList/id",
- GET_ALL_LISTS:BASE_URL+"/all-tasks",

- ADD_TASK: BASE_URL+'/add-task',
- DELETE_TASK: BASE_URL+'/task/delete/id',
- UPDATE_TASK: 'ASE_URL+'/task/update/id',
- GET_ASSIGNED_'ASKS:BASE_URL+'/tasks/a'signedTasks`''


