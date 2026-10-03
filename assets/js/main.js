/* Zink – tiny progressive enhancement: mobile menu, dialog lightbox, map facade. No cookies, no tracking. */
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("mainnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menü öffnen");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menü öffnen");
        toggle.focus();
      }
    });
  }

  // Gallery lightbox via native <dialog>
  var dialog = document.getElementById("lightbox");
  if (dialog && dialog.showModal) {
    var img = dialog.querySelector("img");
    var cap = dialog.querySelector(".lightbox-cap");
    document.querySelectorAll(".gallery figure").forEach(function (fig) {
      fig.addEventListener("click", function () {
        var full = fig.querySelector("img");
        if (!full) return;
        img.src = full.src;
        img.alt = full.alt;
        if (cap) cap.textContent = full.alt || "";
        dialog.showModal();
      });
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fig.click(); }
      });
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  // Map facade: only load OpenStreetMap embed after explicit consent click
  // Center: Bahnhofstraße 10, 04523 Pegau (lat 51.166, lon 12.246)
  document.querySelectorAll("[data-map-load]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var host = document.getElementById("map-host");
      if (!host) return;
      var lat = "51.166", lon = "12.246";
      var frame = document.createElement("iframe");
      frame.title = "Karte: Bahnhofstraße 10, 04523 Pegau";
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer";
      frame.className = "map-frame";
      frame.src = "https://www.openstreetmap.org/export/embed.html?bbox=12.231%2C51.158%2C12.261%2C51.174" +
        "&layer=mapnik&marker=" + lat + "%2C" + lon;
      var links = document.createElement("p");
      links.className = "map-links";
      links.innerHTML = '<a href="https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lon +
        '#map=16/' + lat + '/' + lon + '" rel="noopener">In OpenStreetMap öffnen →</a><br>' +
        '<a href="https://www.openstreetmap.org/directions?to=' + lat + '%2C' + lon +
        '" rel="noopener">Route planen →</a>';
      host.replaceChildren(frame, links);
    });
  });
})();
