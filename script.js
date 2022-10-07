function clickMeButtonOnClick(event) {
    document.location.replace("./search-results.html");
}

function searchButtonOnClick(event) {

}

function fetchData(searchQuery, searchFormat) {
    var url = "https://www.loc.gov/"+searchFormat+"/?q="+searchQuery+"&fo=json";
    var formattedUrl = url.replace(" ", "%20");
    console.log(formattedUrl);

    fetch(formattedUrl)
    .then(function (response) {
      console.log("response", response);
      
      return response.json();
    })
    .then(function (data) {
      console.log("data",data);
    });
}

fetchData("Barack Obama", "newspapers");