# Trello Task Management Clone

A Trello-inspired task management application that allows users to create, update, and manage tasks across different stages of a project. This project features authentication, authorization, and fully functional drag-and-drop functionality with different sections, .

## Features

- **Authentication & Authorization**: Secure user registration, login, and logout functionality.
- **Task Management**: Create, update, and retrieve tasks, categorized into stages: To Do, In Progress, Under Review, and Finished.
- **Drag & Drop**: Reorder tasks across different stages with real-time updates to the backend.
- **Protected Routes**: Ensures that only authenticated users can access certain parts of the application.
- **Form Handling**: Forms are managed with React Hook Form and validated with Zod.
- **API Documentation**: Swagger documentation is available for all backend APIs.

## Technologies Used

### Frontend
- **Next.js**: Framework for building React applications with server-side rendering.
- **TypeScript**: Strongly-typed language that builds on JavaScript.
- **shadcn UI**: Component library for building accessible React applications.
- **React Beautiful DnD**: Library for adding drag-and-drop functionality.
- **Redux Toolkit**: State management library for managing application state.

### Backend
- **Express.js**: Web framework for building the backend APIs.
- **Express Validator**: Middleware for validating request data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Swagger**: Tool for generating interactive API documentation.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/danish498/trello-task-managment-clone
    cd trello-task-management-clone
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    # Install frontend dependencies
    cd frontend
    yarn install
    
    # Install backend dependencies
    cd ../backend
    yarn install
    ```

3. Set up environment variables:
    - Create a `.env` file in both `frontend` and `backend` directories with the necessary environment variables (e.g., API keys, database connection strings).

4. Start the development server:
    ```bash
    # Start frontend
    cd client
    yarn run dev
    
    # Start backend
    cd ../backend
    yarn dev
    ```

### API Documentation

Swagger documentation for the backend APIs is available at `[https://trello-task-managment-clone.onrender.com/docs/](https://trello-task-managment-clone.onrender.com/docs/)`.

### Video Demonstration

Watch a video demonstration of the project .

https://github.com/user-attachments/assets/ebfae1e8-7fea-4fa8-808e-97c98b7e96f8



## Project Structure

- **client/**: Contains the Next.js application and all frontend code.
- **server/**: Contains the Express.js application and all backend code.

## Contributions

Contributions are welcome! Please create an issue or submit a pull request for any bugs or feature requests.

## License

