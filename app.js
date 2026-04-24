const courses = [
  {
    file: "module-1-communiquer-avec-les-autres.md",
    title: "Communiquer avec les autres",
    summary: "Clignotants, feux stop, avertisseurs et communication claire avec les autres usagers."
  },
  {
    file: "module-2-evaluer-son-etat-physique-et-psychologique.md",
    title: "Evaluer son etat physique et psychologique",
    summary: "Auto-evaluation avant de conduire, stress, fatigue mentale et aptitude a prendre le volant."
  },
  {
    file: "module-3-alcool-drogue-medicaments.md",
    title: "L'alcool, la drogue et les medicaments",
    summary: "Effets sur la conduite, seuils a retenir et sanctions essentielles."
  },
  {
    file: "module-4-fatigue-et-vigilance.md",
    title: "La fatigue et la vigilance",
    summary: "Micro-sommeil, signes d'alerte, pauses et prevention pendant le trajet."
  },
  {
    file: "module-5-la-vue-et-l-ouie.md",
    title: "La vue et l'ouie",
    summary: "Perception visuelle, champ de vision, angle mort et role de l'ouie."
  },
  {
    file: "module-6-les-distances.md",
    title: "Les distances",
    summary: "Distance de reaction, distance de freinage, distance d'arret et distance de securite."
  },
  {
    file: "module-7-les-risques-et-les-dangers-potentiels.md",
    title: "Les risques et les dangers potentiels",
    summary: "Lecture anticipee de la route, zones a risque et bons reflexes."
  }
];

const listEl = document.getElementById("course-list");
const titleEl = document.getElementById("course-title");
const contentEl = document.getElementById("course-content");

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseInline(text) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const safeAlt = escapeHtml(alt);
      const safeSrc = escapeHtml(src);
      return `<figure><img src="${safeSrc}" alt="${safeAlt}"><figcaption class="image-caption">${safeAlt}</figcaption></figure>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const html = [];
  let inList = false;
  let listType = "ul";
  let inBlockquote = false;

  const closeList = () => {
    if (inList) {
      html.push(`</${listType}>`);
      inList = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push("</blockquote>");
      inBlockquote = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      closeBlockquote();
      continue;
    }

    if (line === "###") {
      closeList();
      closeBlockquote();
      html.push("<hr>");
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      if (!inBlockquote) {
        html.push("<blockquote>");
        inBlockquote = true;
      }
      html.push(`<p>${parseInline(line.slice(2))}</p>`);
      continue;
    }

    closeBlockquote();

    if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1>${parseInline(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${parseInline(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3>${parseInline(line.slice(4))}</h3>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const item = line.replace(/^\d+\.\s+/, "");
      if (!inList || listType !== "ol") {
        closeList();
        inList = true;
        listType = "ol";
        html.push("<ol>");
      }
      html.push(`<li>${parseInline(item)}</li>`);
      continue;
    }

    if (line.startsWith("- ")) {
      const item = line.slice(2);
      if (!inList || listType !== "ul") {
        closeList();
        inList = true;
        listType = "ul";
        html.push("<ul>");
      }
      html.push(`<li>${parseInline(item)}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${parseInline(line)}</p>`);
  }

  closeList();
  closeBlockquote();

  return html.join("\n");
}

function setActiveButton(file) {
  document.querySelectorAll(".course-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.file === file);
  });
}

async function loadCourse(course) {
  setActiveButton(course.file);
  titleEl.textContent = course.title;
  contentEl.innerHTML = '<div class="loading">Chargement du module...</div>';

  try {
    const response = await fetch(course.file);
    if (!response.ok) {
      throw new Error(`Impossible de charger ${course.file}`);
    }

    const markdown = await response.text();
    contentEl.innerHTML = renderMarkdown(markdown);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    contentEl.innerHTML = `<div class="error">Erreur de chargement du module : ${escapeHtml(error.message)}</div>`;
  }
}

function renderCourseList() {
  listEl.innerHTML = "";

  courses.forEach((course) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "course-link";
    button.dataset.file = course.file;
    button.innerHTML = `<strong>${course.title}</strong><span>${course.summary}</span>`;
    button.addEventListener("click", () => loadCourse(course));
    listEl.appendChild(button);
  });
}

renderCourseList();
loadCourse(courses[0]);
