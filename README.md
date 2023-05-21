<div align="center">
  <a href="https://github.com/sweeeeetch/blog">
    <img src="client/public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">blog</h3>

  <p align="center">
    Test task for vacancy of Nodejs developer
    <br />
    <a href="https://github.com/sweeeeetch/blog"><strong>Explore the README »</strong></a>
    <br />
    <br />
    <a href="https://test-task-blog.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/sweeeeetch/blog/issues">Report Bug</a>
    ·
    <a href="https://github.com/sweeeeetch/blog/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#endpoints">Endpoints</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

This project is test task for checking my skills in order to consider me on position of Nodejs developer.

In spite of accomplishing blog api, i also added simple UI. I think this is pretty good work in all aspects. Project is properly structured, code is readable.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Front-end:

- ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) as SCSS
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

#### Back-end:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
- ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Endpoints

This part provides an overview of the backend endpoints available in the application. Below is a description of each endpoint along with the required parameters and expected responses.

<details>
  <summary>English version</summary>
  ### User Endpoints

#### Register a User

- **Endpoint:** `/user/register`
- **Method:** POST
- **Request Body:**
  - `email` (string): User's email address 
  - `password` (string): User's password 
  - `username` (string): User's username 
- **Description:** Registers a new user with the provided email, password, and username. Performs validation on the input fields. If successful, returns user data and sets a refresh token cookie.
- **Responses:**
  - 200 OK: Returns user data.
  - 400 Bad Request: Validation error or invalid input.
  - 500 Internal Server Error: An error occurred during the registration process.

#### User Login

- **Endpoint:** `/user/login`
- **Method:** POST
- **Request Body:**
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Description:** Logs in a user with the provided email and password. If successful, returns user data and sets a refresh token cookie.
- **Responses:**
  - 200 OK: Returns user data.
  - 401 Unauthorized: Invalid credentials.
  - 500 Internal Server Error: An error occurred during the login process.

#### User Logout

- **Endpoint:** `/user/logout`
- **Method:** POST
- **Description:** Logs out the currently authenticated user. Clears the refresh token cookie.
- **Responses:**
  - 200 OK: Logout successful.
  - 500 Internal Server Error: An error occurred during the logout process.

#### Refresh User Token

- **Endpoint:** `/user/refresh`
- **Method:** GET
- **Description:** Refreshes the access token for the currently authenticated user using the refresh token cookie. If successful, returns refreshed user data and updates the refresh token cookie.
- **Responses:**
  - 200 OK: Returns refreshed user data.
  - 401 Unauthorized: Invalid or expired refresh token.
  - 500 Internal Server Error: An error occurred during the token refresh process.

### Post Endpoints

#### Get User's Posts

- **Endpoint:** `/posts/myposts`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional, number): Page number for pagination (default: 1).
  - `pageSize` (optional, number): Number of posts per page (default: 20).
- **Description:** Retrieves the posts created by the currently authenticated user. Requires authentication. Returns the total number of pages and the user's posts.
- **Responses:**
  - 200 OK: Returns the total number of pages and the user's posts.
  - 401 Unauthorized: User is not authenticated.
  - 500 Internal Server Error: An error occurred while retrieving the user's posts.

#### Create a Post

- **Endpoint:** `/posts/create`
- **Method:** POST
- **Request Body:**
  - `title` (string): Post title.
  - `text` (string): Post content.
  - `author` (string): Author name.
  - `userId` (string): User ID of the post creator.
  - `image` (file, optional): Post image file (limited to 5MB).
- **Description:** Creates a new post with the provided title, content, author, and user ID. Optionally, an image can be also be uploaded.
</details>
<details>
  <summary>Русская версия</summary>
</details>
<p align="right">(<a href="#readme-top">back to top</a>)</p>
