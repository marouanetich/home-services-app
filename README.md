<p align="center">
  <img src="./screenshots/home-services-app-logo.png" alt="Logo" width="120" height="88">
</p>

<h3 align="center">Home Services App</h3>

<p align="center">
  A web application connecting customers with professional home service providers.
  <br />
  <a href="https://github.com/marouanetich/home-services-app"><strong>Explore the documentation »</strong></a>
  <br />
  <br />
  <a href="https://github.com/marouanetich/home-services-app/issues">Report Bug</a>
  ·
  <a href="https://github.com/marouanetich/home-services-app/issues">Request Feature</a>
</p>

---

## About The Project

The Home Services App facilitates the finding, booking, and reviewing of home service providers. It is built using React for the front-end, Laravel for the back-end, and MySQL as the database, ensuring a seamless and reliable user experience.

> **Note:** This application may contain bugs or incomplete features. We appreciate your understanding and welcome feedback to improve the application.

### Built With

* [React](https://reactjs.org/)
* [Laravel](https://laravel.com/)
* [MySQL](https://www.mysql.com/)

## Features

* User Authentication
* Service Listings and Filtering
* Booking Integration
* Customer and Provider Dashboards

## Screenshots

1.  **Homepage**
    * A clean homepage displaying available services.
    * ![Homepage](./screenshots/home-services-app-1.png)

2.  **Categories**
    * A categorized list of available home services.
    * ![Categories](./screenshots/home-services-app-2.png)

3.  **Service Booking**
    * A user-friendly interface to book a service.
    * ![Service Booking](./screenshots/home-services-app-3.png)

---

## Getting Started

### Docker Deployment

To run the application using Docker, follow these steps:

1.  **Create a Docker network (if not already created):**
    ```bash
    docker network create home_services_network
    ```

2.  **Run the MySQL container:**
    ```bash
    docker run -d --name mysql_container --network home_services_network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=laravel_db -e MYSQL_USER=user -e MYSQL_PASSWORD=password -v db_data:/var/lib/mysql -p 3306:3306 mysql:8.0
    ```

3.  **Run the Laravel back-end container:**
    ```bash
    docker run -d --name laravel_app --network home_services_network -e APP_KEY=base64:random_generated_key -e DB_HOST=mysql_container -e DB_DATABASE=laravel_db -e DB_USERNAME=user -e DB_PASSWORD=password -p 9000:80 marouanetich/laravel_backend:latest php artisan serve --host=0.0.0.0 --port=80
    ```

4.  **Run the React front-end container:**
    ```bash
    docker run -d --name react_app --network home_services_network -p 5173:5173 marouanetich/react_frontend:latest
    ```

5.  **Run Migrations and Seed the Database:**
    ```bash
    docker exec -it laravel_app php artisan migrate
    docker exec -it laravel_app php artisan db:seed
    ```

6.  **Access the Application:**
    * React front-end: `http://localhost:5173`
    * Laravel back-end: `http://localhost:9000`

### Local Deployment

Follow these instructions to set up the project locally.

#### Prerequisites

* **PHP** (v8.0+ recommended) - [Download PHP](https://www.php.net/downloads.php)
* **Composer** - [Install Composer](https://getcomposer.org/download/)
* **Node.js** and **npm** - [Install Node.js and npm](https://nodejs.org/en/download/)
* **MySQL** - [Download MySQL](https://dev.mysql.com/downloads/)

#### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/marouanetich/home-services-app.git](https://github.com/marouanetich/home-services-app.git)
    cd home-services-app
    ```

2.  **Navigate to the Back-End Directory:**
    ```bash
    cd back-end
    ```

3.  **Install Composer Dependencies:**
    ```bash
    composer install
    ```

4.  **Set Up Environment Variables:**
    ```bash
    cp .env.example .env
    ```

5.  **Run Database Migrations:**
    ```bash
    php artisan migrate
    ```

6.  **Seed the Database:**
    ```bash
    php artisan db:seed
    ```

7.  **Start the Laravel Development Server:**
    ```bash
    php artisan serve
    ```

8.  **Navigate to the Front-End Directory:**
    ```bash
    cd ../front-end
    ```

9.  **Install NPM Dependencies:**
    ```bash
    npm install
    ```

10. **Start the React Development Server:**
    ```bash
    npm start
    ```