// Your Code Here:
const getStatuses = async (searchTerm, numberOfStatuses) => {
    const rootURL = ' https://www.apitutor.org/twitter/simple/1.1/search/tweets.json';
    const endpoint = `${rootURL}?q=${searchTerm}&count=${numberOfStatuses}`;
    const response = await fetch(endpoint);
    const statuses = await response.json();
    const htmlChunk = statuses.map(statusToHTML).join('');
    document.querySelector('#output').innerHTML = htmlChunk;
}

const statusToHTML = (status) => {
  return `screen name: ${status.screen_name}
  text: ${status.text}
  <button onclick="displayUserDetail(${status.screen_name})">more</button>`;
}

const displayMatchingStatuses = () => {
    getStatuses(document.querySelector('#term').value, document.querySelector('#count').value);
}

const displayUserDetail = (usersName) => {
    getUserDetails(usersName);
}

const getUserDetails = async (username) => {
    const rootURL = ' https://www.apitutor.org/twitter/1.1/users/show.json';
    const endpoint = `${rootURL}?screen_name=${username}`;
    const response = await fetch(endpoint);
    const userDetails = await response.json();
    document.querySelector('#output').insertAdjacentHTML('beforeend', userToHTML(userDetails));
}

const userToHTML = (user) => {
    return `<img src="${user.profile_image_url}" alt="user image">
    name: ${user.name}${user.verified ? '<i class="fa-solid fa-circle-check"></i>' : ''}
    follower count: ${user.followers_count}
    friend count: ${user.friends_count}`;
  }

const searchButton = document.querySelector('#search');
searchButton.addEventListener('click', displayMatchingStatuses);