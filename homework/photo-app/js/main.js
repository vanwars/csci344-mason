import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';

const profileToHTML = (profile) => {
    return `<img id="userpic" src="${profile.thumb_url}">
            <h1>${profile.username}</h1>`
}

const showProfile = async (token) => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    document.querySelector('#user').innerHTML = profileToHTML(data);
    console.log('Profile:', data);
}

const suggestionsToHTML = (suggested) => {
    return `<section class="suggesteduser">
                <img src="${suggested.thumb_url}">
                <ul>
                    <li class="upper">${suggested.username}</li>
                    <li class="lower">suggested for you</li>
                </ul>
                <button class="buttons"><span class="followbutton">follow</span></button>
            </section>`
}

const showSuggested = async (token) => {
    const endpoint = `${rootURL}/api/suggestions`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    const htmlChunk = data.map(suggestionsToHTML).join('');
    document.querySelector('#suggestedusers').innerHTML = htmlChunk;
    console.log('Suggestions:', data);
}

const storyToHTML = (story) => {
    return `<ul class="story">
                <li><img class="friendprofilepic" src="${story.user.thumb_url}"></li>
                <li class="friendname">${story.user.username}</li>
            </ul>`
}

const showStories = async (token) => {
    const endpoint = `${rootURL}/api/stories`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    const htmlChunk = data.map(storyToHTML).join('');
    document.querySelector('#storiespanel').innerHTML = htmlChunk;
    console.log('Stories:', data);
}

const commentDisplay = (comment) => {
    if(comment.comments.length > 1) {
        return `<button class="buttons">View all ${comment.comments.length} comments</button>
                <p><strong>${comment.comments[comment.comments.length - 1].user.username}</strong> ${comment.comments[comment.comments.length - 1].text}</p>`
    } else if(comment.comments.length == 1) {
        return `<p><strong>${comment.comments[0].user.username}</strong> ${comment.comments[0].text}</p>`
    } else {
        return``
    }
}

const postToHTML = (post) => {
    return `<section class="posttop">
                <h1>${post.user.username}</h1>
                <i class="fas fa-ellipsis-h"></i>
            </section>
            <img src="${post.image_url}" alt="">
            <section class="iconsrow">
                <button class="buttons"><i class="${post.current_user_like_id ? 'far fa-heart' : 'fas fa-heart'}"></i></button>
                <button class="buttons"><i class="far fa-comment"></i></button>
                <button class="buttons"><i class="far fa-paper-plane"></i></button>
                <button class="buttons"><i class="${post.current_user_bookmark_id ? 'far fa-bookmark' : 'fas fa-bookmark'}"></i></button>
            </section>
            <span class="likesrow">${post.likes.length} likes</span>
            <section class="capcom">
                <p><strong>${post.user.username}</strong> ${post.caption}</p>
                ${commentDisplay(post)}
                <span>${post.display_time}</span>
            </section>
            <section class="comment">
                <section>
                    <button class="buttons"></button><i class="far fa-smile"></i>
                    <input class="addcomment" placeholder="Add a comment..." value="">
                </section>
                <button class="buttons"><span class="sendpost">Post</span></button>
            </section>`
}

const showPosts = async (token) => {
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    const htmlChunk = data.map(postToHTML).join('');
    document.querySelector('.post').innerHTML = htmlChunk;
    console.log('Posts:', data);
}


const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    const token = await getAccessToken(rootURL, 'webdev', 'password');

    // then use the access token provided to access data on the user's behalf
    showProfile(token);
    showSuggested(token);
    showStories(token);
    showPosts(token);
}

initPage();