# User-Task Manager - React Application

This React app helps users stay organized by managing their to-do lists.
The application includes role-based access for **Moderators** and **Admins**.

## Features

**User Authentication**: Users can register and log in to access their own personalized dashboards.

**Role-Based Dashboards**:

- Different UI and functionality depending on whether you are an Admin or a Moderator.

**User List with Filtering & Sorting**:

- Admins can view all registered users.
- Built-in filtering and sorting options help manage users efficiently.

**To-Do List Management**:

- **Moderators** can:
  - View and manage their personal to-do lists.
  - Track progress and mark complete/delete tasks as needed.
- **Admins** can:

  - View and manage lists of all users
  - View and manage to-do lists of all users.

## API

The application utilizes a dummy API provided by [DummyJSON](https://dummyjson.com/) to simulate backend functionality for users, authentication, and todo data.

## Installation

1. Clone the repository:

   git clone https://github.com/charneetk/react-assignment-user-management.git
   cd react-assignment-user-management

2. Install the dependencies
   npm install

3. Start the Application:
   npm start
