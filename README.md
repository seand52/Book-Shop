# Beezy Front-End Technical Test

This bookshelf app was created with create-react-app. For stlying I have used the framework [Ant Design](https://ant.design) for styles and added custom styles using SCSS and BEM methodology. 

View the [Live Demo](https://beezy-bookshelf-seand.surge.sh) here!

# Getting Started

To run this program locally follow these instructions

## Clone the repository

```bash
$ git clone https://github.com/seand52/beezy-frontend-test.git
```

## Install dependencies

```bash
$ npm install
```

## Run the development server
```bash
$ npm start
```

# Technical Description

This App is made fully on the client side. All data is stored in session storage and is lost upon refresh. I have simulated working with an online API by returning the different functions(e.g add book, delete book) as promises with a timeout of 200ms
