const baseUrl = 'http://localhost:8081/';
async function pixabayData(geoLoc) {
	await fetch(baseUrl+"pixabay", {
		method: "POST",
		credentials: "same-origin",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(geoLoc),
	})
		.then((res) => res.json())
		.then(async (res) => {
			console.log("postDat apixabay", res);
			let pictureHtml = `
		<img class="grid-item" style="width:100%" src="${res.hits[0].webformatURL}"/>
		<img class="grid-item" style="width:100%" src="${res.hits[1].webformatURL}"/>
		<img class="grid-item" style="width:100%" src="${res.hits[2].webformatURL}"/>
		<img class="grid-item" style="width:100%" src="${res.hits[3].webformatURL}"/>`;

			document.getElementById("picture-container").innerHTML = pictureHtml;
		})
		.catch((error) => {
			console.log("error", error);
		});
}
export { pixabayData };
