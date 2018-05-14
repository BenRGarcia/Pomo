# POMO

> A classroom tool for teachers

## Project Description

Teachers are authenticated users who can create classes with students, assign tasks with time limits.

Students can login to a personalized dashboard to view assigned tasks and indicate when tasks have been started and completed. Students are awarded coins for completing tasks.

## Tools

* Node, Express, Handlebars, MySQL stack -- Deployed to Heroku
* Authentication with Passport, local strategy
* Session management with express-session, Redis
* Password salt/hash with bcryptjs
* Additional attack vector reduction with helmet, csurf, express-limiter
* CSS precompiled with node-sass-middleware
* Code style enforced with ESLint

## Screenshots

### Teacher Login

![login](https://user-images.githubusercontent.com/26657982/40014873-bb4e6714-577f-11e8-94eb-dc0387c52227.png)

### Teacher Dashboard

![dashboard](https://user-images.githubusercontent.com/26657982/40015165-73510178-5780-11e8-89fa-dbeff86a70d9.png)

### Student Login

![student-login](https://user-images.githubusercontent.com/26657982/40014877-bb678ee2-577f-11e8-90f2-bad4cc674832.png)

### Student Dashboard

![student-dashboard](https://user-images.githubusercontent.com/26657982/40014875-bb5ac112-577f-11e8-8577-64357c0da663.png)

### Class Store

![class-store](https://user-images.githubusercontent.com/26657982/40014872-bb3d0cc6-577f-11e8-80d7-1d0385d14cb1.png)