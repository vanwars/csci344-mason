import {getAccessToken} from './utilities.js';
const rootURL = 'https://photo-app-secured.herokuapp.com';
let token;
let allPosts;

const profileToHTML = (profile) => {
    return `<img id="userpic" src="${profile.thumb_url}">
            <h1>${profile.username}</h1>`
}

const showProfile = async () => {
    const endpoint = `${rootURL}/api/profile`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    document.querySelector('#user').innerHTML = profileToHTML(data);
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

const showSuggested = async () => {
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
}

const storyToHTML = (story) => {
    return `<ul class="story">
                <li><img class="friendprofilepic" src="${story.user.thumb_url}"></li>
                <li class="friendname">${story.user.username}</li>
            </ul>`
}

const showStories = async () => {
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
}

const modalElement = document.querySelector('.modal-bg');

const modalToHTML = (post) => {
    document.querySelector('.image').setAttribute('style', `background-image: url("${post.image_url}")`);
}

const modalCommentsToHTML = (comments) => {
    return `<div class="row">
                        <p>${comments.text}</p>
                        <button class="buttons"><i class="far fa-heart"></i></button>
                    </div>
            `;
}

 window.openModal = (ev, i) => {
    const post = allPosts[i];
    console.log('open!');
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.close').focus();
    modalToHTML(post);
    const htmlChunk = post.comments.map(modalCommentsToHTML).join('');
    document.querySelector('.the-comments').innerHTML = htmlChunk;
}

 window.closeModal = ev => {
    console.log('close!');
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('#viewall').focus();
};


// function ensures that if the tabbing gets to the end of the 
// modal, it will loop back up to the beginning of the modal:
document.addEventListener('focus', function(event) {
    console.log('focus');
    if (modalElement.getAttribute('aria-hidden') === 'false' && !modalElement.contains(event.target)) {
        console.log('back to top!');
        event.stopPropagation();
        document.querySelector('.close').focus();
    }
}, true);

const commentDisplay = (comment, i) => {
    const commentLength = comment.comments.length;
    if(commentLength > 1) {
        return `<button class="buttons" id="viewall" onclick="openModal(event, ${i})">View all ${commentLength} comments</button>
                <p><strong>${comment.comments[commentLength - 1].user.username}</strong> ${comment.comments[commentLength - 1].text}</p>
                <span>${comment.comments[commentLength - 1].display_time}</span>`
    } else if(commentLength == 1) {
        return `<p><strong>${comment.comments[0].user.username}</strong> ${comment.comments[0].text}</p>
                <span>${comment.comments[0].display_time}</span>`
    } else {
        return``
    }
}

const postToHTML = (post, i) => {
    return `<article id="post_${post.id}" class="post">
            <section class="posttop">
                <h1>${post.user.username}</h1>
                <i class="fas fa-ellipsis-h"></i>
            </section>
            <img src="${post.image_url}" alt="">
            <section class="iconsrow">
                <section id="left">
                    <button class="buttons" onclick="${post.current_user_like_id ? deleteLike(post) : postLike(post)}"><i class="${post.current_user_like_id ? 'fas fa-heart' : 'far fa-heart'}"></i></button>
                    <button class="buttons"><i class="far fa-comment"></i></button>
                    <button class="buttons"><i class="far fa-paper-plane"></i></button>
                </section
                <section id="right">
                <button class="buttons"><i class="${post.current_user_bookmark_id ? 'fas fa-bookmark' : 'far fa-bookmark'}"></i></button>
                </section>
            </section>
            <span class="likesrow">${post.likes.length} likes</span>
            <section class="capcom">
                <p><strong>${post.user.username}</strong> ${post.caption}</p>
                <span>${post.display_time}</span>
                ${commentDisplay(post, i)}
            </section>
            <section class="comment">
                <section>
                    <button class="buttons"></button><i class="far fa-smile"></i>
                    <input class="addcomment" placeholder="Add a comment..." value="">
                </section>
                <button class="buttons"><span class="sendpost">Post</span></button>
            </section>
            </article>`
}

const showPosts = async () => {
    const endpoint = `${rootURL}/api/posts`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    allPosts = data;
    console.log(data);
    const htmlChunk = data.map(postToHTML).join('');
    document.querySelector('#posts').innerHTML = htmlChunk;
}

/* Page Functionality */
const targetElementAndReplace = (selector, newHTML) => { 
	const div = document.createElement('div'); 
	div.innerHTML = newHTML;
	const newEl = div.firstElementChild; 
    const oldEl = document.querySelector(selector);
    oldEl.parentElement.replaceChild(newEl, oldEl);
}

const requeryRedraw = async (postId) => {
    const endpoint = `${rootURL}/api/posts/${postId}`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json(); 
    const htmlString = postToHTML(data);
    targetElementAndReplace(`#post_${postId}`, htmlString);
}

window.postLike = async (post) => {
    const endpoint = `${rootURL}/api/posts/likes/`;
    const postData = {
        'post_id': post.id
    };
    const repsonse = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    })
    const data = await repsonse.json();
    requeryRedraw(post.id);
}

window.deleteLike = async (post) => {
    const endpoint = `${rootURL}/api/posts/likes/${post.current_user_like_id}`;
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    const data = await response.json();
    requeryRedraw(post.id);
}

const initPage = async () => {
    // first log in (we will build on this after Spring Break):
    token = await getAccessToken(rootURL, 'mason', 'mason_password');

    // then use the access token provided to access data on the user's behalf
    showProfile();
    showSuggested();
    showStories();
    showPosts();
}
initPage();