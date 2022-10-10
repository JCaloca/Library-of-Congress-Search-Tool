var searchResultsElement = $("#search-results");
var submitBtn = $("#search-btn");
var goBackBtn = $(".btn-danger");
var textInputElement = $("#exampleFormControlInput1");

/*
 *  Generates the search results that you see on the page when given a data blob representing the search results.
 */
function displaySearchResults(data) {
    //*clearing the search results to show new results when multiple searches
    searchResultsElement.empty();
    /* First, we want to create the header that displays "Showing results for " */
    var searchQuery = data.search.query;
    var headerToAdd = $("<h2>");
    headerToAdd.addClass("my-3");
    headerToAdd.attr("id", "search-results-header");
    headerToAdd.text("Showing results for " + searchQuery + ":");
    searchResultsElement.append(headerToAdd);

    /* Now, we go through each result in the data returned, and create a card for it. */
    var resultList = data.results;

    for (var i = 0; i < resultList.length; i++) {
        var cardToAdd = $("<div>");
        cardToAdd.addClass("card my-3");

        var cardBody = $("<div>");
        cardBody.addClass("card-body d-flex flex-column align-items-start");
        cardToAdd.append(cardBody);

        var resultTitle = resultList[i].title;
        var cardHeader = $("<h3>");
        cardHeader.addClass("card-title");
        cardHeader.text(resultTitle);
        cardBody.append(cardHeader);

        var date = resultList[i].date;
        var dateToAdd = $("<p>");
        dateToAdd.addClass("card-subtitle text-muted");
        dateToAdd.text("Date: " + date);
        cardBody.append(dateToAdd);

        /* Sometimes the result comes without a description. In that case, we'll set the subjects to none. */
        var subjects = resultList[i].subject;
        var subjectText = "Subjects: ";
        if (subjects) {
            subjectText = subjectText + subjects.join(", ");
        } else {
            subjectText = subjectText + "none";
        }
        var subjectsToAdd = $("<p>");
        subjectsToAdd.addClass("card-text");
        subjectsToAdd.text(subjectText);
        cardBody.append(subjectsToAdd);

        /* Sometimes a result comes with no description. In that case I set it to "No description for this entry" */
        var description = "Description: ";
        var descriptions = resultList[i].description;
        if (descriptions && (descriptions != "")) {
            description = description + descriptions[0];
        } else {
            description = description + "No description for this entry";
        }

        var descriptionToAdd = $("<p>");
        descriptionToAdd.addClass("card-text");
        descriptionToAdd.text(description);
        cardBody.append(description);

        /* 
         *  Sometimes the URL is delivered to us just as //{location}, so we have to check to see if that's the case and add an https: in 
         *  front of it.
         */
        var resultURL = resultList[i].url;
        if (resultURL.substring(0, 2) == "//") {
            //console.log(resultURL);
            resultURL = "https:" + resultURL;
        }
        //console.log(resultURL);

        /* Now we create and add the button that links to whatever the result is.  */
        var linkToAdd = $("<a>");
        linkToAdd.addClass("btn btn-dark mt-3");
        linkToAdd.attr("role", "button");
        linkToAdd.attr("href", resultURL);
        linkToAdd.attr("target", "_blank");
        linkToAdd.text("Read More");
        cardBody.append(linkToAdd);

        searchResultsElement.append(cardToAdd);
    }
}

/* Logic for the go back button on click. On the Go Back Button, we just want to change the URL. */
function goBackButtonOnClick(event) {
    event.preventDefault();
    document.location.replace("./index.html");
}

/*
 *  Fetches the search results from the Library of Congress. If the format string is empty, we need to
 *  send the url in form of https://www.loc.gov/search/?q={searchQuery}&fo=json, otherwise the API call is
 *  of the form https://www.loc.gov/{searchFormat}/?q={searcQuery}&fo=json.
 *  
 *  In order to fetch the data we must:
 *      1. Determine if the format is an empty string.
 *          a. If it is, the URL is of the form https://www.loc.gov/search/?q={searchQuery}&fo=json
 *          b. If not, the URL is of the form https://www.loc.gov/{searchFormat}/?q={searcQuery}&fo=json
 *      2. Fetch the data.
 *      3. When we get the data back, pass the data blob to displaySearchResults to display the results.
 */
function fetchData(searchQuery, searchFormat) {
    var url;

    /* 1. Determine if the format is an empty string. */
    if (searchFormat === "") {
        /* 2. a. If it is, the URL is of the form https://www.loc.gov/search/?q={searchQuery}&fo=json */
        url = "https://www.loc.gov/search/?q="+searchQuery+"&fo=json"
    } else {
        /* 2. b. If not, the URL is of the form https://www.loc.gov/{searchFormat}/?q={searcQuery}&fo=json */
        var url = "https://www.loc.gov/" + searchFormat + "/?q=" + searchQuery + "&fo=json";
    }

    /* 2. Fetch the data. */
    fetch(url)
        .then(function (response) {
            //console.log("response", response);

            return response.json();
        })
        .then(function (data) {
            //console.log("data", data);

            /* 3. When we get the data back, pass the data blob to displaySearchResults to display the results. */
            displaySearchResults(data);
        });
}

// fetchData("Chicago", "manuscripts");
//linking fetchData to button
$(function startSearch() {
    $(submitBtn).on("click", function (event) {
        event.preventDefault();
        var searchQuery = $("#exampleFormControlInput1").val();
        var searchFormat = $("#exampleFormControlSelect1").val();
        fetchData(searchQuery, searchFormat);
    })
});

//when redirected from another page, get search params from the url and execute search
//also set the text input element to the value of the search query
$(function () {
    var queryString = location.search;
    var urlParams = new URLSearchParams(queryString);
    var searchFor = urlParams.get("q");
    var format = urlParams.get("format");

    textInputElement.val(searchFor);
    var selectFormatElement = document.getElementById("exampleFormControlSelect1");
    selectFormatElement.value = format;
    
    fetchData(searchFor, format);
});

goBackBtn.on("click", goBackButtonOnClick);

/* 
 *  I stole the idea for using a URLSearchParams Object from the following source on google:
 *  https://www.sitepoint.com/get-url-parameters-with-javascript/
 * 
 *  When the search results page is loaded, we need to do the following:
 *      1. We need to parse out the parameters, namely the search query and format we specified.
 *      2. We need to call fetch to get the results with the parameters we parsed.
 *
 1. We need to parse out the parameters, namely the search query and format we specified.
var queryString = location.search;
var urlParams = new URLSearchParams(queryString);
var searchFor = urlParams.get("q");
var format = urlParams.get("format");

 2. We need to call fetch to get the results with the parameters we parsed.
fetchData(searchFor, format);
*/