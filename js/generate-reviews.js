const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'data', 'reviews.json');
const htmlPath = path.join(__dirname, '..', 'reviews.html');

const rawData = fs.readFileSync(jsonPath, 'utf8');
const reviews = JSON.parse(rawData);

const htmlCards = reviews.map(review => {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const sourceClass = review.source.toLowerCase();

  const ownerResponseHtml = review.ownerResponse ? `
      <div class="owner-response">
        <strong>Response from ${review.ownerResponse.responder}:</strong>
        "${review.ownerResponse.responseText}"
      </div>
  ` : '';

  return `
    <article class="review-card-text">
      <div>
        <div class="review-header">
          <div class="author-info">
            <div class="avatar">${review.author.avatar}</div>
            <div class="author-details">
              <h3>${review.author.name}</h3>
              <div class="review-stars">${stars}</div>
            </div>
          </div>
          <span class="source-badge ${sourceClass}">${review.source}</span>
        </div>
        <p class="review-body">
          "${review.reviewText}"
        </p>
      </div>
      ${ownerResponseHtml}
    </article>
  `;
}).join('\n');

let pageHtml = fs.readFileSync(htmlPath, 'utf8');

// Flexible match targeting id="reviews-container" inside <main>
const containerRegex = /(<main[\s\S]*?id="reviews-container"[\s\S]*?>)([\s\S]*?)(<\/main>)/i;

if (containerRegex.test(pageHtml)) {
  pageHtml = pageHtml.replace(containerRegex, `$1\n${htmlCards}\n$3`);
  fs.writeFileSync(htmlPath, pageHtml, 'utf8');
  console.log('Successfully injected pre-rendered review cards into reviews.html!');
} else {
  console.error('ERROR: Could not find id="reviews-container" inside <main> in reviews.html');
  process.exit(1);
}
