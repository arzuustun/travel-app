# Project Instructions
# Capstone

This is the Capstone project of Udacity Frontend Nanodegree.
User enters city name , selects date and than Webpage displays four day weather forecast and  a few pictures about city

## API
-[GeoNames](https://www.geonames.org/export/web-services.html).

-[WeatherApi](https://www.weatherbit.io/).

-[Pixabay](https://pixabay.com/api/docs/#api_javascript_example).

## Getting started
1. Install the required packages (after changing to this directory): 
    ```
    $ npm install
    ```
2. Have your API credentials ready (sign up for one if needed) for Geonames, weatherbit, and pixabay
3. Create a .env file on the root of the project and enter your ID and key :
    ```
    GEONAMES_API_KEY=**************************
    WEATHERBIT_API_KEY=**************************
    PIXABAY_API_KEY=**************************
    SERVER_PORT=8081
    ```
4. Run the build : 
    ```
    $ npm run build-prod
    ```
5. Run the server:
    ```
    $ npm start
    ```

## Test
Jest is a framework for testing JavaScript projects.  The Jest framework provides us the ability to create, and run unit tests. We wrote tests for desired functions defined in the src/client/js directory. The tests will check if the functions are behaving expectedly when provided an input.
-  Install Jest by usings ```npm install--save-dev jest```
-  Run the ```npm run test``` command.
