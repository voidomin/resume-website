/**
 * Blog Logic
 * Fetches blog.json and renders posts to the grid
 */

export async function initBlog() {
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  try {
    const response = await fetch("./blog.json");
    if (!response.ok) throw new Error("Failed to load blog posts");

    const posts = await response.json();
    renderPosts(posts, grid);
  } catch (error) {
    console.error("Blog error:", error);
    grid.innerHTML = `<p class="error-message">Unable to load posts at this time. Please try again later.</p>`;
  }
}

function renderPosts(posts, container) {
  // Clear loading state
  container.innerHTML = "";

  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "blog-card";

    // Format date
    const date = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const tagsHtml = post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

    card.innerHTML = `
      <div class="card-content">
        <div class="card-meta">
          <time datetime="${post.date}">${date}</time>
          <div class="tags">${tagsHtml}</div>
        </div>
        <h2 class="card-title">
          <a href="${post.url}">${post.title}</a>
        </h2>
        <p class="card-summary">${post.summary}</p>
        <a href="${post.url}" class="read-more" aria-label="Read ${post.title}">
          Read Article <span aria-hidden="true">→</span>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}
