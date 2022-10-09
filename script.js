/* 
 *  Holds all the logic for the submit button on click.
 *  When the submit button is clicked, we want to:
 *    1. Get the search query input text.
 *    2. Get the format that the user selected.
 *    3. Change the URL to /search-results.html?q={queryInput}&format={selectInput}
 */
$(function clickMeButton() {
  $(".btn-dark").on("click", function (event) {
    event.preventDefault();

    /* 1. Get the search query input text. */
    var searchQuery = $("#exampleFormControlInput1").val();

    /* 2. Get the format that the user selected. */
    var searchFormat = $("#exampleFormControlSelect1").val();

    /* 3. Change the URL to /search-results.html?q={queryInput}&format={selectInput} */
    document.location.replace("./search.html?q="+searchQuery+"&format="+searchFormat);
  })
});