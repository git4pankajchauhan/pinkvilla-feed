let page = 1;
const loader = document.querySelector('.loading');
document.addEventListener('DOMContentLoaded', () => {
  let options = {
    root: null,
    rootMargins: '100px',
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector('.footer-section'));
  // getData();
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    getData();
  }
}
function getData() {
  console.log(page);
  loader.classList.add('show');
  const container = document.getElementById('feed-container');
  fetch(`http://localhost/api/pinkvilla-feed.php?page=${page}`)
    .then(response => response.json())
    .then(data => {
      data.nodes.forEach(item => {
        const feedElement = document.createElement('a');
        feedElement.classList.add('feed-box');
        feedElement.setAttribute('href', `http://www.pinkvilla.com${item.node.path}`);
        feedElement.innerHTML = `
            <img class="feed-img" src="http://www.pinkvilla.com${item.node.field_photo_image_section}">
            <p class="feed-title">${item.node.title}</p> `;
        container.appendChild(feedElement);
      });
      page++;
      loader.classList.remove('show');
    })
    .catch(err => console.log(err));
}
