// Fallback data if live API can't be reached
const MOCK_UNIVERSITIES = [
  {
    name: "University of Kigali",
    country: "Rwanda",
    web_pages: ["https://www.uok.ac.rw"],
    "state-province": null,
    domains: ["uok.ac.rw"],
  },
  {
    name: "University of Rwanda",
    country: "Rwanda",
    web_pages: ["https://ur.ac.rw"],
    "state-province": null,
    domains: ["ur.ac.rw"],
  },
  {
    name: "African Leadership University",
    country: "Rwanda",
    web_pages: ["https://www.alueducation.com"],
    "state-province": "Kigali",
    domains: ["alueducation.com"],
  },
];

// ---------- STATE ----------
let universities = [];
let currentSortDirection = "asc"; // or "desc"

// ---------- DOM HELPERS ----------
function $(selector) {
  return document.querySelector(selector);
}

function showMessage(text, type = "info") {
  const messageBox = $("#statusMessage");
  if (!messageBox) return;

  messageBox.textContent = text;
  messageBox.className = ""; // reset
  messageBox.classList.add("status-message", `status-${type}`);
}

function renderUniversities(list) {
  const tbody = $("#universitiesTableBody");
  const resultCount = $("#resultCount");

  if (!tbody) return;

  tbody.innerHTML = "";

  if (!list || list.length === 0) {
    if (resultCount) resultCount.textContent = "No universities found.";
    return;
  }

  list.forEach((uni, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${uni.name}</td>
      <td>${uni.country}</td>
      <td>${uni["state-province"] || "—"}</td>
      <td>${uni.domains ? uni.domains.join(", ") : "—"}</td>
      <td>
        ${
          uni.web_pages && uni.web_pages[0]
            ? `<a href="${uni.web_pages[0]}" target="_blank" rel="noopener noreferrer">Visit site</a>`
            : "—"
        }
      </td>
    `;

    tbody.appendChild(tr);
  });

  if (resultCount) {
    resultCount.textContent = `${list.length} universit${
      list.length === 1 ? "y" : "ies"
    } found.`;
  }
}

// ---------- FILTER + SORT ----------
function applyClientFilters() {
  const filterInput = $("#filterKeyword");
  const filterText = filterInput ? filterInput.value.trim().toLowerCase() : "";

  let filtered = [...universities];

  if (filterText) {
    filtered = filtered.filter(
      (uni) =>
        uni.name.toLowerCase().includes(filterText) ||
        (uni.country && uni.country.toLowerCase().includes(filterText))
    );
  }

  // Sort by name
  filtered.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return currentSortDirection === "asc" ? -1 : 1;
    if (nameA > nameB) return currentSortDirection === "asc" ? 1 : -1;
    return 0;
  });

  renderUniversities(filtered);
}

// ---------- FETCH FROM API ----------
async function fetchUniversities(country, name) {
  const endpoint = new URL("https://universities.hipolabs.com/search");

  if (country) endpoint.searchParams.append("country", country);
  if (name) endpoint.searchParams.append("name", name);

  try {
    showMessage("Loading universities...", "info");

    const response = await fetch(endpoint.toString());

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      universities = [];
      renderUniversities([]);
      showMessage(
        "No universities found. Try a different country or keyword.",
        "warning"
      );
      return;
    }

    // ✅ Live API worked
    universities = data;
    currentSortDirection = "asc";
    applyClientFilters();
    showMessage("Results loaded successfully 🎓", "success");
  } catch (error) {
    console.error(error);

    // ✅ Fallback: use mock data if live API can't be reached
    universities = MOCK_UNIVERSITIES;
    currentSortDirection = "asc";
    applyClientFilters();
    showMessage(
      "Could not reach the live universities API. Showing example universities instead.",
      "warning"
    );
  }
}

// ---------- EVENT LISTENERS ----------
function initUniversitySearch() {
  const form = $("#universitySearchForm");
  const sortBtn = $("#sortByNameBtn");
  const filterInput = $("#filterKeyword");

  if (!form) return; // section not on this page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const countryInput = $("#countryInput");
    const nameInput = $("#nameInput");

    const country = countryInput ? countryInput.value.trim() : "";
    const name = nameInput ? nameInput.value.trim() : "";

    if (!country && !name) {
      showMessage(
        "Please enter at least a country or a keyword.",
        "warning"
      );
      return;
    }

    fetchUniversities(country, name);
  });

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
      sortBtn.textContent =
        currentSortDirection === "asc"
          ? "Sort by name (A → Z)"
          : "Sort by name (Z → A)";
      applyClientFilters();
    });
  }

  if (filterInput) {
    filterInput.addEventListener("input", () => {
      applyClientFilters();
    });
  }
}

// ---------- GOOGLE TRANSLATE INITIALIZER ----------
function googleTranslateElementInit() {
  if (!window.google || !window.google.translate) return;

  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}

// ---------- DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  initUniversitySearch();
});
