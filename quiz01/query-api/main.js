const showResults = (resultsArray) => {
    document.querySelector('#nav').insertAdjacentHTML('beforeend', '<li><button id="prev">Previous</button></li>');
    document.querySelector('#nav').insertAdjacentHTML('beforeend', '<li id="resultNumber"></li>');
    document.querySelector('#nav').insertAdjacentHTML('beforeend', '<li><button id="next">Next</button></li>');

    const numOfRestaurants = resultsArray.length;
    let currentResult = 0;
    const results = document.querySelector('#results');
    document.querySelector('#resultNumber').innerHTML = `Showing ${currentResult} of ${numOfRestaurants}`;
    results.innerHTML = `<p>${resultsArray[currentResult].name}</p>
    <p>${resultsArray[currentResult].display_address}</p>
    <img src="${resultsArray[currentResult].image_url}" alt="restaurant's image">`;

    let lastResult = resultsArray.length - 1;
    const prevResult = () => {
        currentResult = (currentResult == 0) ? lastResult : currentResult - 1;
        document.querySelector('#resultNumber').innerHTML = `Showing ${currentResult} of ${numOfRestaurants}`;
        results.innerHTML = `<p>${resultsArray[currentResult].name}</p>
        <p>${resultsArray[currentResult].display_address}</p>
        <img src="${resultsArray[currentResult].image_url}" alt="restaurant's image">`;
    }
    const nextResult = () => {
        currentResult = (currentResult == lastResult) ? 0 : currentResult + 1;
        document.querySelector('#resultNumber').innerHTML = `Showing ${currentResult} of ${numOfRestaurants}`;
        results.innerHTML = `<p>${resultsArray[currentResult].name}</p>
        <p>${resultsArray[currentResult].display_address}</p>
        <img src="${resultsArray[currentResult].image_url}" alt="restaurant's image">`;
    }

    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    prev.addEventListener('click', prevResult);
    next.addEventListener('click', nextResult);
}

const search = async (value01, value02) => {
    const rootURL = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    const endpoint = `${rootURL}?location=${value01}&term=${value02}`;
    const response = await fetch(endpoint);
    const restaurants = await response.json();
    showResults(restaurants);
}

const searching = () => {
    search(document.querySelector('#location').value, document.querySelector('#term').value);
}

const searchButton = document.querySelector('#search');
searchButton.addEventListener('click', searching);
