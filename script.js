//when search is clicked, links to new page and storing the
//value entered in form to local storage

$(function clickMeButton() {
  $(".btn-primary").on("click", function (event) {
    event.preventDefault();
    var searchQuery = $("#exampleFormControlInput1").val();
    var searchFormat = $("#exampleFormControlSelect1").val();
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("searchFormat", searchFormat);
    // console.log(document.location);
    document.location.replace("./search.html");
  })
});

function fetchData(searchQuery, searchFormat) {
  var url = "https://www.loc.gov/" + searchFormat + "/?q=" + searchQuery + "&fo=json";
  //var formattedUrl = url.replace(" ", "%20");
  console.log(url);

  fetch(url)
    .then(function (response) {
      console.log("response", response);

      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
    });
};