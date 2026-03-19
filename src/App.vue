<template>
  <div class="app">
    <!-- Loading screen -->
    <div v-if="!siteLoaded" class="site-loading">
      <div class="site-loading-spinner"></div>
    </div>

    <!-- Full Background -->
    <div
      v-show="siteLoaded"
      class="hero-bg"
      :style="{ backgroundImage: `url(${cfg.heroBackground})` }"
    >
      <div class="hero-overlay"></div>
    </div>

    <!-- Scrollable Content -->
    <div v-show="siteLoaded" class="scroll-container">
      <!-- Section 1: Instant Quote -->
      <section class="section section-hero">
        <div class="content-wrapper glass-panel">
          <div class="header hero-header">
            <div class="hero-text-group">
              <h1 class="title hero-title">{{ s1.title }}</h1>
              <p class="subtitle hero-subtitle">{{ s1.subtitle }}</p>
              <button class="primary-cta">Get My Price</button>
            </div>
          </div>

          <div class="body-section body-section-cards-only">
            <div class="services-section">
              <div class="services-grid">
                <div
                  v-for="service in services"
                  :key="service.name"
                  class="service-card"
                  @click="selectService(service)"
                >
                  <div class="card-image">
                    <img :src="service.image" :alt="service.name" />
                    <div class="card-image-overlay"></div>
                  </div>
                  <div class="card-info">
                    <h3>{{ service.name }}</h3>
                    <p
                      v-if="typeof service.examplePrice === 'number'"
                      class="card-price"
                    >
                      From ${{ service.examplePrice.toLocaleString() }}
                    </p>
                    <span class="service-cta-link">Learn more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Trust strip under hero content -->
          <div class="trust-strip">
            <div class="trust-item">
              <span class="trust-label">Serving</span>
              <span class="trust-value">Greater Vancouver</span>
            </div>
            <div class="trust-item">
              <span class="trust-label">Instant</span>
              <span class="trust-value">AI-powered quotes</span>
            </div>
            <div class="trust-item">
              <span class="trust-label">Backed by</span>
              <span class="trust-value">real installation experts</span>
            </div>
          </div>
        </div>

        <!-- Chat moved below hero: Get your quote here -->
        <div class="hero-chat-block">
          <div class="chat-section">
            <div class="chat-container">
              <div class="chat-messages" ref="chatMessages">
                <div class="message bot-message">
                  <div class="bot-avatar-wrap">
                    <div class="bot-avatar" aria-hidden="true">
                      <span class="avatar-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      </span>
                    </div>
                    <span
                      class="bot-avatar-status"
                      role="status"
                      aria-label="Assistant online"
                    ></span>
                  </div>
                  <div class="message-bubble bot-bubble">
                    <p
                      v-for="(line, i) in s1.welcomeMessages"
                      :key="i"
                      v-html="line"
                    ></p>
                  </div>
                </div>

                <!-- Popular Questions (frontend-only accordion) -->
                <div class="faq-accordion" aria-label="Popular Questions">
                  <div class="faq-title">Popular Questions</div>
                  <div
                    v-for="(item, idx) in faqItems"
                    :key="item.q"
                    class="faq-item"
                  >
                    <button
                      type="button"
                      class="faq-question"
                      @click="toggleFaq(idx)"
                      :aria-expanded="faqOpenIndex === idx"
                    >
                      <span class="faq-q-text">{{ item.q }}</span>
                      <span class="faq-icon" aria-hidden="true">
                        {{ faqOpenIndex === idx ? '−' : '+' }}
                      </span>
                    </button>
                    <div
                      v-show="faqOpenIndex === idx"
                      class="faq-answer"
                    >
                      <div class="faq-answer-text">
                        {{ item.a }}
                      </div>
                      <a
                        v-if="item.ctaHref"
                        :href="item.ctaHref"
                        class="faq-cta-link"
                      >
                        {{ item.ctaLabel || 'Book appointment' }}
                      </a>
                    </div>
                  </div>
                </div>

                <div class="why-choose-us-mini" aria-label="Why Choose Us">
                  <div class="why-choose-title">Why Choose Us</div>
                  <div class="why-choose-mini-grid">
                    <div
                      v-for="(item, idx) in whyChooseItems"
                      :key="item.title"
                      class="why-choose-mini-item"
                    >
                      <div class="why-choose-icon" aria-hidden="true">
                        <svg
                          v-if="idx === 0"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        <svg
                          v-else-if="idx === 1"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M12 1v22" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <svg
                          v-else-if="idx === 2"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
                        </svg>
                        <svg
                          v-else
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M22 12h-4l-2 2-4-4-2 2H2" />
                          <path d="M2 19h20" />
                        </svg>
                      </div>
                      <div class="why-choose-mini-text">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="(msg, index) in messages"
                  :key="msg.id || index"
                >
                  <div
                    :class="[
                      'message',
                      msg.type === 'user' ? 'user-message' : 'bot-message',
                    ]"
                  >
                    <div v-if="msg.type === 'bot'" class="bot-avatar-wrap">
                      <div class="bot-avatar" aria-hidden="true">
                        <span class="avatar-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </span>
                      </div>
                      <span
                        class="bot-avatar-status"
                        role="status"
                        aria-label="Assistant online"
                      ></span>
                    </div>
                    <div
                      :class="[
                        'message-bubble',
                        msg.type === 'user' ? 'user-bubble' : 'bot-bubble',
                      ]"
                    >
                      <p v-html="msg.text"></p>
                    </div>
                  </div>

                  <!-- Booking CTA (only for booking-related intents) -->
                  <div
                    v-if="msg.type === 'bot' && msg.showCta"
                    class="chat-cta-card"
                  >
                    <h4 class="chat-cta-title">Confirm Final Quote</h4>
                    <p class="chat-cta-text">
                      Free site measurement available. Final quote confirmed on site.
                    </p>
                    <div class="chat-cta-actions">
                      <button
                        type="button"
                        class="chat-cta-btn primary"
                        @click="handleChatCtaClick()"
                      >
                        Book Free Measurement
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="isTyping" class="message bot-message">
                  <div class="bot-avatar-wrap">
                    <div class="bot-avatar" aria-hidden="true">
                      <span class="avatar-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      </span>
                    </div>
                    <span
                      class="bot-avatar-status"
                      role="status"
                      aria-label="Assistant online"
                    ></span>
                  </div>
                  <div class="message-bubble bot-bubble typing-bubble">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                </div>
              </div>

              <div class="chat-input-wrap">
                <p v-if="s1.inputHelperExample" class="chat-input-helper">Example: {{ s1.inputHelperExample }}</p>
                <div class="chat-input">
                  <input
                    v-model="userInput"
                    type="text"
                    :placeholder="s1.chatPlaceholder || 'Type your project details (city + size)...'"
                    @keyup.enter="sendMessage"
                  />
                  <button class="send-btn" @click="sendMessage">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="white"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Projects & Testimonials -->
      <section class="section section-projects">
        <div class="content-wrapper glass-panel">
          <div class="header">
            <h1 class="title">{{ s2.title }}</h1>
            <p class="subtitle">{{ s2.subtitle }}</p>
          </div>

          <div class="projects-body">
            <!-- Our Recent Projects -->
            <div class="projects-area">
              <h2 class="section-heading">{{ s2.sectionHeading }}</h2>

              <!-- City Tabs -->
              <div class="city-tabs">
                <button
                  v-for="type in projectTypes"
                  :key="type"
                  :class="['city-tab', { active: activeProjectType === type }]"
                  @click="activeProjectType = type"
                >
                  {{ type }}
                </button>
              </div>

              <!-- Project Cards -->
              <div class="project-cards">
                <div
                  v-for="project in filteredProjects"
                  :key="project.name"
                  class="project-card"
                >
                  <div class="project-image">
                    <img :src="project.image" :alt="project.name" />
                  </div>
                  <div class="project-info">
                    <h3>
                      <span class="project-icon">{{ project.icon }}</span>
                      {{ project.name }}
                    </h3>
                    <p v-if="project.city" class="project-city">
                      {{ project.city }}
                    </p>
                    <p class="project-sqft">
                      <span v-if="project.sqft">{{ project.sqft }} sq ft</span>
                      <span
                        v-if="project.isCustom"
                        class="price-value price-value--custom"
                      >
                        Custom build
                      </span>
                      <span
                        v-else-if="typeof project.price === 'number'"
                        class="price-value"
                      >
                        From ${{ project.price.toLocaleString() }}
                      </span>
                    </p>
                    <button
                      type="button"
                      class="project-photos-btn"
                      @click="openProjectPhoto(project)"
                    >
                      View photos
                    </button>
                  </div>
                </div>
              </div>

              <!-- See More Button -->
              <button class="see-more-btn" type="button">
                <span>See more projects & photos</span>
                <span class="see-more-arrow">↗</span>
              </button>
            </div>

            <!-- Why Choose Us -->
            <div class="why-choose-us">
              <h2 class="section-heading">Why Choose Us</h2>
              <div class="features-grid">
                <div
                  v-for="feature in features"
                  :key="feature.text"
                  class="feature-item"
                >
                  <span class="feature-icon">{{ feature.icon }}</span>
                  <span class="feature-text">{{ feature.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Book an Appointment -->
      <section
        class="section section-appointment"
        id="book-measurement"
        ref="appointmentSection"
      >
        <!-- Full-screen background image (same layer as title) -->
        <div class="appt-bg">
          <img :src="cfg.appointmentBackground" alt="" />
          <div class="appt-bg-overlay"></div>
        </div>

        <!-- Title text - positioned top-left over the background -->
        <div class="appt-title-area">
          <h1 class="appt-main-title">{{ s3.title }}</h1>
          <p class="appt-main-subtitle">{{ s3.subtitle }}</p>
        </div>

        <!-- Floating form card -->
        <div class="appt-form-card" :class="{ 'appt-form-card--highlight': appointmentHighlight }">
          <!-- Oil-painting cloud background -->
          <div class="appt-card-bg"></div>

          <div class="appt-card-content">
            <h2 class="appt-form-title">{{ s3.formTitle }}</h2>
            <p class="appt-form-subtitle">{{ s3.formSubtitle }}</p>

            <form class="appt-form" @submit.prevent="submitAppointment">
              <div class="form-field">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                </span>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div class="form-field">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                    />
                  </svg>
                </span>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div class="form-field">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    />
                  </svg>
                </span>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div class="form-field">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    />
                  </svg>
                </span>
                <input
                  v-model="form.city"
                  type="text"
                  placeholder="City (e.g. Vancouver)"
                  required
                />
              </div>

              <div class="form-field form-field-select">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
                    />
                  </svg>
                </span>
                <select v-model="form.project_type" required>
                  <option value="" disabled>Project Type</option>
                  <option>Patio Cover</option>
                  <option>Sunroom</option>
                  <option>Roofing</option>
                  <option>Deck & Fence</option>
                  <option>Other</option>
                </select>
              </div>

              <div class="form-field form-field-select">
                <span class="field-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#7a8ba0"
                  >
                    <path
                      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
                    />
                  </svg>
                </span>
                <select v-model="form.preferred_time" required>
                  <option value="" disabled>Preferred Contact Time</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>

              <div class="form-upload-section">
                <label class="details-label upload-field-label" for="appointment-photos">
                  Upload photos for a more accurate quote (optional)
                </label>
                <p class="upload-field-hint">
                  Image files only (e.g. PNG, JPG). Up to 8 files, 8MB each.
                </p>
                <div class="form-field form-field-upload upload-control">
                  <input
                    id="appointment-photos"
                    ref="appointmentPhotoInput"
                    type="file"
                    accept="image/*"
                    multiple
                    class="upload-input-hidden"
                    aria-describedby="upload-status-text"
                    @change="onAppointmentPhotosChange"
                  />
                  <div class="upload-actions">
                    <button
                      type="button"
                      class="upload-choose-btn"
                      @click="openAppointmentPhotoPicker"
                    >
                      Choose Files
                    </button>
                    <p
                      id="upload-status-text"
                      class="upload-status"
                      aria-live="polite"
                    >
                      {{ appointmentPhotoStatusText }}
                    </p>
                  </div>
                </div>
                <ul
                  v-if="appointmentPhotoPreviews.length"
                  class="photo-preview-list"
                >
                  <li
                    v-for="(p, idx) in appointmentPhotoPreviews"
                    :key="p.key"
                    class="photo-preview-item"
                  >
                    <img
                      class="photo-preview-thumb"
                      :src="p.url"
                      alt=""
                    />
                    <div class="photo-preview-meta">
                      <span class="photo-preview-name">{{ p.name }}</span>
                      <button
                        type="button"
                        class="photo-preview-remove"
                        @click="removeAppointmentPhoto(idx)"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                </ul>
              </div>

              <h3 class="details-label">Project Details (Optional)</h3>
              <div class="form-field form-field-textarea">
                <textarea
                  v-model="form.details"
                  placeholder="Project details or questions"
                  rows="3"
                ></textarea>
              </div>

              <button
                type="submit"
                class="submit-btn"
                :disabled="formSubmitting"
              >
                <span v-if="!formSubmitting">{{ s3.submitText }}</span>
                <span v-else>Sending...</span>
              </button>

              <p v-if="formSuccess" class="form-success-msg">
                Your request has been sent successfully!
              </p>
              <p v-if="formError" class="form-error-msg">{{ formError }}</p>
            </form>

            <!-- Bottom row: benefits left + deco image right -->
            <div class="appt-bottom-row">
              <div class="benefits-list">
                <div
                  v-for="benefit in benefits"
                  :key="benefit"
                  class="benefit-item"
                >
                  <span class="benefit-check">✅</span>
                  <span>{{ benefit }}</span>
                </div>
              </div>
              <div class="appt-deco-image">
                <img :src="cfg.appointmentDecoImage" alt="Patio project" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import siteData from './data/siteData.json';

// Frontend-only intros for hero service cards (no backend / no pricing on first tap).
const SERVICE_CARD_INTRO_BY_NAME = {
  'Glass Patio Covers':
    'Glass patio covers are a premium option with a clean, modern look and strong weather protection. Clear and tinted glass options are both available, and tempered glass is durable, safe, and low maintenance. Enter your city and approximate size whenever you want a rough quote.',
  'Aluminum Patio Covers':
    'Aluminum patio covers are one of the most practical and popular options because they are durable, low maintenance, and cost-effective. They work well for everyday rain and sun protection and are available in different styles and finishes. Enter your city and approximate size whenever you want a rough quote.',
  'Skyline Combo Covers':
    'Skyline combo covers combine strong structure with a more modern open-look design. They are a popular choice for homeowners who want both protection and a cleaner architectural style. Enter your city and approximate size whenever you want a rough quote.',
  Sunrooms:
    'Sunrooms create a brighter, more enclosed space that can be enjoyed through more seasons of the year. They are a great option for homeowners who want extra comfort, weather protection, and a more finished extension of the home. Enter your city and approximate size whenever you want a rough quote.',
};

export default {
  name: 'App',
  data() {
    return {
      siteLoaded: false,
      userInput: '',
      isTyping: false,
      messages: [],
      cfg: {},
      s1: { welcomeMessages: [] },
      s2: { cities: [] },
      s3: {},
      services: [],
      projects: [],
      features: [],
      benefits: [],
      activeCity: '',
      activeProjectType: 'Aluminum',
      projectTypes: ['Aluminum', 'Glass', 'A-Type', 'Skyline', 'Sunroom'],
      faqOpenIndex: null,
      faqItems: [
        {
          q: 'How much does a patio cover cost?',
          a: 'Pricing depends on size, materials, roof type, and site conditions. We can provide a rough estimate first.',
        },
        {
          q: 'How long does installation take?',
          a: 'Installation is typically completed in one day for most standard projects. Larger or more complex projects may require additional time depending on the design and site conditions.',
        },
        {
          q: 'How do I get a final quote?',
          a: 'Book a quick appointment and we’ll review your project details to provide a more accurate estimate.',
          // Page 3: appointment section
          ctaHref: '#book-measurement',
          ctaLabel: 'Get final quote',
        },
        {
          q: 'Is the patio cover safe?',
          a: 'Our patio covers are built with strong, durable materials and installed following proper construction practices. They are designed to be safe, stable, and reliable for everyday use.',
        },
      ],
      whyChooseItems: [
        {
          title: 'Fast Installation',
          text: 'Most standard projects are completed in as little as one day.',
        },
        {
          title: 'Transparent Pricing',
          text: 'Get a quick estimate upfront before committing to anything.',
        },
        {
          title: 'Experienced Team',
          text: 'Years of hands-on experience with patio covers and sunrooms.',
        },
        {
          title: 'Simple Process',
          text: 'From estimate to installation, everything is straightforward and efficient.',
        },
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        city: '',
        project_type: '',
        details: '',
        preferred_time: '',
      },
      formSubmitting: false,
      formSuccess: false,
      formError: '',
      appointmentPhotos: [],
      appointmentPhotoPreviews: [],
      projectInfo: {
        city: '',
        project_type: '',
        size: '',
        material_type: '',
      },
      appointmentHighlight: false,
    };
  },
  computed: {
    filteredProjects() {
      const type = (this.activeProjectType || '').toLowerCase();

      return this.projects.filter((p) => {
        const name = (p.name || '').toLowerCase();
        if (type === 'aluminum') return name.includes('aluminum');
        if (type === 'glass') return name.includes('glass');
        if (type === 'sunroom') return name.includes('sunroom');
         if (type === 'skyline') return name.includes('skyline');
        if (type === 'a-type' || type === 'atype') {
          return name.includes('a-type') || name.includes('atype');
        }
        return true;
      });
    },
    appointmentPhotoStatusText() {
      if (!this.appointmentPhotos.length) {
        return 'No files selected';
      }
      return this.appointmentPhotos.map((f) => f.name).join(', ');
    },
  },
  created() {
    const d = siteData;
    this.cfg = d.site;
    this.s1 = d.section1;
    this.s2 = d.section2;
    this.s3 = d.section3;
    this.services = d.services;
    this.projects = d.projects;
    this.randomizeProjects();
    this.features = d.features;
    this.benefits = d.benefits;
    this.activeCity = d.section2.cities[0];
    this.siteLoaded = true;
  },
  methods: {
    openProjectPhoto(project) {
      if (project && project.image) {
        window.open(project.image, '_blank', 'noopener');
      }
    },
    toggleFaq(idx) {
      this.faqOpenIndex = this.faqOpenIndex === idx ? null : idx;
    },
    generateMessageId() {
      return `m_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    },
    replaceMessageById(messageId, fields) {
      const msg = this.messages.find((m) => m.id === messageId);
      if (!msg) return;
      Object.assign(msg, fields);
    },
    async sendMessage() {
      const text = this.userInput.trim();
      if (!text) return;

      this.updateProjectInfoFromText(text);

      // Push the user's message first, then immediately show a temp assistant reply.
      this.messages.push({
        id: this.generateMessageId(),
        type: 'user',
        text,
      });
      this.userInput = '';
      this.$nextTick(() => this.scrollToBottom());

      const placeholderId = this.generateMessageId();
      this.messages.push({
        id: placeholderId,
        type: 'bot',
        text: 'Got it — calculating your estimate...',
        showCta: false,
        isPlaceholder: true,
      });
      this.$nextTick(() => this.scrollToBottom());

      const siteMeasurementIntent = this.isSiteMeasurementRequest(text);
      const bookingIntent = this.isBookingIntent(text) || siteMeasurementIntent;

      // If user clearly requests on-site measurement, handle intent locally
      if (siteMeasurementIntent) {
        this.handleSiteMeasurementBotReply(placeholderId);
        this.$nextTick(() => this.scrollToBottom());
        return;
      }

      // Pricing guardrail: do not call backend AI for patio cover pricing
      // until the user explicitly confirms material type (aluminum vs glass).
      if (this.shouldAskMaterialTypeForPatioPricing(text)) {
        this.replaceMessageById(placeholderId, {
          type: 'bot',
          text: 'To give you an accurate estimate, is this for an aluminum patio cover or a glass patio cover?',
          showCta: false,
          isPlaceholder: false,
        });
        this.$nextTick(() => this.scrollToBottom());
        return;
      }

      try {
        const res = await fetch(this.cfg.chatApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: text,
            project_type: (this.projectInfo && this.projectInfo.project_type) || '',
            city: (this.projectInfo && this.projectInfo.city) || '',
            email: (this.form && this.form.email) || '',
            phone: (this.form && this.form.phone) || '',
          }),
        });
        const data = await res.json();
        const answer = data.answer || 'Sorry, something went wrong.';
        const isPrice = this.isPriceResponse(answer);

        this.replaceMessageById(placeholderId, {
          type: 'bot',
          text: answer,
          isPrice,
          showCta: bookingIntent,
          isPlaceholder: false,
        });
      } catch {
        this.replaceMessageById(placeholderId, {
          type: 'bot',
          text: 'Unable to connect. Please try again later.',
          showCta: false,
          isPlaceholder: false,
        });
      }

      this.$nextTick(() => this.scrollToBottom());
    },
    selectService(service) {
      const name = (service && service.name) || '';
      if (!name) return;

      this.updateProjectInfoFromText(name);

      this.messages.push({
        id: this.generateMessageId(),
        type: 'user',
        text: name,
      });

      const intro =
        SERVICE_CARD_INTRO_BY_NAME[name] ||
        `${name}: here is a quick overview. Strong weather protection and several style options are available. Enter your city and approximate size whenever you want a rough quote.`;

      this.messages.push({
        id: this.generateMessageId(),
        type: 'bot',
        text: intro,
        showCta: false,
        isPlaceholder: false,
      });

      this.userInput = '';
      this.$nextTick(() => this.scrollToBottom());
    },
    scrollToBottom() {
      const el = this.$refs.chatMessages;
      if (el) el.scrollTop = el.scrollHeight;
    },
    isBookingIntent(text) {
      if (!text) return false;
      const lower = text.toLowerCase();

      const phrases = [
        'how to book',
        'how do i book',
        'how can i book',
        'book free measurement',
        'book measurement',
        'book an appointment',
        'book appointment',
        'want to book',
        'next step',
        'what next',
        'what is next',
        'schedule a visit',
        'schedule visit',
        'schedule measurement',
        'make an appointment',
        'set up an appointment',
        'appointment',
      ];

      return phrases.some((p) => lower.includes(p));
    },
    isSiteMeasurementRequest(text) {
      if (!text) return false;
      const lower = text.toLowerCase();

      const phrases = [
        "don't know the size",
        "dont know the size",
        "don't know size",
        'dont know size',
        "no idea the size",
        'no idea size',
        'can someone come measure',
        'can someone come and measure',
        'can someone come to my address',
        'can you come measure',
        'can you come and measure',
        'can you come check',
        'come measure',
        'come and measure',
        'come do the measurement',
        'need on-site measurement',
        'need onsite measurement',
        'on site measurement',
        'on-site measurement',
        'i need someone to measure',
        'someone to measure',
        'book measurement',
        'book a measurement',
        'free measurement',
        'site measurement',
      ];

      return phrases.some((p) => lower.includes(p));
    },
    isPriceResponse(text) {
      if (!text) return false;
      const lower = text.toLowerCase();
      return (
        text.includes('$') ||
        lower.includes('cad') ||
        lower.includes('gst') ||
        lower.includes('sqft') ||
        lower.includes('sq ft') ||
        lower.includes('sf')
      );
    },
    shouldAskMaterialTypeForPatioPricing(text) {
      if (!text) return false;
      const lower = text.toLowerCase();

      // Only enforce for patio cover pricing requests.
      const isPatioPricingRequest =
        (this.projectInfo.project_type === 'Patio Cover' ||
          lower.includes('patio cover')) &&
        (lower.includes('how much') ||
          lower.includes('price') ||
          lower.includes('cost') ||
          lower.includes('estimate') ||
          lower.includes('quote'));

      // Material not confirmed in the text => don't call backend AI yet.
      const materialConfirmed = !!this.projectInfo.material_type;

      return isPatioPricingRequest && !materialConfirmed;
    },
    updateProjectInfoFromText(text) {
      if (!text) return;
      const lower = text.toLowerCase();

      if (lower.includes('patio cover')) {
        this.projectInfo.project_type = 'Patio Cover';
      } else if (lower.includes('sunroom')) {
        this.projectInfo.project_type = 'Sunroom';
      }

      if (lower.includes('glass')) {
        this.projectInfo.material_type = 'Glass';
      } else if (lower.includes('aluminum') || lower.includes('aluminium')) {
        this.projectInfo.material_type = 'Aluminum';
      }

      const cities = [
        'Vancouver',
        'Richmond',
        'Burnaby',
        'Surrey',
        'Delta',
        'Langley',
        'Coquitlam',
        'New Westminster',
        'North Vancouver',
        'West Vancouver',
      ];
      for (const city of cities) {
        if (lower.includes(city.toLowerCase())) {
          this.projectInfo.city = city;
          break;
        }
      }

      const sizeSqftMatch =
        text.match(/(\d+(?:\.\d+)?)\s*(sqft|sq ft|sf)\b/i);
      if (sizeSqftMatch) {
        const value = sizeSqftMatch[1];
        const unit = 'sqft';
        this.projectInfo.size = `${value} ${unit}`;
      } else {
        const sizeDimMatch = text.match(
          /(\d+(?:\.\d+)?)\s*[x*]\s*(\d+(?:\.\d+)?)/i,
        );
        if (sizeDimMatch) {
          const w = sizeDimMatch[1];
          const l = sizeDimMatch[2];
          this.projectInfo.size = `${w}x${l}`;
        }
      }
    },
    handleSiteMeasurementBotReply(replaceMessageId) {
      const responses = [
        'Free site measurement can be arranged. Please book the appointment form and the team can confirm the final quote on site.',
        'Can arrange on-site measurement. Please submit the appointment form and the team will contact you.',
        'No problem. Site measurement can be booked first, and final price can be confirmed after the visit.',
      ];
      const text =
        responses[Math.floor(Math.random() * responses.length)];

      const note = 'User requested on-site measurement. Size not provided.';
      if (!this.form.details) {
        this.form.details = note;
      } else if (!this.form.details.includes(note)) {
        this.form.details = `${this.form.details}${
          this.form.details.endsWith('\n') ? '' : '\n'
        }${note}`;
      }

      // Replace the pending assistant message if we have an id; otherwise fall back to pushing.
      if (replaceMessageId) {
        this.replaceMessageById(replaceMessageId, {
          type: 'bot',
          text,
          showCta: true,
          isPlaceholder: false,
        });
      } else {
        this.messages.push({
          id: this.generateMessageId(),
          type: 'bot',
          text,
          showCta: true,
        });
      }
    },
    handleChatCtaClick() {
      const { city, project_type, size, material_type } = this.projectInfo;

      if (city) {
        this.form.city = city;
      }
      if (project_type) {
        this.form.project_type = project_type;
      }

      const detailLines = [];
      if (size) {
        detailLines.push(`Size: ${size}`);
      }
      if (material_type) {
        detailLines.push(`Material: ${material_type}`);
      }

      const detailText = detailLines.join('\n');
      if (detailText) {
        if (!this.form.details) {
          this.form.details = detailText;
        } else if (!this.form.details.includes(detailText)) {
          this.form.details = `${this.form.details}\n${detailText}`;
        }
      }

      this.scrollToAppointment();
    },
    scrollToAppointment() {
      const el = this.$refs.appointmentSection;
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const scroller = this.$el.querySelector('.scroll-container');
        const target = this.$el.querySelector('.section-appointment');
        if (scroller && target) {
          const top = target.offsetTop;
          scroller.scrollTo({ top, behavior: 'smooth' });
        }
      }

      this.appointmentHighlight = true;
      setTimeout(() => {
        this.appointmentHighlight = false;
      }, 1500);
    },
    randomizeProjects() {
      if (!Array.isArray(this.projects)) return;

      this.projects = this.projects.map((p) => {
        const project = { ...p };
        const name = (project.name || '').toLowerCase();

        // Keep manual Aluminum VPanel prices/sizes as-is
        if (name.startsWith('aluminum vpanel')) {
          return project;
        }

        // All A-Type projects are always custom build, no price/size
        if (name.startsWith('a-type patio cover')) {
          project.isCustom = true;
          project.price = null;
          project.sqft = null;
          return project;
        }

        // Skyline projects use fixed config from data: 1-6 have set price/sqft, others are Custom build
        if (name.startsWith('skyline combo project')) {
          return project;
        }

        // Sunroom projects: 1,2,4,5,6,7 use fixed price/sqft from data, others are Custom build
        if (name.startsWith('sunroom project')) {
          const match = (project.name || '').match(/Sunroom Project (\d+)/i);
          if (match) {
            const num = parseInt(match[1], 10);
            if ([1, 2, 4, 5, 6, 7].includes(num)) {
              return project;
            }
          }
          project.isCustom = true;
          project.price = null;
          project.sqft = null;
          return project;
        }

        // Glass: 1,2,3,4,6,7 have fixed price & sqft ($15/sq ft); rest are Custom build, no price/size
        const glassMatch = (project.name || '').match(/Glass Patio Cover Project (\d+)/i);
        if (glassMatch) {
          const num = parseInt(glassMatch[1], 10);
          if ([1, 2, 3, 4, 6, 7].includes(num)) {
            if (typeof project.price === 'number') {
              project.sqft = Math.round(project.price / 15 / 10) * 10;
            }
            return project;
          }
          project.isCustom = true;
          project.price = null;
          project.sqft = null;
          return project;
        }

        // Some cards show "Custom build" instead of price
        const isCustom = Math.random() < 0.2;
        project.isCustom = isCustom;

        if (!isCustom) {
          // Base ranges by type
          let min = 4000;
          let max = 8000;

          if (name.includes('aluminum') || name.includes('pergola')) {
            min = 4000;
            max = 7000;
          } else if (name.includes('glass')) {
            min = 5000;
            max = 8000;
          } else if (name.includes('skyline')) {
            min = 5500;
            max = 8000;
          } else if (name.includes('sunroom')) {
            min = 6000;
            max = 8000;
          }

          project.price =
            Math.floor(min / 100) * 100 +
            Math.floor(Math.random() * ((max - min) / 100 + 1)) * 100;
          // sqft from $12/sq ft, rounded to nearest 10 (no single-digit remainder)
          const rawSqft = project.price / 12;
          project.sqft = Math.round(rawSqft / 10) * 10;
        } else {
          project.price = null;
          project.sqft =
            project.sqft && typeof project.sqft === 'number'
              ? project.sqft
              : Math.floor(160 + Math.random() * (300 - 160));
        }

        return project;
      });
    },
    openAppointmentPhotoPicker() {
      const el = this.$refs.appointmentPhotoInput;
      if (el) el.click();
    },
    revokeAppointmentPhotoUrls() {
      this.appointmentPhotoPreviews.forEach((p) => {
        if (p && p.url) URL.revokeObjectURL(p.url);
      });
    },
    clearAppointmentPhotos() {
      this.revokeAppointmentPhotoUrls();
      this.appointmentPhotos = [];
      this.appointmentPhotoPreviews = [];
    },
    onAppointmentPhotosChange(event) {
      const input = event && event.target;
      if (!input || !input.files) return;

      const picked = Array.from(input.files);
      const maxFiles = 8;
      const maxBytes = 8 * 1024 * 1024;

      for (let i = 0; i < picked.length; i += 1) {
        const file = picked[i];
        if (!file.type || !file.type.startsWith('image/')) {
          this.formError = 'Please choose image files only.';
          setTimeout(() => {
            this.formError = '';
          }, 5000);
          input.value = '';
          return;
        }
        if (file.size > maxBytes) {
          this.formError = 'Each image must be 8MB or smaller.';
          setTimeout(() => {
            this.formError = '';
          }, 5000);
          input.value = '';
          return;
        }
      }

      for (const file of picked) {
        if (this.appointmentPhotos.length >= maxFiles) break;
        if (!file.type || !file.type.startsWith('image/')) continue;
        if (file.size > maxBytes) continue;
        this.appointmentPhotos.push(file);
      }

      this.revokeAppointmentPhotoUrls();
      this.appointmentPhotoPreviews = this.appointmentPhotos.map((f, i) => ({
        key: `preview-${i}-${f.name}-${f.size}`,
        name: f.name,
        url: URL.createObjectURL(f),
      }));

      input.value = '';
    },
    removeAppointmentPhoto(index) {
      const p = this.appointmentPhotoPreviews[index];
      if (p && p.url) URL.revokeObjectURL(p.url);
      this.appointmentPhotos.splice(index, 1);
      this.appointmentPhotoPreviews.splice(index, 1);
    },
    async submitAppointment() {
      this.formSubmitting = true;
      this.formSuccess = false;
      this.formError = '';

      const {
        name,
        email,
        phone,
        city,
        project_type,
        details,
        preferred_time,
      } = this.form;

      try {
        const messageBody = [
          preferred_time
            ? `Preferred contact time: ${preferred_time}`
            : '',
          details || '',
        ]
          .filter(Boolean)
          .join('\n')
          .trim();

        const fd = new FormData();
        fd.append('source', 'website_appointment_form');
        fd.append('name', name);
        fd.append('phone', phone);
        fd.append('email', email);
        fd.append('city', city);
        fd.append('project_type', project_type);
        fd.append(
          'size',
          this.projectInfo && this.projectInfo.size
            ? this.projectInfo.size
            : '',
        );
        fd.append('message', messageBody);
        this.appointmentPhotos.forEach((file) => {
          fd.append('photos', file, file.name);
        });

        const res = await fetch(this.cfg.emailApiUrl, {
          method: 'POST',
          body: fd,
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          // Log exact response for debugging
          // eslint-disable-next-line no-console
          console.error('Appointment submit failed:', res.status, text);
          let detail = `Server responded with ${res.status}`;
          try {
            const j = JSON.parse(text);
            if (typeof j.detail === 'string') {
              detail = j.detail;
            } else if (Array.isArray(j.detail)) {
              detail = j.detail.map((d) => d.msg || d).join(' ');
            }
          } catch {
            /* ignore */
          }
          throw new Error(detail);
        }

        this.formSuccess = true;
        this.clearAppointmentPhotos();
        this.form = {
          name: '',
          email: '',
          phone: '',
          city: '',
          project_type: '',
          details: '',
          preferred_time: '',
        };
        setTimeout(() => {
          this.formSuccess = false;
        }, 4000);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('submitAppointment error:', err);
        this.formError =
          (err && err.message) ||
          'Failed to send. Please try again or contact us directly.';
        setTimeout(() => {
          this.formError = '';
        }, 5000);
      } finally {
        this.formSubmitting = false;
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
    Ubuntu, sans-serif;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.site-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dce5ef;
}

.site-loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-top-color: #4a7bb5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Full Background - fixed behind everything */
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: none;
  background-size: cover;
  background-position: center;
  background-color: #1a1f2e;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(248, 250, 252, 0.4) 50%,
    rgba(241, 245, 249, 0.55) 100%
  );
}

/* Scrollable Container */
.scroll-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
}

.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
}

/* Sections */
.section {
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  scroll-snap-align: start;
}

.section-hero {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  padding: 20px 24px;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

.section-projects {
  align-items: center;
  padding: 40px 20px;
}

/* Hero content panel - premium card over background */
.glass-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.04);
}

.glass-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(
      165deg,
      rgba(255, 255, 255, 0.97) 0%,
      rgba(248, 250, 252, 0.98) 40%,
      rgba(241, 245, 249, 0.97) 100%
    );
  filter: none;
}

.glass-panel::after {
  content: none;
}

.glass-panel > * {
  position: relative;
  z-index: 1;
}

.content-wrapper {
  width: 100%;
  max-width: 1100px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-hero .content-wrapper {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  max-width: 50%;
  padding: 8px;
  padding-bottom: 12px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.section-hero .body-section {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  margin-top: 4px;
}

.section-hero .body-section-cards-only {
  display: block;
  flex: 0 0 auto;
  min-height: auto;
  overflow: visible;
}

.section-hero .body-section-cards-only .services-section {
  flex: none;
  width: 100%;
  padding: 20px 28px 16px;
  overflow: visible;
}

/* Header */
.header {
  position: relative;
  z-index: 1;
  padding: 32px 40px 28px;
  border-bottom: 1px solid #e2e8f0;
}

.section-hero .header {
  padding: 24px 28px 20px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.hero-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
}

.hero-text-group {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 15px;
  color: #475569;
  font-weight: 400;
}

.hero-title {
  font-size: 34px;
  line-height: 1.18;
  color: #0f172a;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  margin: 0;
  font-size: 16px;
  color: #334155;
  line-height: 1.5;
}

.primary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: #0f172a;
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  align-self: flex-start;
}

.primary-cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.28);
  background: #1e293b;
}

.primary-cta:active {
  transform: translateY(0) scale(1);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
}

.hero-trust {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  font-size: 12px;
}

.hero-badge {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: #1f2933;
  border: 1px solid rgba(148, 163, 184, 0.55);
  backdrop-filter: blur(6px);
}

/* Body Section */
.body-section {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Chat Section */
.chat-section {
  flex: 1.1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  min-width: 0;
  padding: 24px 32px 32px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 320px;
  max-height: 50vh;
  max-width: 560px;
  margin: 0 auto;
  overflow: hidden;
  background: #fafbfc;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.chat-messages {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}

/* Messages */
.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  max-width: 95%;
}

.bot-message {
  align-self: flex-start;
}

.user-message {
  align-self: flex-end;
  justify-content: flex-end;
}

/* Bot avatar: AI-style teal/cyan orb + lightning, with online indicator */
.bot-avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: clamp(44px, 10.5vw, 52px);
  height: clamp(44px, 10.5vw, 52px);
  align-self: flex-start;
  cursor: default;
}

.bot-avatar {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 50%;
  /* Soft teal → cyan → deep blue: reads as a single “AI agent” orb */
  background: linear-gradient(
    145deg,
    #5eead4 0%,
    #2dd4bf 22%,
    #22d3ee 55%,
    #0ea5e9 78%,
    #0369a1 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.45);
  box-shadow:
    0 0 0 1px rgba(14, 165, 233, 0.25),
    0 4px 18px rgba(14, 165, 233, 0.38),
    0 2px 10px rgba(13, 148, 136, 0.28),
    0 1px 3px rgba(15, 23, 42, 0.12),
    inset 0 2px 5px rgba(255, 255, 255, 0.45),
    inset 0 -3px 10px rgba(3, 105, 161, 0.35);
}

.avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.98);
  filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.25))
    drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
}

.avatar-icon svg {
  width: clamp(20px, 48%, 24px);
  height: clamp(20px, 48%, 24px);
  stroke-width: 2.1;
}

/* Online dot: bottom-right, white ring, soft pulse */
.bot-avatar-status {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: clamp(10px, 2.5vw, 12px);
  height: clamp(10px, 2.5vw, 12px);
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #fff;
  box-sizing: content-box;
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.2),
    0 1px 4px rgba(15, 23, 42, 0.12);
  z-index: 2;
  pointer-events: none;
  animation: bot-avatar-status-pulse 2.6s ease-in-out infinite;
}

@keyframes bot-avatar-status-pulse {
  0%,
  100% {
    box-shadow:
      0 0 0 0 rgba(34, 197, 94, 0.28),
      0 0 0 0 rgba(34, 197, 94, 0),
      0 1px 4px rgba(15, 23, 42, 0.12);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 0 3px rgba(34, 197, 94, 0.12),
      0 0 10px rgba(34, 197, 94, 0.18),
      0 1px 4px rgba(15, 23, 42, 0.1);
    transform: scale(1.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bot-avatar-status {
    animation: none;
  }
}

.message-bubble {
  padding: 16px 20px;
  border-radius: 16px;
  line-height: 1.55;
  font-size: 14px;
}

.message-bubble p {
  margin: 0;
}

.message-bubble p + p {
  margin-top: 10px;
}

.bot-bubble {
  background: #ffffff;
  color: #1e293b;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.user-bubble {
  background: #0f172a;
  color: #fff;
  border: none;
  border-bottom-right-radius: 6px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
}

/* Typing Indicator */
.typing-bubble {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 14px 20px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #aaa;
  animation: typing 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

/* Popular Questions (FAQ) */
.faq-accordion {
  align-self: flex-start;
  width: 100%;
  max-width: 95%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 12px 14px;
  margin-top: 0;
  margin-bottom: 6px;
}

.faq-title {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  margin: 0 0 10px 0;
  letter-spacing: 0.2px;
}

.faq-item {
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  padding: 10px 0;
}

.faq-item:first-of-type {
  border-top: none;
  padding-top: 0;
}

.faq-question {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.faq-q-text {
  text-align: left;
  font-size: 14px;
  font-weight: 650;
  color: #0f172a;
  line-height: 1.35;
}

.faq-icon {
  flex-shrink: 0;
  color: #64748b;
  font-size: 18px;
  line-height: 1;
  padding-top: 2px;
}

.faq-answer {
  margin-top: 8px;
  font-size: 13px;
  color: #334155;
  line-height: 1.5;
}

.faq-answer-text {
  margin-bottom: 8px;
}

.faq-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  background: #0f172a;
  color: #ffffff;
  text-decoration: none;
  font-size: 13px;
  font-weight: 650;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
}

.faq-cta-link:active {
  transform: translateY(0);
}

/* Why Choose Us (compact trust signals) */
.why-choose-us-mini {
  align-self: flex-start;
  width: 100%;
  max-width: 95%;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 4px 0 0;
  margin-top: 0;
}

.why-choose-title {
  font-size: 11px;
  font-weight: 800;
  color: #334155;
  margin: 0 0 6px 0;
  letter-spacing: 0.2px;
}

.why-choose-mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 10px;
}

.why-choose-mini-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
  min-height: 18px;
}

.why-choose-icon {
  color: #0f172a;
  flex-shrink: 0;
  margin-top: 0;
}

.why-choose-icon svg {
  width: 14px;
  height: 14px;
}

.why-choose-mini-text {
  font-size: 12px;
  font-weight: 750;
  color: #0f172a;
  line-height: 1.2;
}

@media (max-width: 480px) {
  .why-choose-mini-grid {
    grid-template-columns: 1fr;
    gap: 4px 10px;
  }
}

/* Chat Input area */
.chat-input-wrap {
  flex-shrink: 0;
  padding: 0 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: #fafbfc;
}

.chat-input-helper {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
}

.chat-input {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0;
}

.chat-input input {
  flex: 1;
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #ffffff;
  color: #0f172a;
}

.chat-input input::placeholder {
  color: #94a3b8;
}

.chat-input input:focus {
  border-color: #cbd5e1;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.15);
  background: #ffffff;
}

.send-btn {
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 14px;
  border: none;
  background: #0f172a;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
}

.send-btn:hover {
  transform: translateY(-1px);
  background: #1e293b;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
}

.send-btn:active {
  transform: translateY(0);
}

/* Services Section (Section 1 right side) */
.services-section {
  flex: 0.9;
  padding: 24px 28px 28px 24px;
  overflow-y: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 0;
}

.service-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.service-card:hover {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.service-card:hover .card-image img {
  transform: scale(1.04);
}

.card-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.04));
}

.card-info {
  flex: 1;
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.card-info h3 {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.card-price {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

.service-cta-link {
  align-self: flex-start;
  margin-top: 6px;
  font-size: 12px;
  color: #94a3b8;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.service-cta-link:hover {
  color: #64748b;
}

.trust-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding: 8px 24px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.85),
    rgba(15, 23, 42, 0.95)
  );
}

.trust-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.trust-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #9ca3af;
}

.trust-value {
  font-size: 12px;
  font-weight: 600;
  color: #e5e7eb;
}

/* Chat block - right side, same row as content */
.hero-chat-block {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  padding: 0 0 0 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-chat-block .chat-section {
  border: none;
  padding: 0;
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-chat-block .chat-container {
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
  flex: 1;
  min-height: 200px;
  max-height: none;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  background: #fafbfc;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* Chat CTA card under price responses */
.chat-cta-card {
  margin: 8px 0 0 40px;
  padding: 12px 14px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.5);
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.12);
}

.chat-cta-title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 4px 0;
}

.chat-cta-text {
  font-size: 12px;
  color: #4b5563;
  margin: 0 0 8px 0;
}

.chat-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chat-cta-btn {
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease,
    transform 0.15s ease, box-shadow 0.15s ease;
}

.chat-cta-btn.primary {
  background: #0f172a;
  color: #f9fafb;
  border-color: #0f172a;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.25);
}

.chat-cta-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.3);
}

.chat-cta-btn.secondary {
  background: #f9fafb;
  color: #111827;
  border-color: rgba(148, 163, 184, 0.7);
}

.chat-cta-btn.secondary:hover {
  background: #e5e7eb;
}

@media (max-width: 900px) {
  .section-hero {
    flex-direction: column;
    padding: 12px 16px 16px;
  }

  .section-hero .content-wrapper {
    max-width: none;
    padding-bottom: 10px;
  }

  .hero-chat-block {
    padding: 6px 0 0;
    min-height: 0;
  }

  .hero-chat-block .chat-container {
    min-height: 180px;
    max-height: 42vh;
  }

  .hero-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .hero-trust {
    align-items: flex-start;
  }

  .body-section {
    flex-direction: column;
  }

  .body-section-cards-only .services-section {
    padding: 12px 18px 18px;
  }

  .hero-chat-block .chat-section {
    padding: 0;
  }

  .services-section {
    padding: 12px 18px 18px;
  }

  .chat-container {
    max-width: 100%;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .trust-strip {
    grid-template-columns: 1fr;
    padding-inline: 16px;
  }
}

@media (max-height: 750px) {
  .trust-strip {
    display: none;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 16px 12px;
  }

  .header {
    padding: 16px 16px 10px;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .scroll-container {
    scroll-snap-type: none;
  }
}

@media (max-height: 800px) {
  .section-hero .content-wrapper {
    min-height: auto;
  }
}

@media (max-height: 900px) {
  .trust-strip {
    display: none;
  }
}

/* ============================
   Section 2: Projects & Testimonials
   ============================ */

.projects-body {
  position: relative;
  z-index: 1;
  padding: 28px 36px 32px;
}

.section-heading {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 16px;
}

/* City Tabs */
.city-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.city-tab {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: rgba(255, 255, 255, 0.85);
  color: #111827;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.city-tab:hover {
  background: #111827;
  color: #f9fafb;
  border-color: #111827;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
  transform: translateY(-1px);
}

.city-tab.active {
  background: #111827;
  border-color: #111827;
  color: #f9fafb;
  font-weight: 600;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.26);
}

/* Project Cards */
.project-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.project-card {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.6);
}

.project-image {
  height: 180px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.project-card:hover .project-image img {
  transform: scale(1.04);
}

.project-info {
  padding: 14px 18px 16px;
}

.project-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-icon {
  font-size: 18px;
}

.project-city {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.project-sqft {
  font-size: 12.5px;
  color: #4b5563;
  margin-bottom: 8px;
}

.price-label {
  font-size: 11px;
  color: #9ca3af;
  margin-left: 6px;
}

.price-value {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  letter-spacing: 0;
  margin-left: 4px;
}

.price-label {
  font-size: 11px;
  color: #9ca3af;
  margin-left: 6px;
}

.price-value {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  letter-spacing: 0;
  margin-left: 4px;
}

/* See More Button */
.see-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: rgba(15, 23, 42, 0.02);
  color: #111827;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  margin-bottom: 36px;
}

.see-more-btn:hover {
  background: #111827;
  color: #f9fafb;
  border-color: #111827;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.25);
  transform: translateY(-1px);
}

.see-more-arrow {
  font-size: 14px;
}

.project-photos-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: #f9fafb;
  color: #111827;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, transform 0.18s ease;
}

.project-photos-btn:hover {
  background: #111827;
  color: #f9fafb;
  border-color: #111827;
  transform: translateY(-1px);
}

/* Why Choose Us */
.why-choose-us {
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 28px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 32px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #1f2933;
}

.feature-icon {
  font-size: 18px;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.feature-text {
  line-height: 1.5;
}

/* ============================
   Section 3: Book an Appointment
   ============================ */

.section-appointment {
  min-height: 100vh;
  position: relative;
  padding: 0;
  scroll-snap-align: start;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Full-screen background (same layer as Book an Appointment title) */
.appt-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.appt-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.appt-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(190, 210, 228, 0.15) 0%,
    rgba(200, 215, 230, 0.25) 40%,
    rgba(210, 222, 235, 0.4) 100%
  );
}

/* Title positioned absolute top-left on the background */
.appt-title-area {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 48px 48px 24px;
  max-width: 680px;
}

.appt-main-title {
  font-size: 44px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 4px rgba(255, 255, 255, 0.35);
}

.appt-main-subtitle {
  font-size: 25px;
  color: #3a3a4a;
  line-height: 1.55;
}

/* Floating form card */
.appt-form-card {
  position: relative;
  z-index: 2;
  width: calc(100% - 80px);
  max-width: 660px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.appt-form-card--highlight {
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.8),
    0 16px 48px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: box-shadow 0.4s ease;
}

/* Oil painting cloud background for form card */
.appt-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: radial-gradient(
      ellipse 110% 70% at 10% 15%,
      rgba(255, 255, 255, 0.8) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 90% 55% at 85% 10%,
      rgba(235, 242, 252, 0.85) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse 80% 60% at 50% 90%,
      rgba(255, 255, 255, 0.6) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 130% 45% at 25% 50%,
      rgba(210, 225, 242, 0.5) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse 70% 80% at 80% 60%,
      rgba(230, 238, 250, 0.65) 0%,
      transparent 45%
    ),
    radial-gradient(
      ellipse 55% 35% at 60% 25%,
      rgba(245, 248, 255, 0.7) 0%,
      transparent 40%
    ),
    linear-gradient(
      170deg,
      #c5d5e8 0%,
      #d0dced 15%,
      #dae4f0 30%,
      #e2ebf4 45%,
      #dce5ef 60%,
      #cddaea 75%,
      #c2d2e3 100%
    );
  filter: contrast(0.93) brightness(1.02);
}

.appt-card-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      ellipse 50% 35% at 15% 20%,
      rgba(255, 255, 255, 0.55) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 45% 30% at 75% 15%,
      rgba(245, 250, 255, 0.5) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 60% 25% at 40% 80%,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 35% 40% at 90% 50%,
      rgba(240, 246, 255, 0.45) 0%,
      transparent 100%
    );
  filter: blur(10px);
}

.appt-card-content {
  position: relative;
  z-index: 1;
  padding: 32px 36px 36px;
}

.appt-form-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.appt-form-subtitle {
  font-size: 13.5px;
  color: #555;
  line-height: 1.55;
  margin-bottom: 22px;
}

/* Form */
.appt-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-field {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(200, 210, 225, 0.6);
  border-radius: 10px;
  padding: 0 14px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.form-field:focus-within {
  border-color: #4a8fd4;
  box-shadow: 0 0 0 3px rgba(74, 143, 212, 0.12);
  background: rgba(255, 255, 255, 0.82);
}

.field-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.form-field input {
  flex: 1;
  padding: 13px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
  font-family: inherit;
}

.form-field input::placeholder {
  color: #999;
}

.form-field-select select {
  flex: 1;
  padding: 13px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.form-field-select select option[value=''] {
  color: #999;
}

.form-field-select::after {
  content: '▾';
  font-size: 14px;
  color: #7a8ba0;
  pointer-events: none;
  flex-shrink: 0;
}

.details-label {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin-top: 6px;
  margin-bottom: -4px;
}

.form-upload-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.upload-field-label {
  margin-bottom: 0;
  cursor: pointer;
}

.upload-field-hint {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

.form-field-upload {
  align-items: stretch;
  padding: 12px 14px;
}

/* Native file input hidden — custom English UI only */
.upload-input-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.upload-control {
  position: relative;
}

.upload-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

@media (min-width: 520px) {
  .upload-actions {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
  }
}

.upload-choose-btn {
  flex-shrink: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #5a7fb0, #3d5a80);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 2px 8px rgba(45, 80, 134, 0.25);
  transition: transform 0.12s, box-shadow 0.12s, opacity 0.2s;
}

.upload-choose-btn:hover {
  box-shadow: 0 3px 12px rgba(45, 80, 134, 0.32);
}

.upload-choose-btn:active {
  transform: scale(0.98);
}

.upload-status {
  margin: 0;
  font-size: 13px;
  color: #555;
  line-height: 1.45;
  word-break: break-word;
  flex: 1;
  min-width: 0;
}

.photo-preview-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.photo-preview-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(200, 210, 225, 0.55);
  border-radius: 10px;
}

.photo-preview-thumb {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.photo-preview-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.photo-preview-name {
  font-size: 13px;
  color: #333;
  word-break: break-word;
  line-height: 1.35;
}

.photo-preview-remove {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #2d5086;
  background: rgba(45, 80, 134, 0.08);
  border: 1px solid rgba(45, 80, 134, 0.2);
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.photo-preview-remove:hover {
  background: rgba(45, 80, 134, 0.14);
}

.form-field-textarea {
  align-items: flex-start;
  padding: 14px;
}

.form-field-textarea textarea {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
  min-height: 60px;
}

.form-field-textarea textarea::placeholder {
  color: #999;
}

/* Submit Button */
.submit-btn {
  margin-top: 8px;
  padding: 14px 44px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #4a6fa5, #2d5086);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
  box-shadow: 0 4px 16px rgba(45, 80, 134, 0.35);
  align-self: center;
  letter-spacing: 0.2px;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(45, 80, 134, 0.45);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.form-success-msg {
  text-align: center;
  color: #2e7d32;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
}

.form-error-msg {
  text-align: center;
  color: #c62828;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
}

/* Bottom row: benefits left + deco image right */
.appt-bottom-row {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-top: 24px;
}

.benefits-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14.5px;
  color: #333;
}

.benefit-check {
  font-size: 16px;
  flex-shrink: 0;
}

/* Decorative image bottom-right */
.appt-deco-image {
  width: 210px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.appt-deco-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .body-section {
    flex-direction: column;
  }

  .chat-section {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  }

  .title {
    font-size: 22px;
  }

  .section-hero .content-wrapper {
    max-height: 90vh;
  }

  .project-cards {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .projects-body {
    padding: 20px;
  }

  .appt-title-area {
    padding: 28px 20px 14px;
  }

  .appt-main-title {
    font-size: 24px;
  }

  .appt-form-card {
    width: calc(100% - 32px);
  }

  .appt-card-content {
    padding: 24px 20px;
  }

  .appt-bottom-row {
    flex-direction: column;
    align-items: stretch;
  }

  .appt-deco-image {
    width: 100%;
  }

  .appt-deco-image img {
    height: 160px;
  }
}
</style>
