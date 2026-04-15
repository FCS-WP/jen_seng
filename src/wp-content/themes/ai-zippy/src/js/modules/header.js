/**
 * Sticky header — adds shadow on scroll.
 */
export function initHeader() {
  const header = document.querySelector("header.wp-block-group");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    },
    { passive: true },
  );

  // Search toggle
  const searchToggle = document.querySelector(".search-toggle");
  const searchContainer = document.querySelector(".nav-search");
  if (searchToggle && searchContainer) {
    searchToggle.addEventListener("click", (e) => {
      e.preventDefault();
      searchContainer.classList.toggle("is-expanded");
      if (searchContainer.classList.contains("is-expanded")) {
        const input = searchContainer.querySelector("input");
        if (input) input.focus();
      }
    });

    // Close on escape
    searchContainer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchContainer.classList.remove("is-expanded");
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (
        !searchContainer.contains(e.target) &&
        searchContainer.classList.contains("is-expanded")
      ) {
        searchContainer.classList.remove("is-expanded");
      }
    });
  }
}
