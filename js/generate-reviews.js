// generate-reviews.js
const fs = require('fs');

const rawData = fs.readFileSync('./data/reviews.json', 'utf8');
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

console.log(htmlCards);
