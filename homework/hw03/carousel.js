const data = [
  {
    image_url: "https://picsum.photos/450/300?n=1",
    caption: "Photo 1",
  },
  {
    image_url: "https://picsum.photos/450/300?n=2",
    caption: "Photo 2",
  },
  {
    image_url: "https://picsum.photos/450/300?n=3",
    caption: "Photo 3",
  },
  {
    image_url: "https://picsum.photos/450/300?n=4",
    caption: "Photo 4",
  },
  {
    image_url: "https://picsum.photos/450/300?n=5",
    caption: "Photo 5",
  },
  {
    image_url: "https://picsum.photos/450/300?n=6",
    caption: "Photo 6",
  },
  {
    image_url: "https://picsum.photos/450/300?n=7",
    caption: "Photo 7",
  },
  {
    image_url: "https://picsum.photos/450/300?n=8",
    caption: "Photo 8",
  },
  {
    image_url: "https://picsum.photos/450/300?n=9",
    caption: "Photo 9",
  },
  {
    image_url: "https://picsum.photos/450/300?n=10",
    caption: "Photo 10",
  }
];

/*Two Questions:
  1. How do I get the width of the images so I can position the inner-carousel left position correctly?
  2. How do I change the current slide's aria-hidden="false" and the previous slide's aria-hidden="true"?
*/

const loadSlides = (photoList) => {
  for(photo of photoList) {
    const html = `
        <section class="slide" id = "slide${photoList.indexOf(photo) + 1}" role="group" aria-label="Slide ${photoList.indexOf(photo) + 1} of ${photoList.length}" aria-hidden="true">
          <img src="${photo.image_url}" alt="${photo.caption}">
          <p>${photo.caption}</p>
        </section>`;
    document.querySelector('.carousel-inner').insertAdjacentHTML("beforeend", html);
  };
};
loadSlides(data);

const slides = document.querySelectorAll('.slide');

let slideNumber = 1;
document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "false");
let currentLeft = 0;
const slider = document.querySelector('.carousel-inner');
const next = () => {
  if(slideNumber == data.length) {
    slider.style.left = '0px';
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "true");
    slideNumber = 1;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "false");
    currentLeft = 0;
  } else {
    currentLeft = currentLeft - 55;
    slider.style.left = `${currentLeft}vw`;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "true");
    slideNumber = slideNumber + 1;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "false");
  }
};
document.querySelector('.forward').addEventListener('click', next);

const prev = () => {
  if(slideNumber == 1) {
    currentLeft = (data.length - 1) * -55;
    slider.style.left = `${currentLeft}vw`;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "true");
    slideNumber = data.length;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "false");
  } else {
    currentLeft = currentLeft + 55;
    slider.style.left = `${currentLeft}vw`;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "true");
    slideNumber = slideNumber - 1;
    document.querySelector(`#slide${slideNumber}`).setAttribute("aria-hidden", "false");
  }
};
document.querySelector('.back').addEventListener('click', prev);

