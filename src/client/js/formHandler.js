const fetch = require("node-fetch");
const baseUrl = 'http://localhost:8081/';

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
		postData(baseUrl+"geo", { cityName: cityName }).then(function (res) {
			let geoLoc = {
				cityName: res.geonames[0].name,
				lat: res.geonames[0].lat,
				lng: res.geonames[0].lng,
				day: diffDays,
			};
			Client.weatherData(geoLoc);
			Client.pixabayData(geoLoc);
		});
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
		const newData = await response.json();
		return newData;

};

export { handleSubmit };
