<template>
  <nav class="seo-hub" aria-label="Patio cover resources and local pages">
    <h2 class="seo-hub__title">Patio Cover Guides, Service Areas &amp; Cover Types</h2>
    <p class="seo-hub__lead">
      Design &amp; price your cover online, then book a free measurement — whether you are in
      Vancouver, a nearby city, or just researching cost and options.
    </p>
    <div class="seo-hub__groups">
      <details
        v-for="group in groups"
        :key="group.id"
        class="seo-hub__group"
        name="seo-hub-group"
      >
        <summary class="seo-hub__summary">
          <span class="seo-hub__group-title">{{ group.title }}</span>
          <span class="seo-hub__meta">
            <span class="seo-hub__count">{{ group.links.length }} pages</span>
            <svg
              class="seo-hub__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </summary>
        <ul class="seo-hub__list">
          <li
            v-for="link in group.links"
            :key="link.path"
            class="seo-hub__item"
          >
            <router-link
              :to="link.path"
              class="seo-hub__link"
            >{{ link.label }}</router-link>
          </li>
        </ul>
      </details>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SeoLinkHub',
  props: {
    /** Array of { id, title, links: [{ path, label }] } — every link stays in the DOM. */
    groups: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
.seo-hub {
  margin-top: 8px;
}

.seo-hub__title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.seo-hub__lead {
  margin: 0 0 26px;
  color: #475569;
  font-size: 1rem;
  line-height: 1.65;
  max-width: 68ch;
}

.seo-hub__groups {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.seo-hub__group {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.seo-hub__group:hover {
  border-color: #cbd5e1;
}

.seo-hub__group[open] {
  border-color: #d97706;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
}

.seo-hub__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  cursor: pointer;
  user-select: none;
}

.seo-hub__summary::-webkit-details-marker {
  display: none;
}

.seo-hub__summary::marker {
  content: '';
}

.seo-hub__group-title {
  font-weight: 700;
  font-size: 1.02rem;
  color: #0f172a;
}

.seo-hub__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.seo-hub__count {
  font-size: 0.8rem;
  font-weight: 700;
  color: #d97706;
  background: #fef3e2;
  border: 1px solid #fde3b8;
  padding: 4px 12px;
  border-radius: 999px;
  white-space: nowrap;
}

.seo-hub__chevron {
  width: 20px;
  height: 20px;
  color: #94a3b8;
  transition: transform 0.2s ease;
}

.seo-hub__group[open] .seo-hub__chevron {
  transform: rotate(180deg);
  color: #d97706;
}

.seo-hub__list {
  list-style: none;
  margin: 0;
  padding: 4px 22px 22px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2px 28px;
}

.seo-hub__item {
  border-bottom: 1px solid #f1f5f9;
}

.seo-hub__link {
  display: block;
  padding: 9px 2px;
  color: #334155;
  font-size: 0.93rem;
  text-decoration: none;
  transition: color 0.12s ease, padding-left 0.12s ease;
}

.seo-hub__link:hover {
  color: #b45309;
  padding-left: 6px;
}

@media (max-width: 640px) {
  .seo-hub__list {
    grid-template-columns: 1fr 1fr;
    gap: 2px 16px;
    padding: 4px 18px 18px;
  }

  .seo-hub__summary {
    padding: 15px 18px;
  }

  .seo-hub__count {
    display: none;
  }
}
</style>
