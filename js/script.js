function renderCards(reviews) {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = reviews.map(review => {
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
  }).join('');
}

async function fetchAndRenderReviews() {
  try {
    const response = await fetch('data/reviews.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reviews = await response.json();
    renderCards(reviews);
  } catch (error) {
    console.error('Error fetching data/reviews.json:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderReviews);
