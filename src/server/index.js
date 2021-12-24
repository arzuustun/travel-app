const dotenv = require("dotenv");
dotenv.config();
const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const { SERVER_PORT } = process.env;

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require('node-fetch');

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Configure express static directory.
app.use(express.static("dist"));
//app.use(express.static('src/client'))

console.log(__dirname);

const geoApiURL = "http://api.geonames.org/searchJSON";
const weatherApiURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const pixabayURL = "https://pixabay.com/api/";

console.log(`Your API key is ${GEONAMES_API_KEY}`);

app.get('/', function (req, res) {
	res.sendFile('dist/index.html');
});

//test api
app.get("/test", function (req, res) {
	res.send(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(SERVER_PORT, (error) => {
	if (error) throw new Error(error);
	console.log(`Server listening on port ${SERVER_PORT}!`);
});

// POST method
app.post("/geo", async (req, res) => {
const response = await fetch(`${geoApiURL}?q=${req.body.cityName}&maxRows=1&username=${GEONAMES_API_KEY}`)
	try {
		const data = await response.json();
		res.send(data);
	} catch (error) {
		console.log("error", error);
	}
});

// POST method
app.post("/weather", async (req, res) => {
	const response = await fetch(`${weatherApiURL}?lat=${req.body.lat}&lon=${req.body.lng}&days=${req.body.day}&key=${WEATHERBIT_API_KEY}`)
	console.log("response url:", response);
	try {
		const data = await response.json();
		res.send(data);
	} catch (error) {
		console.log("error", error);
	}
});
// POST method
app.post("/pixabay", async (req, res) => {
	const response = await fetch(`${pixabayURL}?key=${PIXABAY_API_KEY}&q=${req.body.cityName}&image_type=photo&pretty=true&orientation=horizontal&per_page=4&category=travel`)
	console.log("response url:", response);
	try {
		const data = await response.json();
		res.send(data);
	} catch (error) {
		console.log("error", error);
	}
});