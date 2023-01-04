<div align="center">
  <a href="#">
    <img src="https://github.com/nathan2slime/callisto/blob/master/app/android/app/src/main/res/drawable/icon.png?raw=true" alt="Cars" width="120" height="120">
  </a>

  <h3 align="center">Cars</h3>

  <p align="center">
    System to search used cars with admin
  </p>
</div>

### Required technologies

```
1. Node.js 16
2. MySQL Community Server
3. Git
4. Android Studio SDK
5. Yarn
```

### Setup

Download the repository using the following command in your terminal

```
git clone git@github.com:nathan2slime/callisto.git
```

Enter the directory and install the dependencies with yarn

```
cd callisto
```

```
yarn install
```

Then run the yarn build command to build the libraries

```
yarn build
```

Create a `local.properties` file in the path `callisto/app/android` and add the Android Sdk path in the file as in the example below

```
sdk.dir=C:\\Users\\username\\AppData\\Local\\Android\\Sdk
```

Create an `.env` file in the path `callisto/api`, and add the environment variables

```
DB_CLIENT=mysql2
DB_PASSWORD=Enter the password of the database here
DB_NAME=Enter the name of the database here
DB_USER=Put your MySQL Server username here
DB_HOST=Put your MySQL Server connection host here

PORT=Put here the port that the server will listen on
NODE_ENV=development
TOKEN_HASH=Put a hash here for token generation
TOKEN_KEY=Bearer
PASSWORD_HASH_SALT=10

## Default admin credentials
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=1234
```

Create a `.env` file in the `callisto/app` file, and add the environment variable as the server url, as in the example below

```
API_BASE_URL=http://192.168.1.3:8080/api/
```

### Starting the server

Enter the `callisto/api` directory and run the command below to create the tables and the default admin user

```
yarn migrate
```

Enter the `callisto/api` directory and run the command below

```
yarn dev
```

### Starting app

Enter the `callisto/app` directory. Make sure you have an android emulator or device connected before running the command below

```
yarn android
```

### Observation

- To register vehicles you need to login with admin user
- If you are in an admin account, and you want to manage a car, just click on the car card

### Screenshots
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/12391032.png)
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/1392103.png)
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/2391032.png)
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/3129310.png)
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/930123.png)
![](https://github.com/nathan2slime/callisto/blob/master/.github/assets/93012391.png)
