const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const imageAlts = {
  'pic1.jpg': 'Alternative text for pic1',
  'pic2.jpg': 'Alternative text for pic2',
  'pic3.jpg': 'Alternative text for pic3',
  'pic4.jpg': 'Alternative text for pic4',
  'pic5.jpg': 'Alternative text for pic5',
};

imageFilenames.forEach((filename) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${filename}`);
  newImage.setAttribute('alt', imageAlts[filename]);
  thumbBar.appendChild(newImage);
});

thumbBar.addEventListener('click', (event) => {
  if (event.target && event.target.nodeName === 'IMG') {
    displayedImage.src = event.target.src;
    displayedImage.alt = event.target.alt;
  }
});

btn.addEventListener('click', () => {
  const className = btn.getAttribute('class');
  if (className === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});
