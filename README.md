<p align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://user-images.githubusercontent.com/39415174/83923322-5f890f80-a758-11ea-88fa-9df8c50630b9.png" width="160px" />
</p>

# Ecoleta Project
![capa](https://user-images.githubusercontent.com/39415174/83946739-0fa65900-a7e9-11ea-9433-219ec85b1ed1.jpg)
The project has been built within the first  [NextLevelWeek](https://nextlevelweek.com/) from [Rocketseat](https://rocketseat.com.br) to apply the concepts `typescript`, `Node.js`, `ReactJS` e `React Native`.

The whole application was developed using backend, frontend and mobile for fill the logistic demand of disposed waste. The week was to celebrate the international day of Environmental issues. Because of this the Next Level Week 1.0 decided to pay a tribute for that.
  
  [Starting](#começando)&nbsp;&nbsp;|&nbsp;&nbsp;
  [Installation](#instalação)&nbsp;&nbsp;|&nbsp;&nbsp;
  [Execution](#execução)&nbsp;&nbsp;|&nbsp;&nbsp;
  [Technologies](#tecnologias)&nbsp;&nbsp;|&nbsp;&nbsp;
  [License](#licença)  

## Starting
The following instructions are to provide a copy of this project and will execute em your local machine for developments and tests means.

### Prerequisites

* You must have the Node.js Installed in your machine. 
* For the application Mobile, you must have the `expo` package in your machine.

## Installation

To clone this repository in your machine and accessing the folder of the project:

```bash
git clone https://github.com/alicioromoli/NLW-01.git
cd NLW-01
```

### Backend
Installing the dependencies of the backend application:

```bash
cd server
npm install
```

### Frontend

Installing the dependencies of the frontend application:

```bash
cd ../web
npm install
```

### Mobile

Installing the dependencies of the mobile application:

```bash
cd ../mobile
npm install
```

## Execution
Every application could be initialized very easy following these steps below:

### Backend
The first part must be executed is the `node.js`server. 

Make sure you are in the `server` folder of the project and had been installed all the environment variables. After that execute the following command below:

```bash
npm run dev
```

### Frontend
This is the `ReactJS` website where the collection points are registered. The backend must be already operational.

Make sure that you are in the web folder of the project and had been installed all the environment variables. After that execute the following command below:

```bash
npm start
```
### Mobile
In this part, you going to initialize the mobile application did with `React Native` where the collection points could be consulted per city. This part works despite from frontend however, the backend has already been in fully operational. 

Make sure that you are in the `mobile`  folder of the project and had been installed all the environment variables. After that execute the following command below:

```bash
npm start
```
After the mobile project initialized it will show the `QRCode` in the terminal and a new tab in your browser showing the `Metro Bundler`. That moment you will need to install em your smartphone an app called `Expo`.
Available on:

- [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent) Google Play
- [Expo Client](https://apps.apple.com/br/app/expo-client/id982107779) Apple Store

Open the app in your smartphone and scan the QRcode that is located on the bottom left of the webpage.


## Technologies

* [Node.js](https://nodejs.org/) - Used for backend(webservice Rest) of the project
* [express](https://expressjs.com/) - Backend framework
* [knex.js](http://knexjs.org/) - Javascript query builder for relational database
* [sqlite3](https://www.sqlite.org/) - Backend database for the data
* [React](https://reactjs.org/) - For frontend
* [React Native](https://reactnative.dev/) - For Mobile application
* [expo](https://expo.io/) - For ease development with `React Native`
* [typescript](https://www.typescriptlang.org/) - For better code integrity and team development

Check for the whole technology list out that contains in the `package.json`, and in the root in every part of this project.


## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


Created by Alicio Romoli.
