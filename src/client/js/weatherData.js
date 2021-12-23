const baseUrl = 'http://localhost:8081/';
async function weatherData(geoLoc) {
	const postData = await fetch(baseUrl+"weather", {
		method: "POST",
		credentials: "same-origin",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(geoLoc),
	});
	try {
		const data = await postData.json(); // await response.json();
		console.log("postDataweather", data);
		let userDate = document.getElementById("date").value;
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + "-" + mm + "-" + dd;
		let difDate = Math.abs(new Date(userDate).getTime() - new Date(today).getTime());
		let diffDays = Math.ceil(difDate / (1000 * 3600 * 24));

		let element = data.data[diffDays - 1];

		let weatherHtml = ` <div class="city-weather">
		<h2>Weather is <strong>${element.weather.description}</strong></h2>
		<h2>On <strong>${element.datetime} </strong></h2>
		<h2>The Air Temperature Is Minimum <strong>${element.min_temp}</strong> Maximum <strong>${element.max_temp}</strong> </h2>
	 </div>`;

		document.getElementById("weather").innerHTML = weatherHtml;
	} catch (error) {
		console.log("error", error);
	}
}

export { weatherData };
