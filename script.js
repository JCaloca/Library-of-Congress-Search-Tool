//when search is clicked, links to new page and storing the
//value entered in form to local storage

$(function clickMeButton() {
  $(".btn-primary").on("click", function (event) {
    event.preventDefault();
    var searchQuery = $("#exampleFormControlInput1").val();
    var searchFormat = $("#exampleFormControlSelect1").val();
    //localStorage.setItem("searchQuery", searchQuery);
    //localStorage.setItem("searchFormat", searchFormat);
    // console.log(document.location);
    document.location.replace("./search.html?q="+searchQuery+"&format=");
  })
});

/* 
 *  Holds all the logic for the submit button on click.
 *  When the submit button is clicked, we want to:
 *    1. Get the search query input text.
 *    2. Get the format that the user selected.
 *    3. Change the URL to /search-results.html?q={queryInput}&format={selectInput}
 */
function submitButtonOnClick(event) {
  event.preventDefault();
    
  /* 1. Get the search query input text. */
  var queryInputText = searchQueryInputElement.val();
  console.log(queryInputText);

  fetch(url)
    .then(function (response) {
      console.log("response", response);

      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
    });
};
var searchQueryInputElement = $("#exampleFormControlInput1");
var searchButtonElement = $("button");
var formatSelectElement = $("#exampleFormControlSelect1");

/* 
 *  Holds all the logic for the submit button on click.
 *  When the submit button is clicked, we want to:
 *    1. Get the search query input text.
 *    2. Get the format that the user selected.
 *    3. Change the URL to /search-results.html?q={queryInput}&format={selectInput}
 
function submitButtonOnClick(event) {
  event.preventDefault();
    
   1. Get the search query input text.
  var queryInputText = searchQueryInputElement.val();
  console.log(queryInputText);

   2. Get the format that the user selected. 
  selectedElement = formatSelectElement.children("option:selected");
  selectedFormat = selectedElement.text()
    
   3. Change the URL to /search-results.html?q={queryInput}&format={selectInput} 
  location.replace("./search.html?q="+queryInputText+"&format="+selectedFormat);
}

searchButtonElement.on("click", submitButtonOnClick);
*/