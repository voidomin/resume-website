const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const BLOG_DIR = path.join(__dirname, "../public/blog");
const POSTS_DIR = path.join(BLOG_DIR, "posts");
const DATA_FILE = path.join(BLOG_DIR, "blog.json");

const template = (title, date, summary, tags) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Akash's Blog</title>
    <meta name="description" content="${summary}">
    <link rel="stylesheet" href="../../assets/css/blog.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fira+Code&display=swap" rel="stylesheet">
</head>
<body class="blog-post-page">
    <nav class="blog-nav">
        <div class="nav-content">
            <a href="../index.html" class="nav-logo">← Back to Garden</a>
        </div>
    </nav>

    <main class="post-container">
        <article class="post-content">
            <header class="post-header">
                <div class="post-meta">
                    <span class="post-date">${date}</span>
                    <div class="post-tags">
                        ${tags.map((t) => `<span class="tag">${t}</span>`).join("\n                        ")}
                    </div>
                </div>
                <h1>${title}</h1>
            </header>

            <div class="post-body">
                <p class="lead">${summary}</p>
                
                <h2>Introduction</h2>
                <p>Write your content here...</p>

                <div class="code-block">
                    <pre><code class="language-javascript">// Example code
console.log("Hello World");</code></pre>
                </div>
            </div>
        </article>
    </main>
</body>
</html>`;

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("📝 New Blog Post Generator\n");

  const title = await ask("Blog Title: ");
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const summary = await ask("Summary: ");
  const tagsInput = await ask("Tags (comma separated): ");

  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t);
  const date = new Date().toISOString().split("T")[0];
  const fileName = `${id}.html`;
  const filePath = path.join(POSTS_DIR, fileName);

  // 1. Create HTML file
  fs.writeFileSync(filePath, template(title, date, summary, tags));
  console.log(`\n✅ Created ${filePath}`);

  // 2. Update blog.json
  const blogData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const newPost = {
    id: id,
    title: title,
    date: date,
    summary: summary,
    tags: tags,
    url: `./posts/${fileName}`,
  };

  blogData.unshift(newPost); // Add to beginning
  fs.writeFileSync(DATA_FILE, JSON.stringify(blogData, null, 2));
  console.log(`✅ Updated ${DATA_FILE}`);

  rl.close();
}

main().catch(console.error);
