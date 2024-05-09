# COMPSCI 732 / SOFTENG 750 project - Team Fuzzy Foxes

## Welcome to the our project Trendy!  
![](./frontend/src/assets/logo.png)

Our team members are:
- Feiliang Liu
- Bond Chen
- Yaoquan Cai
- Jim Xie
- Xuechen Sun
- Garry Li

![](./group-image/Fuzzy%20Foxes.webp)

## Project information

Trendy is an online entertainment platform that aims to provide users with relaxing and entertaining content and services, allowing users to find a moment of rest and fun in their busy lives. By browsing this website users can get the latest hot news or trends across different mordem social media platforms all in one go one the internet rather than maually browse different website to search the information. The positioning of the Trendy website is to create a relaxing and pleasant space, providing users with a way to balance work and life and relax. It aims to allow users to find a moment of relaxation and happiness in their busy lives.

## Features

This application consists of several key parts, each serving a distinct purpose:

- **Login and Signup:** For user authentication processes allowing login and account creation.

- **Header:** It displays the current time, login and register buttons, and the ability to switch to your preferred theme color.

- **Container:** The left part contains the hot news of various websites. On the right are some small functional components, including basketball game scores, weather of the day, daily quotes and announcements about this website.

- **Footer:** Just a footnote and Toady history. The author is noted.

Key functionalities include:

- **Login and Signup:** Users can sign up on this website and then log in. Logged in users will enjoy more features.

- **Get the Latest News:** Through the API, get the current hot news from various websites (Twitter, Google, etc.) and display it on the page.

- **Change Theme Mode:** After logging in, users can switch the website's original light mode to dark mode.

- **Close Uninterested Sections:** After logging in, users can hide news websites they are not interested in.

- **Get Today's Weather Information:** When users browse the website, they can know the weather outside, which provides a reference for the thickness of their clothes.

## Technology Stack

- **React (https://react.dev/):** 
- **Vite (https://www.vitejs.net/):** 
- **Antd (https://ant-design.antgroup.com/):** 
- **MongoDB (https://www.mongodb.com//):** 
- **Express (https://expressjs.com/):** 
- **Node.js (https://nodejs.org/en/):** 
- **TypeScript (https://www.typescriptlang.org/):** 
- **Material UI (https://mui.com/):** 


## Project Setup

### Prerequisites

- This project requires Node.js, which includes npm (Node Package Manager). The node.js version should be around v20 (Recommend v20.12.21 with long-term support) If you don't have Node.js installed, follow these steps to install it:

  1. Go to [Node.js official website](https://nodejs.org/).
  2. Download the version suitable for your operating system (Windows, macOS, or Linux).
  3. Follow the installation instructions on the website to install Node.js and npm.

- This project requires MongoDB, If you don't have MongoDB (Recommend with MongoDBCompass) installed, follow these steps to install it:
  1. Go to [MongoDB Community Server Download](https://www.mongodb.com/try/download/community)
  2. Download the version suitable for your operating system (Windows, macOS, or Linux) and install it.
  3. During installation, Recommend to chose also download and install MongoDBCompass which is a powerful GUI-based navigation tool.

  ## Code Overview

- **main.ts:** Entry point of the application.
- **src/components:** Contains all components used throughout the application.
- **src/enums:** Defines some constants and enumeration types. Website theme mode (light theme and dark theme) as well as theme settings and hot list display settings
- **src/types:** Some type aliases are defined to describe different data structures and configuration items.
- **src/utils:** It defines some functions and constants for storing, retrieving, and removing data from localStorage, as well as the function of formatting numbers so that they can be displayed in a friendly format on the interface.

## Future Plans

- **Public Holiday Countdown** 

- **Mini Games** 

- **History(For Login user)**

## Reporting Issues and Debugging

For reporting issues, please use the GitHub issues tracker. Include as much detail as possible in your report, such as error messages, line numbers, and conditions that triggered the problem.

## Plantforms

- **Twitter**
- **Google Trends**
- **AI News**
- **NewsDataIO**
## Run the project(Deploy by using Render)
!! Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more  
!! If the data is not loaded successfully, please refresh the page 1-2 minutes after opening   

-Website: https://project-group-fuzzy-foxes.onrender.com/  
-Account:   
username: admin   
password: Admin123  
Or register an account.


## Run the project(local)
- **Backend**
-under ./backend
```
'npm install // install dependcies'
```
Create .env file and fill MongoDB connection string, API Keys and Additional configuration:
# MongoDB connection string
```
MONGODB_URL=mongodb://localhost:27017
```

# API keys for various services
```
RAPIDAPI_KEY_HISTORY=Your KEY
RAPIDAPI_KEY_TWITTER=Your KEY
API_KEY_GOOGLE_TRENDS=Your KEY
RAPIDAPI_KEY_AI_NEWS=Your KEY
API_KEY_NEWS_DATA_IO=Your KEY
RAPIDAPI_KEY_BASKETBALL=Your KEY
```

# Additional configuration
```
NODE_ENV=development
PORT=3000
```

npm run dev // run the server (port:3000)



- **Frontend**
-under ./frontend

```
npm install // install dependcies
```

Create .env file and fill :
```
VITE_BACKEND_URL=http://localhost:3000/
```
Then
```
npm run dev // run (port:5173)
```

## License

This project is open-source and available under the MIT License.

## Testing the project(local)
### Overview
The application includes login and registration functionality. Here's what you must do before you want to test all features of your project:
### Before Login
Please register an account and log in according to the following requirements

- **Username:**  Must be at least 4 characters long and contain only alphanumeric characters.
- **Password:** Must include at least one uppercase letter, one lowercase letter, and be at least 8 characters long without special symbols.
- **Confirm Password:** Must match the Password field.
- **Email:** Must be in a valid email format.
    Click the "Sign up" button.
- **Here are some examples for tests:**
### Example 1
- **Username:** 123
- **Password:** 123
- **Confirm Password:** 12
- **Email:** 123gmail.com

### Example 2
- **Username:** 123asd
- **Password:** 123asdASD
- **Confirm Password:** 123asdASD
- **Email:** 123@gmail.com

### Example 3
- **Username:** 123dsa
- **Password:** 123ASDASD
- **Confirm Password:** 123asd
- **Email:** 123@gmail.com

### Verify:
If all fields meet the requirements, an alert with "You have registered successfully!" should appear.  
If any field does not meet the requirements, an error message should be displayed in red below the corresponding field.
### Testing Login
Enter the following details:  
-**Username**: Use the username from a registered account.  
-**Password**: Enter the correct password.  
    Click the "Login" button.  
-**Here are two examples for tests**  
    This example you should run Register Example2 first:
### Successful Example
- **Username:** 123asd
- **Password:** 123asdASD
### Fail Example
- **Username:** 123asd
- **Password:** 12345

### Verify:
If the credentials are correct, an alert with "Login successful" should appear.  
If the username is not found or the password is incorrect, the corresponding error message should be displayed in red.
