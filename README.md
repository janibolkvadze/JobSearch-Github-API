# Requirements

1. Calling the api from the browser causes CORS issue, which can be fixed running the browser in insecure mode.
Chrome on windows:
run
"PATH TO CHROME"chrome.exe --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

2. Running the app in dev mode uses Redux DevTools Middleware.
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
URL for installation of The Chrome extension: 
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es-419&gl=001

3. Dependencies (as specified in the package.json):

    axios - ^0.19.0,
    bootstrap - ^4.3.1,
    react ^16.9.0,
    react-data-table-component ^3.4.1,
    react-dom - ^16.9.0,
    react-html-parser - ^2.0.2,
    react-redux - ^7.1.1,
    react-router-dom - ^5.0.1,
    react-scripts - 3.1.1,
    reactstrap - ^8.0.1,
    redux - ^4.0.4,
    redux-thunk - ^2.3.0,
    styled-components - ^4.3.2

    All the dependencies can be installed by running: npm install

# Issues / Unfinished features

1. The "save offer" feature is incomplete. The list of saved job offers is store in the state using Redux state management, but has no Backend support. Navigating to another pages / Refreshing the page causes loss of the stored data.

2. Table sorting feature is incomplete. The data is represented using React-data-table-component. 2 way sorting + Unsorting works, but after the second click (state issue).

3. Sorting the column "Created At" is wrong. Attempt to convert the DATE STRING to JavaScript Date format fails.

# Notes

1. Rows of incomming data table are clickable. Clicking a row leads the user to the job offer page with detailed infrmation.