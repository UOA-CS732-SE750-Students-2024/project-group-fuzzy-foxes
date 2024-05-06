# README.md - HandyBuddy App with Vue.js
<br />

Hi there, thanks for reading README.md, please see below structure of the contents. <a name="home">HOME</a>

1. [Application introduction](#ch1)
2. [Installation guide](#ch2)
3. [Usage](#ch3)  
4. [Features](#ch4)
5. [Codebase and structure overview](#ch5)
6. [License](#ch6)
7. [Reference](#ref)

***
<br />

 
  
## <a name="ch1">Application Introduction</a>

<p>Frontend development has evolved significantly over the years, with an increasing emphasis on building dynamic and interactive user interfaces. Vue.js and React are two of the most popular and powerful tools in front-end development.As developers, we're constantly faced with the task of choosing the right tools for our projects, and how to choose between Vue.js and React is a frequently asked question. Hence, this demo application is to assist explore some key features of VUE.js and some differences when comparing against React.</p>

<p>This demo application is developed using VUE.js front-end framework, and it is called "HandyBuddy", which is our revolutionary to-do list and note-taking hybrid app! Seamlessly switch between planning and capturing ideas. Stay organized with personalized features. Take control of your time and maximize productivity. Experience efficiency like never before. Welcome to the future of productivity!</p>

Please refer here to find references if you want to learn about application [Features](#ch4).\
Please refer here to find references if you want to learn about application [Codebase and structure overview](#ch5).\
**Please refer **[here](https://link)** to find references of a similar application developed using React, which will be helpful when you want to make a comparison on the codebases and some functionalities between these two frontend frameworks[1].**
\
<br />
## <a name="ch2">Installation Guide</a>

Let's get your machine and environment ready for running the app!

 1. **GitHub account**\
In order to clone this project to your local environment, you need to have your own GitHub account which has access to this project and has permission to take a copy of this project.


 2. **Git Desktop**
Install Git in your local environment. Please refer here to download the [latest Git](https://git-scm.com/downloads) [2].


 3. **Microsoft Visual Studio Code** - getting your Visual Studio Code ready. Please refer [Visual Studio Code Download page](https://code.visualstudio.com/download) [3], and install it in your machine.


 4. **Node.js** - is also essential for running the application, please install beforehand, you can refer [here](https://nodejs.org/en/download/current) [4] to download Node.js.


 5. **NPM** - Node Package Manager. After installing Node.js, open Visual Studio Code, NPM needs to be configured and installed using install `npm install -g npm` by running on the Bash console or command prompt [5].

 6. **Browser** - A browser is needed for running the application. This can be IE, Google Chrome or some others.

\
<br />
## <a name="ch3">Usage</a>

**1. Pull and Clone the Repo**
\
To clone this project, go to this repository's main branch page and copy this project's Clone HTTPS link.

![image](
\
<br />

**2. Save Project**
\
Open Visual Studio Code, click on Command Palette from the left bottom corner. Type `Git: Clone`.\
![image]

Paste your copied GitHub link to the search box and confirm.\
![image]

Store your cloned project to your named folder.

Please note it may have a prompt that needs your authorization through GitHub, and you can then authorize the permission.
![image]

\
<br />

**3. Open Project**
\
Suggest opening the project folder by manually opening a new VS Code folder so that you will not run the incorrect folder path.
![image](


Click on 'Trust the author' option if it gives an alert.

![image](
\
<br />

**4. Run App**
\
After you can see all the project folders and files you can then run `npm i` to install all necessary dependent packages.

Once the installation is done, run `npm run dev` to run the application, you can then click on a prompted link starting with a local host name like this 'http://localhost:5173'.

Click on the link and press Ctrl on the keyboard at the same time to open the web app on your default browser. 
\
<br />
## <a name="ch4">Application Features</a>
<p>This application is called "HandyBuddy". There are three main functions in this application. </p>

#### a) Routing to different pages
In the application, there are several places which provide links and buttons where you are able to click on and go to the certain page. This is also called one-page application.
These places are the navigation bar on the heading, the footer, and the home page.

#### b) Note/ To-do list creating area
![image](https:

This area in Jot Down page allows user input their note or to-do list information including titles, contents, dates, or list items.\
This button below lets users choose the paper input type, either note or to-do list.\
![image](https:/

Users also can refresh the area by using the below button if they want to re-enter the information again.\
![image](https:/

If users finish all the entries and are ready for publishing the paper then they can simply click the submit button.\
![image](

\
<br />
## <a name="ch5">Codebase & Structure Overview</a>
This application is developed via VUE.js under version 3.4.21, and it is developed using `Optional API` method from VUE.
#### Codebase & Structure
The codebase can be found under the same repository folder as this README.md file.

They are constructed by the following files and components.\
![image](h

\
The below is the component structure.\
![image](https:

#### Component Files
`index.html` is the main HTML file that provides the linkage to JavaScript and CSS files as well as the location of the "app" division in HTML.\
`main.css` offers the overall application styling settings.\
`main.js` creates a script allowing different functionalities from libraries.\
`index.js` provides a router control platform for route management.\
`icons` is a folder that contains the necessary imported icon for the app across different component files.

#### Dependencies
Please refer to `package.json` file for application dependencies.

    "dependencies": {
        "bootstrap": "^5.3.3",
        "bootstrap-icons": "^1.11.3",
        "primevue": "^3.50.0",
        "vue": "^3.4.21",
        "vue-router": "^4.3.0"
      }
\
<br />

## <a name="ch6">License</a>
This project is licensed under the MIT License.
\
<br />
## <a name="ref">Reference</a>
[1] GitHub-ReactAPP-HandyBuddy - https:/  \
[2] Git --local-branching-on-the-cheap - https://git-scm.com/downloads \
[3] Download Visual Studio Code - Free and built on open source. Integrated Git, debugging and extensions. https://code.visualstudio.com/download  \
[4] Download Node.js® - https://nodejs.org/en/download/current   \
[5] Downloading and installing Node.js and NPM - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm  


[Home](#home)
