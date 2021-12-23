const fetch = require("node-fetch");
const baseUrl = 'http://localhost:8081/';
function validateInput() {
	let isValid = true;

	// get user input of cityName
	const userCityName = document.querySelector("#cityname").value;
	if (userCityName === "") {
		isValid = false;
	}
	//get user inputed date (after the button click event)
	const userDate = document.getElementById("date").value;
	if (userDate === "") {
		isValid = false;
	}

	return isValid;
}

async function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let cityName = document.getElementById("cityname").value;
	let userDate = document.getElementById("date").value;
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = yyyy + "-" + mm + "-" + dd;
	let difDate = Math.abs(new Date(userDate).getTime() - new Date(today).getTime());
	const diffDays = Math.ceil(difDate / (1000 * 3600 * 24));
	if (validateInput) {
		postData(baseUrl+"geo", { cityName: cityName }).then(function (res) {
			let geoLoc = {
				cityName: res.geonames[0].name,
				lat: res.geonames[0].lat,
				lng: res.geonames[0].lng,
				day: diffDays,
			};
			console.log("geoLoc", geoLoc);
			Client.weatherData(geoLoc);
			Client.pixabayData(geoLoc);
		});
	} else {
		document.getElementById("error").innerHTML =
			"Invalid URL. Please URL starts with http:// or https:// and has not spaces.";
	}
}

//POST combined data to server
const postData = async (url = "", data = {}) => {
	console.log("Analyzing:", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	try {
		const newData = await response.json();
		console.log("postData", newData);
		return newData;
	} catch (error) {
		console.log("error", error);
	}
};

export { handleSubmit };
