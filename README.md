# Trucking Order Dispatcher

<a href="https://ibb.co/9gLZpph"><img src="https://i.ibb.co/MS4Bggf/projectoverview.png" alt="projectoverview" border="0"></a>
## Project Description
This project is designed to manage and assign orders to drivers. The dispatcher has the ability to drag and drop unassigned orders to potential drivers or reassign current orders.

## Overall Functionality
- Dispatcher has the ability to assign and unassign an order to a driver
- Dispatcher is able to edit the cost and revenue of orders
- Dispatcher can download a JSON file of the backend data
- Total cost/revenue of drivers is displayed in real time even with rearranging of orders
- Please read ```FEATURES.md``` for a more detailed list of features

## Prerequisites
- Get the latest version of npm
* npm
  ```sh
  npm install npm@latest -g
  ```
* nodemon
  ```sh
  npm install -g nodemon # or using yarn: yarn global add nodemon
  ```
## Setup
1. Fork or clone this repo 
2. Navigate to the root directory
3. Open two terminal windows
4. On one terminal window, install and run the backend
```
cd kevin-ly-rose-rocket-challenge-fall-2021/back-end/
npm install
nodemon index.js
``` 
5. On the other terminal window, install and run the frontend
```
cd kevin-ly-rose-rocket-challenge-fall-2021/front-end/
npm install
npm start
``` 
6. Now the services are up and running, the backend runs on localhost:5000 and the frontend on localhost:3000

## Project Stack
- React
- Node
- JS
- HTML
- JavaScript
- CSS

## Project Dependencies 
    "@craco/craco": "^6.3.0",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.23.0",
    "react": "^17.0.2",
    "react-beautiful-dnd": "^13.1.0",
    "react-currency-format": "^1.0.0",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
