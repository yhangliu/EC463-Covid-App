# EC463-Covid-App

### Yang Hang Liu 
 - hangliu@bu.edu
 - github username = yhangliu

### Brian Lin
 - linb1@bu.edu
 - github username = linb1

----------------------------------------------------------------------
# COVID-TRACKER:

When deployed, The user must sign in through Facebook or Google to reach the homepage. 
 - (Done by using libraries provided by Firebase)

The website will welcome the user, and display information in our area (MA) regarding the coronavirus. This includes daily updates about new cases, hopitialization, and death, as well as the total statistics for MA. 
 - (Done by using an API and displaying the information using item components with .jsx)

The user then is presented three buttons. One to sign out, one to "Track your Symptoms", and one to go to the admin dashboard. The sign out button is to sign out, back to the login page.

"Track Your Symptoms" brings the user to a survey of nine questions regarding common COVID-19 symptoms. At the end of the survey, the date and the user's answers are stored into a Firebase database for tracking. 
 - (Done by using libraries provided by Firebase to write information in their database)

The user can only access the Admin Dashboard if they have the admin key(which they will be prompted for). Admin Dashboard provides a list of users who have logged onto the website and displays the date of the last time each user had submitted a survey. It also provides the total number of each symptom experienced by all users within the past 24 hours.
 - (Done by using libraries provided by Firebase to read and query information in the database)

Our website has been deploy using Firebase-provided tools, and can be seen here: https://covid-tracker-auth.web.app/
 - *this web application was not developed/optimized for mobile use*

----------------------------------------------------------------------


## Instructions:
This web application was created using React and Node.js.
Make sure to run npm install to get the node_modules from package.json.
In order for this web application to work, these dependencies were installed:

    "@material-ui/core": "^4.11.0",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.20.0",
    "dotenv": "^8.2.0",
    "firebase": "^7.19.1",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-dom": "^16.13.1",
    "react-firebaseui": "^4.1.0",
    "react-scripts": "3.4.3",
    "save": "^2.4.0"
    
Created project in Firebase was created using an e-mail account. This allows us to associate our web application with the Firebase project and offers a database and a means of SSO authentication that we can utilize. 

Set a .env file with the following:

    REACT_APP_API_KEY=XXXXXXXXXXXXXXX
    REACT_APP_AUTH_DOMAIN=XXXXXXXXXXXXXXX
    REACT_APP_DATABASE_URL=XXXXXXXXXXXXXXX
    REACT_APP_PROJECT_ID=XXXXXXXXXXXXXXX
    REACT_APP_STORAGE_BUCKET=XXXXXXXXXXXXXXX
    REACT_APP_MESSAGING_SENDER_ID=XXXXXXXXXXXXXXX
    REACT_APP_ADMIN_KEY=XXXXXXXXXXXXXXX

Note that each variable requires information provided/generated by Firebase, so if trying to deploy this project, replace "XXXXXXXXXXXXXXX" with the keys, domains, etc. with the ones provided by your Firebase project. ADMIN_KEY can be set to whatever the author would like, but for this project, it is set to the name of this course (ec463).

To deploy your own Firebase web application, use `npm install -g firebase-tools` and follow Firebase Hosting instructions.

----------------------------------------------------------------------


## Authentication/Application choice - Google and Facebook

We decided to use Google and Facebook as our choice of authentication as these websites are commonly used, and because Firebase provided tools to easily apply a user authentication.
We chose to make a web application as we both made a mobile application for EC327 but never learn any web development skills so we wanted to try creating a web application. This way, we could learn something entirely new.

----------------------------------------------------------------------


## Api choice - https://covidtracking.com/data/api

We really liked this site since it showed the stats for each individual state while still providing detailed information for both daily stats and overall. Most of the other ones that we found seemed to either be sorted by country or didn't provide enough information.
The most important info that we focused on was getting the daily stats, then we focused on getting the overall stats.

URL for state we used: https://api.covidtracking.com/v1/states/MA/current.json?state=MA

----------------------------------------------------------------------


## Daily Symptom Test

We ask the user a series of 9 questions then we give them instructions based on a score determined by their responses:

Advised to stay practicing social distancing if no symptoms shown.
Advised to quarantine if showing symptoms.
Advised to seek medical assistance if showing multiple symptoms.

----------------------------------------------------------------------

## Admin Dashboard

You can see the name of all the users who signed in as well as the last time they submitted their survey. The daily symptoms are also shown.

----------------------------------------------------------------------

## Testing

 - Sign in with google - successful 
 - Sign in with facebook - was working during development but now some people seem to have issues logging in.\
 - Show correct name on screen - successful\
 - Sign out - successful

 - Correct Survey - successful
 - Tracking Symptoms (0 symptoms) - successful
 - Tracking Symptoms (1-2 symptoms) - successful
 - Tracking Symptoms (3 or more symptoms) - successful

 - Logging into admin dashboard - successful
 - Seeing users in admin dashboard - successful
 - Seeing first time logins - successful
 - Seeing time survey was submitted - successful
 - Seeing list of symptoms - successful but the same user can submit the same symptoms multiple times\
 - Back to home - successful

 - See users in database - successful
 - Seeing user symptoms in database - successful
 - Seeing date of submission in database - successful

 - Successful api call - successful
 - Successful card format - successful
 - Correct daily update data - successful
 - Correct total stats - successful



----------------------------------------------------------------------
