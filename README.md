# Carbon Intensity UK

An SVG data visualisation experiment using data from [National Grid ESO's Carbon Intensity API](https://carbonintensity.org.uk/) and [The Guardian Open Platform](https://open-platform.theguardian.com/).

Work in progress. Interactive SVG Map displaying UK regional carbon intensity data throughout Lockdown 2020. 

Built with [React](https://reactjs.org/) and [UIKit](https://getuikit.com/). Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API Keys

To run this project, you'll need to obtain an API key from:
 * [The Guardian Open Platform](https://open-platform.theguardian.com/)
 * [Met Office DataPoint](https://www.metoffice.gov.uk/services/data/datapoint/)
 
 Free developer access is available for all APIs used in this project.
 
 Create a JSON file: `src/Api/ApiKeys.json` which contains the following:
    
    {
    "GUARDIAN_OPEN_PLATFORM": "{Your API key here}",
    "MET_OFFICE_DATAPOINT": "{Your API key here}"
    } 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

