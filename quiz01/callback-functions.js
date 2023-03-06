// Your code here.
const fetchAndShowTweets =  async (searchTerm, callBackFunction) => {
    const rootURL = 'https://www.apitutor.org/twitter/simple/1.1/search/tweets.json';
    const endpoint = `${rootURL}?q=${searchTerm}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    callBackFunction(data);
}

const printTwitterUsers = (arrayOfTweets) => {
    arrayOfTweets.forEach(element => {
        console.log(element.srceen_name);
    })
}

const showMostPopularTweets = (arrayOfTweets) => {
    let previousIndex = 0;
    let currentIndex = 0;
    let mostIndex = 0;
    arrayOfTweets.forEach(element => {
        if(currentIndex > 0) {
            mostIndex = (arrayOfTweets[previousIndex].retweet_count > arrayOfTweets[currentIndex].retweet_count) ? previousIndex : currentIndex;
        }
        previousIndex = previousIndex + 1;
        currentIndex = currentIndex + 1;
    })
    console.log(`text: ${arrayOfTweets[mostIndex].text}
    screen name: ${arrayOfTweets[mostIndex].srceen_name}
    retweet count: ${arrayOfTweets[mostIndex].retweet_count}`);
}

fetchAndShowTweets('cats', printTwitterUsers);
fetchAndShowTweets('cats', showMostPopularTweets);