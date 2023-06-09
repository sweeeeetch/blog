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

### Server endpoints

#### Health endpoint

- **Endpoint:** `/healthz`
- **Method:** GET
- **Description:** This endpoint always returns 200 OK status. This endpoint is made for checking whether server is alive or not.
- **Responses:**
  - 200 OK: Returns 200 OK.

#### Static files endpoint

- **Endpoint:** `/static/`
- **Method:** GET
- **Query Parameters:**
  - `file` (string): Name of file to be returned.
- **Description:** This endpoint returns static files like express, but in my case i couldnt find out why express cant serve static files on server.
- **Responses:**
  - 200 OK: Returns file.
  - 404 Not Found: Returns 404 code.

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
- **Responses:**
  - 200 OK: Returns the created post data.
  - 401 Unauthorized: User is not authenticated.
  - 500 Internal Server Error: An error occurred while retrieving the user's posts.

#### Edit Post

- **Endpoint:** `/posts/edit`
- **Method:** PUT
- **Query parameters:**
  - `id` (string): Id of post to be editted
- **Request Body:**
  - `title` (string, optional): Editted title.
  - `text` (string, optional): Editted post content.
- **Description:** Edits existing post, changing one or both parts of post.
- **Responses:**
  - 200 OK: Returns the 200 status code.
  - 401 Unauthorized: User is not authenticated or is not author of post.
  - 500 Internal Server Error: An error occurred while retrieving the user's posts.

#### Delete Post

- **Endpoint:** `/posts/delete`
- **Method:** DELETE
- **Query parameters:**
  - `id` (string): Id of post to be deleted
- **Description:** Deletes post from database by id. Also checks whether user is author of post or not by jwt token.
- **Responses:**
  - 200 OK: Returns the 200 status code.
  - 401 Unauthorized: User is not authenticated or is not author of post.
  - 500 Internal Server Error: An error occurred while deleting post.

#### Get all Posts

- **Endpoint:** `/posts/get`
- **Method:** GET
- **Query Parameters:**
  - `page` (optional, number): Page number for pagination (default: 1).
  - `pageSize` (optional, number): Number of posts per page (default: 20).
- **Description:** Retrieves all posts created by all users.
- **Responses:**
  - 200 OK: Returns the total number of pages and posts.
  - 500 Internal Server Error: An error occurred while retrieving the posts.

#### Get one Post

- **Endpoint:** `/posts/get`
- **Method:** GET
- **Query Parameters:**
  - `id` (string): Post id to be returned.
- **Description:** Returns one post by id.
- **Responses:**
  - 200 OK: Returns the post data.
  - 500 Internal Server Error: An error occurred while retrieving the posts.

</details>
<details>
  <summary>Русская версия</summary>

  
### Эндпоинты сервера

#### Проверка на работоспособность

- **Эндпоинт:** `/healthz`
- **Метод:** GET
- **Описание:** Этот эндпоинт всегда возвращает 200 OK. Он создан для проверки активен ли сервер.
- **Ответ:**
  - 200 OK: Возвращает 200 OK.

#### Эндпоинт со статическими файлами

- **Эндпоинт:** `/static/`
- **Метод:** GET
- **Параметры запроса:**
  - `file` (строка): Имя запрашиваемого файла.
- **Описание:** Этот эндпоинт возвращает статические файлы, как express.static, но в моем случае это не работает на сервере по непонятной причине.
- **Ответы:**
  - 200 OK: Возвращает файл.
  - 404 Not Found: Возвращает 404 статус-код.
  
### Эндпоинты пользователей

#### Регистрация пользователя

- **Эндпоинт:** `/user/register`
- **Метод:** POST
- **Тело запроса:**
  - `email` (строка): Email пользователя.
  - `password` (строка): Пароль пользователя.
  - `username` (строка): Имя пользователя.
- **Описание:** Регистрирует нового пользователя с указанным email, паролем и именем пользователя. Выполняет проверку введенных полей. В случае успешной регистрации возвращает данные пользователя и устанавливает cookie с refresh токеном.
- **Ответы:**
  - 200 OK: Возвращает данные пользователя.
  - 400 Неверный запрос: Ошибка валидации или неверные входные данные.
  - 500 Внутренняя ошибка сервера: Возникла ошибка в процессе регистрации.

#### Авторизация пользователя

- **Эндпоинт:** `/user/login`
- **Метод:** POST
- **Тело запроса:**
  - `email` (строка): Email пользователя.
  - `password` (строка): Пароль пользователя.
- **Описание:** Авторизует пользователя с указанным email и паролем. В случае успешной авторизации возвращает данные пользователя и устанавливает cookie с refresh токеном.
- **Ответы:**
  - 200 OK: Возвращает данные пользователя.
  - 401 Неавторизован: Неверные учетные данные.
  - 500 Внутренняя ошибка сервера: Возникла ошибка в процессе авторизации.

#### Выход пользователя

- **Эндпоинт:** `/user/logout`
- **Метод:** POST
- **Описание:** Выход текущего авторизованного пользователя. Очищает cookie с refresh токеном.
- **Ответы:**
  - 200 OK: Успешный выход пользователя.
  - 500 Внутренняя ошибка сервера: Возникла ошибка в процессе выхода.

#### Обновление токена пользователя

- **Эндпоинт:** `/user/refresh`
- **Метод:** GET
- **Описание:** Обновляет токен доступа для текущего авторизованного пользователя, используя cookie с токеном обновления. В случае успешного обновления возвращает обновленные данные пользователя и обновляет cookie с refresh токеном.
- **Ответы:**
  - 200 OK: Возвращает обновленные данные пользователя.
  - 401 Неавторизован: Неверный или просроченный токен обновления.
  - 500 Внутренняя ошибка сервера: Возникла ошибка в процессе обновления токена.

### Конечные точки постов

#### Получение постов пользователя

- **Эндпоинт:** `/posts/myposts`
- **Метод:** GET
- **Параметры запроса:**
  - `page` (необязательно, число): Номер страницы для пагинации (по умолчанию: 1).
  - `pageSize` (необязательно, число): Количество постов на странице (по умолчанию: 20).
- **Описание:** Получает посты, созданные текущим авторизованным пользователем. Требуется авторизация. Возвращает общее количество страниц и посты пользователя.
- **Ответы:**
  - 200 OK: Возвращает общее количество страниц и посты пользователя.
  - 401 Неавторизован: Пользователь не авторизован.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при получении постов пользователя.

#### Создание поста

- **Эндпоинт:** `/posts/create`
- **Метод:** POST
- **Тело запроса:**
  - `title` (строка): Заголовок поста.
  - `text` (строка): Содержимое поста.
  - `author` (строка): Имя автора.
  - `userId` (строка): Идентификатор пользователя, создающего пост.
  - `image` (файл, необязательно): Файл изображения для поста (ограничение 5 МБ).
- **Описание:** Создает новый пост с указанным заголовком, содержимым, автором и идентификатором пользователя. По желанию можно загрузить изображение для поста. Требуется авторизация. Возвращает данные созданного поста.
- **Ответы:**
  - 200 OK: Возвращает данные созданного поста.
  - 401 Неавторизован: Пользователь не авторизован.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при создании поста.

#### Редактирование поста

- **Эндпоинт:** `/posts/edit`
- **Метод:** PUT
- **Параметры запроса:**
  - `id` (строка): Идентификатор редактируемого поста.
- **Тело запроса:**
  - `title` (строка, необязательно): Измененный заголовок.
  - `text` (строка, необязательно): Измененное содержимое поста.
- **Описание:** Редактирует существующий пост, изменяя заголовок или содержимое, или оба значения.
- **Ответы:**
  - 200 OK: Возвращает код состояния 200.
  - 401 Неавторизован: Пользователь не аутентифицирован или не является автором поста.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при получении постов пользователя.

#### Удаление поста

- **Эндпоинт:** `/posts/delete`
- **Метод:** DELETE
- **Параметры запроса:**
  - `id` (строка): Идентификатор удаляемого поста.
- **Описание:** Удаляет пост из базы данных по его идентификатору. Также проверяет, является ли пользователь автором поста по токену JWT.
- **Ответы:**
  - 200 OK: Возвращает код состояния 200.
  - 401 Неавторизован: Пользователь не аутентифицирован или не является автором поста.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при удалении поста.

#### Получение всех постов

- **Эндпоинт:** `/posts/get`
- **Метод:** GET
- **Параметры запроса:**
  - `page` (необязательно, число): Номер страницы для пагинации (по умолчанию: 1).
  - `pageSize` (необязательно, число): Количество постов на странице (по умолчанию: 20).
- **Описание:** Возвращает все посты, созданные всеми пользователями.
- **Ответы:**
  - 200 OK: Возвращает общее количество страниц и посты.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при получении постов.

#### Получение одного поста

- **Эндпоинт:** `/posts/get`
- **Метод:** GET
- **Параметры запроса:**
  - `id` (строка): Идентификатор поста для получения.
- **Описание:** Возвращает один пост по его идентификатору.
- **Ответы:**
  - 200 OK: Возвращает данные поста.
  - 500 Внутренняя ошибка сервера: Возникла ошибка при получении постов.
  </details>
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
