const restaurants = [
    {
      id: "3r4dxgOOTT9WoDFIcQqpuw",
      name: "Chai Pani",
      rating: 4.5,
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/xpIkrx1ckMPxq7UldDlLiA/o.jpg",
      display_address: "22 Battery Park Ave, Asheville, NC 28801",
      coordinates: { latitude: 35.59502149158883, longitude: -82.55538902965102 },
      price: "$$",
      review_count: 1307,
    },
    {
      id: "vmVF288LsqgoUAoJBB2HPA",
      name: "Andaaz",
      rating: 4.5,
      image_url:
        "https://s3-media4.fl.yelpcdn.com/bphoto/X7J0o0AD4KK5PzWxHC5Z9A/o.jpg",
      display_address: "28 Hendersonville Rd, Asheville, NC 28803",
      coordinates: { latitude: 35.56760292615069, longitude: -82.54376531397362 },
      price: "$$",
      review_count: 141,
    },
    {
      id: "wh7RfqLMvS3FjEdWwlc96A",
      name: "Mehfil",
      rating: 5,
      image_url:
        "https://s3-media4.fl.yelpcdn.com/bphoto/UrdnUS24yfUJNkuyvew_OQ/o.jpg",
      display_address: "5 Biltmore Ave, Ste B, Asheville, NC 28801",
      coordinates: { latitude: 35.59443, longitude: -82.55169 },
      review_count: 64,
    },
    {
      id: "mLZPe0LyAdEEdzveygaJlg",
      name: "Cinnamon Kitchen",
      rating: 4,
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/0Jopjm4F2sr1N4uX3kd2JA/o.jpg",
      display_address: "1838 Hendersonville Rd, Ste 103, Asheville, NC 28803",
      coordinates: { latitude: 35.50349, longitude: -82.52367 },
      price: "$$",
      review_count: 184,
    },
    {
      id: "nXdNFbWmik_4bS41cYpbuw",
      name: "Mela Indian Restaurant",
      rating: 4,
      image_url:
        "https://s3-media1.fl.yelpcdn.com/bphoto/UVEzWscT0r8WV9ct2pfV7w/o.jpg",
      display_address: "70 N Lexington Ave, Asheville, NC 28801",
      coordinates: { latitude: 35.5972579, longitude: -82.553156 },
      price: "$$",
      review_count: 543,
    },
    {
      id: "I-kWeE8taxv32dv9b0Z98Q",
      name: "Dilbar",
      rating: 4.5,
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/rpysTTKR-a2Au3KrLHi7xg/o.jpg",
      display_address: "5 Biltmore Ave, Ste A, Asheville, NC 28801",
      coordinates: { latitude: 35.59443, longitude: -82.55169 },
      review_count: 27,
    },
    {
      id: "DPenp_1I9Z8vYGlgENjVYQ",
      name: "Blue Dream Curry House",
      rating: 4.5,
      image_url:
        "https://s3-media1.fl.yelpcdn.com/bphoto/uvYh1J9aJqGTlRbUdMuoxQ/o.jpg",
      display_address: "81 Patton Ave, Asheville, NC 28801",
      coordinates: { latitude: 35.594554, longitude: -82.555198 },
      price: "$$",
      review_count: 442,
    },
    {
      id: "_KfXNOLpRamy8DDTkPXTJQ",
      name: "Biryani Express",
      rating: 4,
      image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/AQ9y92nMXfy4u6OUSjSELQ/o.jpg",
      display_address: "129 Bleachery Blvd, Asheville, NC 28805",
      coordinates: { latitude: 35.575398, longitude: -82.515188 },
      review_count: 47,
    },
  ];
  
  
// Your code here. 
// Assume that you don't know in advance how many items 
// will be in the array. In other words, your code should
// generalize to any array of restaurant objects.

/*for (let restaurant of restaurants) {
  restaurant.index = restaurants.indexOf(restaurant);
}*/

const numOfRestaurants = restaurants.length;
const results = document.querySelector('#results');
results.innerHTML = `<p>Showing 0 of ${numOfRestaurants}</p>
<p>${restaurants[0].name}</p>
<p>${restaurants[0].display_address}</p>
<img src="${restaurants[0].image_url}" alt="restaurant's image">`;

let currentResult = 0;
let lastResult = restaurants.length - 1;
const prevResult = () => {
  currentResult = (currentResult == 0) ? lastResult : currentResult - 1;
  results.innerHTML = `<p>Showing ${currentResult} of ${numOfRestaurants}</p>
  <p>${restaurants[currentResult].name}</p>
  <p>${restaurants[currentResult].display_address}</p>
  <img src="${restaurants[currentResult].image_url}" alt="restaurant's image">`;
}
const nextResult = () => {
  console.log(currentResult);
  currentResult = (currentResult == lastResult) ? 0 : currentResult + 1;
  console.log(currentResult);
  results.innerHTML = `<p>Showing ${currentResult} of ${numOfRestaurants}</p>
  <p>${restaurants[currentResult].name}</p>
  <p>${restaurants[currentResult].display_address}</p>
  <img src="${restaurants[currentResult].image_url}" alt="restaurant's image">`;
  console.log((currentResult + 1));
}
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
prev.addEventListener('click', prevResult);
next.addEventListener('click', nextResult);

const cardFont = document.querySelectorAll('#results > p');
const toRegFont = () => {
  cardFont.forEach(font => {
    font.className = 'reg-font';
  })
}
const toLarFont = () => {
  cardFont.forEach(font => {
    font.className = 'lar-font';
  })
}
const regFont = document.querySelector('#reg');
const larFont = document.querySelector('#lar');
regFont.addEventListener('click', toRegFont);
larFont.addEventListener('click', toLarFont);

const body = document.querySelector('body');
const controlsContainer = document.querySelector('.controls-container');
const springDesign = () => {
  body.style.backgroundColor = 'lightgreen';
  body.style.fontFamily = 'Arial'
  controlsContainer.style.backgroundColor = 'green';
}
const summerDesign = () => {
  body.style.backgroundColor = 'lightyellow';
  body.style.fontFamily = 'Courier New'
  controlsContainer.style.backgroundColor = 'orange';
}
const spring = document.querySelector('#spring');
const summer = document.querySelector('#summer');
spring.addEventListener('click', springDesign);
summer.addEventListener('click', summerDesign);



