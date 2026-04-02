<template>
  <div
    class="app"
    :class="{ 'app--service-modal-open': serviceModalService }"
  >
    <!-- Loading screen -->
    <div v-if="!siteLoaded" class="site-loading">
      <div class="site-loading-spinner"></div>
    </div>

    <!-- Full Background (plain) -->
    <div
      v-show="siteLoaded"
      class="hero-bg"
      :style="heroBackdropStyle"
      aria-hidden="true"
    ></div>

    <!-- Scrollable Content -->
    <div v-show="siteLoaded" class="scroll-container">
      <!-- Section 1: Instant Quote -->
      <section id="home" class="section section-hero">
        <div class="content-wrapper glass-panel">
          <div class="header hero-header">
            <div class="hero-top-row">
              <div class="hero-brand-block">
                <p v-if="cfg.brandName" class="hero-eyebrow">
                  <span class="hero-eyebrow-name">{{ cfg.brandName }}</span>
                  <span
                    v-if="cfg.brandSuffix"
                    class="hero-eyebrow-suffix"
                  >{{ cfg.brandSuffix }}</span>
                </p>
                <h1 class="hero-main-title">{{ s1.heroTitle }}</h1>
                <p class="subtitle hero-subtitle">{{ s1.subtitle }}</p>
                <div class="hero-cta-row">
                  <button
                    type="button"
                    class="hero-cta hero-cta--primary"
                    @click="startEstimateFromHero()"
                  >
                    Get My Fast Estimate
                  </button>
                  <a
                    href="#our-products"
                    class="hero-cta hero-cta--secondary"
                    @click.prevent="scrollToSection('#our-products')"
                  >Compare Cover Types</a>
                </div>
              </div>
            </div>
            <nav class="hero-subnav" aria-label="Site sections">
              <a
                href="#our-products"
                class="hero-subnav__link hero-subnav__link--emphasized"
                @click.prevent="scrollToSection('#our-products')"
              >Our products</a>
              <a
                href="#before-after-projects"
                class="hero-subnav__link hero-subnav__link--emphasized"
                @click.prevent="scrollToSection('#before-after-projects')"
              >Before &amp; after</a>
              <a
                href="#past-projects"
                class="hero-subnav__link hero-subnav__link--emphasized"
                @click.prevent="scrollToSection('#past-projects')"
              >Past projects</a>
              <a
                href="#why-us"
                class="hero-subnav__link hero-subnav__link--emphasized"
                @click.prevent="scrollToSection('#why-us')"
              >Why us?</a>
              <a
                href="#confirm-final-quote"
                class="hero-subnav__link hero-subnav__link--inverse"
                @click.prevent="scrollToGetQuote()"
              >Book Free Measurement</a>
            </nav>
          </div>

          <div id="our-products" class="body-section body-section-cards-only">
            <div class="our-products-intro">
              <h2 class="our-products-heading">
                {{ s1.productsHeading || 'Compare cover types' }}
              </h2>
              <p class="our-products-lead">
                {{
                  s1.productsLead ||
                    'Same page — pick a cover style below (not the site-visit form).'
                }}
              </p>
              <nav class="home-service-nav" aria-label="Vancouver patio cover types">
                <router-link
                  v-for="link in serviceNavLinks"
                  :key="link.to"
                  :to="link.to"
                  class="home-service-nav__link"
                >{{ link.label }}</router-link>
              </nav>
            </div>
            <div class="services-section">
              <div class="services-grid">
                <div
                  v-for="service in services"
                  :key="service.name"
                  :class="[
                    'service-card',
                    {
                      'service-card--with-points':
                        service.bullets && service.bullets.length,
                    },
                  ]"
                >
                  <div
                    :class="[
                      'service-card-layout',
                      service.bullets && service.bullets.length
                        ? 'service-card-layout--split'
                        : '',
                    ]"
                  >
                    <div
                      class="card-image"
                      :class="{
                        'card-image--modal-trigger': hasServiceModal(service),
                      }"
                      role="button"
                      :tabindex="hasServiceModal(service) ? 0 : -1"
                      @click="openServiceModal(service)"
                      @keydown.enter.prevent="openServiceModal(service)"
                      @keydown.space.prevent="openServiceModal(service)"
                    >
                      <img :src="publicAssetUrl(service.image)" :alt="service.name" />
                      <div class="card-image-overlay"></div>
                    </div>
                    <div class="card-info">
                      <h3
                        class="card-product-title"
                        :class="{
                          'card-info-heading--modal-trigger': hasServiceModal(
                            service
                          ),
                        }"
                        role="button"
                        :tabindex="hasServiceModal(service) ? 0 : -1"
                        @click="openServiceModal(service)"
                        @keydown.enter.prevent="openServiceModal(service)"
                        @keydown.space.prevent="openServiceModal(service)"
                      >
                        {{ service.name }}
                      </h3>
                      <ul
                        v-if="service.bullets && service.bullets.length"
                        class="service-card-bullets"
                      >
                        <li
                          v-for="(pt, i) in service.bullets"
                          :key="i"
                        >
                          {{ pt }}
                        </li>
                      </ul>
                      <p
                        v-if="service.bestFor"
                        class="service-card-best-for"
                      >
                        <span class="service-card-best-label">Best for:</span>
                        {{ service.bestFor }}
                      </p>
                      <div
                        v-if="typeof service.examplePrice === 'number'"
                        class="card-price-block"
                      >
                        <span class="card-price-label">Rough ballpark</span>
                        <p
                          class="card-price"
                          :class="{
                            'card-price--modal-trigger': hasServiceModal(service),
                          }"
                          role="button"
                          :tabindex="hasServiceModal(service) ? 0 : -1"
                          @click="openServiceModal(service)"
                          @keydown.enter.prevent="openServiceModal(service)"
                          @keydown.space.prevent="openServiceModal(service)"
                        >
                          From ${{ service.examplePrice.toLocaleString() }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Trust strip under hero content -->
          <div
            v-if="s1.trustPoints && s1.trustPoints.length"
            class="trust-strip trust-strip--points"
          >
            <div
              v-for="(pt, i) in s1.trustPoints"
              :key="i"
              class="trust-item trust-item--line"
            >
              <span class="trust-line">{{ pt }}</span>
            </div>
          </div>

          <section
            v-if="beforeAfter && beforeAfter.items && beforeAfter.items.length"
            id="before-after-projects"
            class="home-before-after"
            aria-labelledby="before-after-heading"
          >
            <div class="home-before-after__intro">
              <h2
                id="before-after-heading"
                class="home-before-after__title"
              >{{ beforeAfter.heading }}</h2>
              <p class="home-before-after__subtitle">{{ beforeAfter.subtitle }}</p>
            </div>
            <div class="home-before-after__grid">
              <article
                v-for="(proj, bi) in beforeAfter.items"
                :key="'ba-' + bi"
                class="home-before-after__card"
              >
                <div class="home-before-after__pair">
                  <figure class="home-before-after__shot">
                    <span
                      v-if="!proj.hidePairLabels"
                      class="home-before-after__label"
                    >Before</span>
                    <div
                      class="home-before-after__zoom-hit"
                      role="button"
                      tabindex="0"
                      :aria-label="'Enlarge before photo: ' + (proj.beforeAlt || proj.type || 'project')"
                      @click="openBeforeAfterLightbox(proj.beforeSrc)"
                      @keydown.enter.prevent="openBeforeAfterLightbox(proj.beforeSrc)"
                      @keydown.space.prevent="openBeforeAfterLightbox(proj.beforeSrc)"
                    >
                      <img
                        :src="resolvedPublicUrl(proj.beforeSrc)"
                        :alt="proj.beforeAlt || 'Before patio project photo'"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                      />
                    </div>
                  </figure>
                  <figure class="home-before-after__shot">
                    <span
                      v-if="!proj.hidePairLabels"
                      class="home-before-after__label"
                    >After</span>
                    <div
                      class="home-before-after__zoom-hit"
                      role="button"
                      tabindex="0"
                      :aria-label="'Enlarge after photo: ' + (proj.afterAlt || proj.type || 'project')"
                      @click="openBeforeAfterLightbox(proj.afterSrc)"
                      @keydown.enter.prevent="openBeforeAfterLightbox(proj.afterSrc)"
                      @keydown.space.prevent="openBeforeAfterLightbox(proj.afterSrc)"
                    >
                      <img
                        :src="resolvedPublicUrl(proj.afterSrc)"
                        :alt="proj.afterAlt || 'After patio cover project photo'"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                      />
                    </div>
                  </figure>
                </div>
                <div class="home-before-after__meta">
                  <h3 class="home-before-after__type">{{ proj.type }}</h3>
                  <p class="home-before-after__facts">
                    <span>{{ proj.size }}</span>
                    <span
                      class="home-before-after__sep"
                      aria-hidden="true"
                    >·</span>
                    <span>{{ proj.city }}</span>
                  </p>
                  <p class="home-before-after__benefit">{{ proj.benefit }}</p>
                </div>
              </article>
            </div>
            <div class="home-before-after__cta-block">
              <button
                type="button"
                class="hero-cta hero-cta--primary home-before-after__cta-btn"
                @click="startEstimateFromHero()"
              >
                {{ beforeAfter.ctaTitle }}
              </button>
              <p class="home-before-after__cta-note">{{ beforeAfter.ctaBody }}</p>
              <a
                v-if="beforeAfter.viewMoreLabel && beforeAfter.viewMoreHref"
                :href="beforeAfter.viewMoreHref"
                class="home-before-after__more"
                @click.prevent="scrollToSection(beforeAfter.viewMoreHref)"
              >{{ beforeAfter.viewMoreLabel }}</a>
            </div>
          </section>

          <div
            v-if="s1.seoHeading && s1.seoBody"
            class="home-seo-block"
          >
            <h2 class="home-seo-block__title">{{ s1.seoHeading }}</h2>
            <p class="home-seo-block__body">{{ s1.seoBody }}</p>
            <p
              v-if="s1.seoServiceArea"
              class="home-seo-block__area"
            >{{ s1.seoServiceArea }}</p>
          </div>

          <div
            v-if="faqList.length"
            class="home-faq"
          >
            <h2 class="home-faq__title">{{ s1.faqTitle || 'Common questions' }}</h2>
            <div class="home-faq__list">
              <details
                v-for="(item, fi) in faqList"
                :key="fi"
                class="home-faq__item"
              >
                <summary class="home-faq__q">{{ item.q }}</summary>
                <p class="home-faq__a">{{ item.a }}</p>
              </details>
            </div>
          </div>

          <nav class="home-seo-hub" aria-label="Patio cover resources and local pages">
            <h2 class="home-seo-hub__title">Patio Cover Guides, Service Areas &amp; Cover Types</h2>
            <p class="home-seo-hub__lead">
              Same fast rough estimate (~60 seconds) and free measurement — whether you are in Vancouver, a nearby city, or just researching cost and options.
            </p>
            <div class="home-seo-hub__grid">
              <div class="home-seo-hub__col">
                <h3 class="home-seo-hub__h3">Lower Mainland cities</h3>
                <ul class="home-seo-hub__list">
                  <li v-for="c in cityPageLinks" :key="c.path">
                    <router-link :to="c.path">{{ c.label }}</router-link>
                  </li>
                </ul>
              </div>
              <div class="home-seo-hub__col">
                <h3 class="home-seo-hub__h3">Cover types</h3>
                <ul class="home-seo-hub__list">
                  <li v-for="link in serviceNavLinks" :key="'hub-svc-' + link.to">
                    <router-link :to="link.to">{{ link.label }}</router-link>
                  </li>
                </ul>
              </div>
              <div class="home-seo-hub__col">
                <h3 class="home-seo-hub__h3">Guides</h3>
                <ul class="home-seo-hub__list">
                  <li v-for="g in guidePageLinks" :key="g.path">
                    <router-link :to="g.path">{{ g.label }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>

      <!-- Section 2: Projects & Testimonials -->
      <section class="section section-projects">
        <div class="content-wrapper glass-panel">
          <div class="header">
            <h2 id="past-projects" class="title">{{ s2.title }}</h2>
            <p class="subtitle">{{ s2.subtitle }}</p>
          </div>

          <div class="projects-body">
            <div class="projects-area">
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
                    <img :src="publicAssetUrl(project.image)" :alt="project.name" />
                  </div>
                  <div class="project-info">
                    <h3>
                      <span
                        v-if="project.icon"
                        class="project-icon"
                      >{{ project.icon }}</span>
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
                  </div>
                </div>
              </div>
            </div>

            <!-- Why Choose Us -->
            <div id="why-us" class="why-choose-us">
              <h2 class="section-heading">Why Choose Us</h2>
              <div class="features-grid">
                <div
                  v-for="feature in features"
                  :key="feature.text"
                  class="feature-item"
                >
                  <span
                    v-if="feature.icon"
                    class="feature-icon"
                  >{{ feature.icon }}</span>
                  <span class="feature-text">{{ feature.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Confirm Final Quote -->
      <section
        class="section section-appointment"
        id="book-measurement"
        ref="appointmentSection"
      >
        <div class="appt-layout" :class="{ 'appt-layout--highlight': appointmentHighlight }">
          <!-- Left column: info -->
          <div class="appt-info-col">
            <div id="confirm-final-quote" class="appt-info-header">
              <h1 class="appt-main-title">{{ s3.title }}</h1>
              <p class="appt-main-subtitle">{{ s3.subtitle }}</p>
            </div>
          </div>

          <!-- Right column: form card -->
          <div class="appt-form-col">
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
                  Upload photos for a more accurate estimate (optional)
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
          </div>
        </div>
      </section>

      <footer class="site-footer" role="contentinfo">
        <div class="site-footer__inner">
          <div class="site-footer__brand">
            <p class="site-footer__name">LoomiHome Patios</p>
            <p class="site-footer__desc">
              Fast ballpark estimates for patio covers and sunrooms in Vancouver
              and the Lower Mainland — compare options first, then book a free
              on-site measurement.
            </p>
          </div>

          <nav
            class="site-footer__nav"
            aria-label="Footer quick links"
          >
            <a
              href="#home"
              class="site-footer__link"
              @click.prevent="scrollToSection('#home')"
            >Home</a>
            <router-link
              v-for="link in serviceNavLinks"
              :key="'ft-' + link.to"
              :to="link.to"
              class="site-footer__link"
            >{{ link.label }}</router-link>
            <a
              href="#our-products"
              class="site-footer__link"
              @click.prevent="scrollToSection('#our-products')"
            >Our Products</a>
            <a
              href="#before-after-projects"
              class="site-footer__link"
              @click.prevent="scrollToSection('#before-after-projects')"
            >Before &amp; After</a>
            <a
              href="#past-projects"
              class="site-footer__link"
              @click.prevent="scrollToSection('#past-projects')"
            >Past Projects</a>
            <a
              href="#why-us"
              class="site-footer__link"
              @click.prevent="scrollToSection('#why-us')"
            >Why Choose Us</a>
            <a
              href="#confirm-final-quote"
              class="site-footer__link"
              @click.prevent="scrollToGetQuote()"
            >Book Free Measurement</a>
          </nav>

          <div class="site-footer__contact">
            <a
              class="site-footer__email"
              :href="'mailto:' + (cfg.targetEmail || 'info@loomihomepatios.ca')"
            >{{ cfg.targetEmail || 'info@loomihomepatios.ca' }}</a>
            <p class="site-footer__area">
              Vancouver, Burnaby, Richmond, Surrey, Delta, Coquitlam &amp; nearby
            </p>
          </div>

          <p class="site-footer__cta">
            Get a quote in about 60 seconds in chat — or send photos for a faster refined estimate.
          </p>
          <p class="site-footer__copy">
            © 2026 LoomiHome Patios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>

    <!-- Fixed bottom-right chat -->
    <div
      v-show="siteLoaded"
      id="estimate-chat-dock"
      ref="chatWidgetDock"
      class="chat-widget-dock"
      :class="{
        'chat-widget-dock--mobile-bubble': chatLayoutMobile,
        'chat-widget-dock--panel-open': chatLayoutMobile && chatMobilePanelOpen,
        'chat-widget-dock--desktop-minimized': !chatLayoutMobile && chatDesktopMinimized,
        'chat-widget-dock--hero-highlight': chatHeroHighlight,
      }"
    >
      <button
        v-show="!chatDockPanelOpen"
        type="button"
        class="chat-mobile-launcher"
        aria-label="Open chat assistant"
        @click="openChatPanel"
      >
        <span class="chat-mobile-launcher-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </span>
        <span
          class="bot-avatar-status chat-launcher-online-dot"
          aria-hidden="true"
        ></span>
      </button>
      <div
        v-show="chatDockPanelOpen"
        class="chat-widget-panel chat-widget-panel--embed"
        role="dialog"
        aria-modal="false"
        :aria-label="
          (cfg.chatWidgetTitle || 'Get Your Estimate') +
          '. ' +
          (cfg.chatWidgetSubtitle ||
            'Start here for a fast estimate')
        "
        :style="chatPanelStyle"
      >
        <div
          class="chat-resize-handle"
          @mousedown="startChatResize"
          @touchstart.prevent="startChatResize"
        >
          <span class="chat-resize-bar" aria-hidden="true"></span>
        </div>
        <div class="chat-widget-header">
          <div class="chat-widget-header-lead">
            <span class="chat-widget-ai-badge" title="AI assistant">AI</span>
            <div class="chat-widget-header-text">
              <span class="chat-widget-header-title">{{
                cfg.chatWidgetTitle || 'Get Your Estimate'
              }}</span>
              <span class="chat-widget-header-subtitle">{{
                cfg.chatWidgetSubtitle ||
                  'Start here for a fast estimate'
              }}</span>
            </div>
          </div>
          <button
            type="button"
            class="chat-widget-close"
            aria-label="Close chat"
            title="Close"
            @click="collapseChatPanel"
          >
            <svg
              class="chat-widget-close-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="chat-section chat-widget-section">
          <div class="chat-container">
            <div class="chat-messages" ref="chatMessages">
              <div class="message bot-message">
                <div class="bot-avatar">
                  <span class="avatar-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  <span class="bot-avatar-status" aria-hidden="true"></span>
                </div>
                <div class="message-bubble bot-bubble">
                  <p
                    v-for="(line, i) in s1.welcomeMessages"
                    :key="i"
                    v-html="line"
                  ></p>
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
                  <div v-if="msg.type === 'bot'" class="bot-avatar">
                    <span class="avatar-icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </span>
                    <span class="bot-avatar-status" aria-hidden="true"></span>
                  </div>
                  <div
                    :class="[
                      'message-bubble',
                      msg.type === 'user' ? 'user-bubble' : 'bot-bubble',
                    ]"
                  >
                    <p v-html="highlightProducts(msg.text, msg.type)"></p>
                  </div>
                </div>

                <!-- Single product card with gallery thumbnails -->
                <div v-if="msg.productCard" class="chat-product-card">
                  <img
                    :src="publicAssetUrl(msg.productCard.image)"
                    :alt="msg.productCard.name"
                    class="chat-product-img"
                    @click="chatLightboxImage = publicAssetUrl(msg.productCard.image)"
                  />
                  <div class="chat-product-info">
                    <h4 class="chat-product-name">{{ msg.productCard.name }}</h4>
                    <p class="chat-product-desc">{{ msg.productCard.description }}</p>
                  </div>
                  <div v-if="msg.productCard.gallery && msg.productCard.gallery.length" class="chat-product-gallery">
                    <img
                      v-for="(img, gi) in msg.productCard.gallery"
                      :key="gi"
                      :src="publicAssetUrl(img)"
                      :alt="msg.productCard.name + ' project ' + (gi + 1)"
                      class="chat-gallery-thumb"
                      @click="chatLightboxImage = publicAssetUrl(img)"
                    />
                  </div>
                </div>

                <!-- Multiple product option cards -->
                <div v-if="msg.productCards && msg.productCards.length" class="chat-product-options">
                  <div
                    v-for="(pc, pi) in msg.productCards"
                    :key="pi"
                    class="chat-product-option"
                    @click="chatLightboxImage = publicAssetUrl(pc.image)"
                  >
                    <img
                      :src="publicAssetUrl(pc.image)"
                      :alt="pc.name"
                      class="chat-option-img"
                    />
                    <div class="chat-option-info">
                      <h4 class="chat-option-name">{{ pc.name }}</h4>
                      <p class="chat-option-desc">{{ pc.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Booking options: Quick Book + Full Form -->
                <div
                  v-if="msg.type === 'bot' && msg.showCta && !chatBookingForm.success"
                  class="chat-cta-card"
                >
                  <h4 class="chat-cta-title">Have your rough price? Book a free measurement</h4>
                  <div class="chat-cta-actions">
                    <button
                      type="button"
                      class="chat-cta-btn primary"
                      @click="triggerQuickBook()"
                    >
                      Quick Book
                    </button>
                    <button
                      type="button"
                      class="chat-cta-btn secondary"
                      @click="scrollToAppointmentFromChat()"
                    >
                      Upload Photos &amp; Book
                    </button>
                  </div>
                </div>

                <!-- Quick Book mini form inline -->
                <div
                  v-if="msg.type === 'bot' && msg.showQuickBookForm && chatBookingForm.visible && !chatBookingForm.success"
                  class="chat-booking-card"
                >
                  <div class="chat-booking-card__head">
                    <h4 class="chat-booking-title">Quick Book</h4>
                    <button
                      type="button"
                      class="chat-booking-close"
                      aria-label="Minimize Quick Book"
                      title="Minimize — use Quick Book button below to open again"
                      @click="closeChatQuickBook"
                    >
                      <svg
                        class="chat-booking-close-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form class="chat-booking-form" @submit.prevent="submitChatBookingForm">
                    <div class="chat-booking-field">
                      <input
                        v-model="chatBookingForm.name"
                        type="text"
                        placeholder="Full Name *"
                        autocomplete="name"
                      />
                      <span v-if="chatBookingForm.errors.name" class="chat-booking-err">{{ chatBookingForm.errors.name }}</span>
                    </div>
                    <div class="chat-booking-field">
                      <input
                        v-model="chatBookingForm.email"
                        type="email"
                        placeholder="Email *"
                        autocomplete="email"
                      />
                      <span v-if="chatBookingForm.errors.email" class="chat-booking-err">{{ chatBookingForm.errors.email }}</span>
                    </div>
                    <div class="chat-booking-field">
                      <input
                        v-model="chatBookingForm.phone"
                        type="tel"
                        placeholder="Phone Number *"
                        autocomplete="tel"
                      />
                      <span v-if="chatBookingForm.errors.phone" class="chat-booking-err">{{ chatBookingForm.errors.phone }}</span>
                    </div>
                    <div class="chat-booking-field">
                      <input
                        v-model="chatBookingForm.city"
                        type="text"
                        placeholder="Address *"
                        autocomplete="street-address"
                      />
                      <span v-if="chatBookingForm.errors.city" class="chat-booking-err">{{ chatBookingForm.errors.city }}</span>
                    </div>
                    <button
                      type="submit"
                      class="chat-booking-submit"
                      :disabled="chatBookingForm.submitting"
                    >
                      {{ chatBookingForm.submitting ? 'Sending...' : 'Submit Request' }}
                    </button>
                    <p v-if="chatBookingForm.error" class="chat-booking-form-err">{{ chatBookingForm.error }}</p>
                  </form>
                  <p class="chat-booking-hint">Final pricing confirmed after the site visit.</p>
                </div>
              </div>

              <div v-if="isTyping" class="message bot-message">
                <div class="bot-avatar">
                  <span class="avatar-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  <span class="bot-avatar-status" aria-hidden="true"></span>
                </div>
                <div class="message-bubble bot-bubble typing-bubble">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            </div>

            <div class="chat-input-wrap">
              <div class="chat-input">
                <input
                  ref="chatInput"
                  v-model="userInput"
                  type="text"
                  :placeholder="
                    s1.chatPlaceholder ||
                    'Type your project details (city + size)...'
                  "
                  @keyup.enter="sendMessage"
                />
                <button class="send-btn" type="button" @click="sendMessage">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
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
    </div>

    <Teleport to="body">
      <div
        v-if="serviceModalService"
        class="service-modal-overlay"
        @click.self="closeServiceModal"
      >
        <div
          class="service-modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <button
            type="button"
            class="service-modal-close"
            aria-label="Close"
            @click="closeServiceModal"
          >
            ×
          </button>
          <img
            v-if="serviceModalService.image"
            :src="publicAssetUrl(serviceModalService.image)"
            :alt="serviceModalService.name"
            class="service-modal-hero"
          />
          <h2 id="service-modal-title" class="service-modal-title">
            {{ serviceModalService.name }}
          </h2>
          <p class="service-modal-desc">{{ serviceModalService.description }}</p>
          <ul class="service-modal-list">
            <li
              v-for="(line, i) in serviceModalService.modalBullets"
              :key="i"
            >
              {{ line }}
            </li>
          </ul>
          <p
            v-if="serviceModalService.modalBestFor"
            class="service-modal-best"
          >
            Best for: {{ serviceModalService.modalBestFor }}
          </p>
          <div v-if="serviceModalGallery.length" class="service-modal-gallery">
            <img
              v-for="(img, gi) in serviceModalGallery"
              :key="gi"
              :src="img"
              :alt="serviceModalService.name + ' project ' + (gi + 1)"
              class="service-modal-thumb"
              @click="chatLightboxImage = img"
            />
          </div>
          <button
            type="button"
            class="service-modal-projects-btn"
            @click="viewAllProjects()"
          >
            View All Projects
          </button>
        </div>
      </div>
    </Teleport>

    <Teleport v-if="chatLightboxDisplaySrc" to="body">
      <div
        class="chat-lightbox-overlay"
        @click="closeChatLightbox"
      >
        <button
          type="button"
          class="chat-lightbox-close"
          aria-label="Close image"
          @click.stop="closeChatLightbox"
        >&times;</button>
        <img
          :src="chatLightboxDisplaySrc"
          class="chat-lightbox-img"
          alt=""
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>

<script>
import siteData from './data/siteData.json';

import { CITY_PAGES, CITY_PAGE_ORDER } from './data/cityPages';
import { GUIDE_PAGES, GUIDE_PAGE_ORDER } from './data/guidePages';
import { SERVICE_PAGES, SERVICE_PAGE_ORDER } from './data/servicePages';
import { faqPageNode, injectJsonLd, localBusinessNode, removeJsonLd } from './utils/seoHead';
import { cssUrlValue, publicAssetUrl } from './utils/publicAssetUrl';

export default {
  name: 'HomePage',
  data() {
    return {
      siteLoaded: false,
      userInput: '',
      isTyping: false,
      messages: [],
      cfg: {},
      s1: {
        welcomeMessages: [],
        heroTitle: '',
        trustPoints: [],
        productsHeading: '',
        productsLead: '',
        seoHeading: '',
        seoBody: '',
        seoServiceArea: '',
        faqTitle: '',
        faqItems: [],
      },
      s2: { cities: [] },
      s3: {},
      services: [],
      projects: [],
      features: [],
      benefits: [],
      beforeAfter: null,
      activeCity: '',
      activeProjectType: 'Aluminum',
      projectTypes: ['Aluminum', 'Glass', 'A-Type', 'Skyline', 'Sunroom'],
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
      serviceModalService: null,
      chatResizeHeight: null,
      chatResizeStartY: 0,
      chatResizeStartH: 0,
      chatLightboxImage: null,
      /** ≤640px: show FAB first; tap opens panel */
      chatLayoutMobile: false,
      chatMobilePanelOpen: false,
      /** Desktop: when true, panel hidden and FAB shown (same as mobile collapsed) */
      chatDesktopMinimized: false,
      /** Brief attention state after "Start My Estimate" (hero CTA) */
      chatHeroHighlight: false,
      /** Persistent anonymous id for /ask + logging (localStorage) */
      visitorId: '',
      chatBookingForm: {
        visible: false,
        name: '',
        phone: '',
        email: '',
        city: '',
        projectType: '',
        submitting: false,
        success: false,
        error: '',
        errors: {},
      },
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
    /** Booking form side panel: user’s first upload, else default showcase project photo */
    appointmentDecoDisplaySrc() {
      if (this.appointmentPhotoPreviews && this.appointmentPhotoPreviews.length > 0) {
        return this.appointmentPhotoPreviews[0].url;
      }
      const primary =
        (this.cfg && (this.cfg.appointmentShowcaseImage || this.cfg.appointmentDecoImage)) ||
        '/house/Aluminum/p12.jpg';
      return publicAssetUrl(primary);
    },
    appointmentDecoShowProjectOverlay() {
      return !this.appointmentPhotoPreviews || this.appointmentPhotoPreviews.length === 0;
    },
    appointmentDecoImageKey() {
      if (this.appointmentPhotoPreviews && this.appointmentPhotoPreviews.length > 0) {
        return this.appointmentPhotoPreviews[0].key;
      }
      return `showcase-${this.appointmentDecoDisplaySrc}`;
    },
    chatPanelStyle() {
      if (this.chatResizeHeight) {
        return { height: this.chatResizeHeight + 'px' };
      }
      return {};
    },
    /** Chat panel visible: mobile when open; desktop when not minimized */
    chatDockPanelOpen() {
      if (this.chatLayoutMobile) return this.chatMobilePanelOpen;
      return !this.chatDesktopMinimized;
    },
    serviceModalGallery() {
      if (!this.serviceModalService) return [];
      const name = this.serviceModalService.name || '';
      const prefixMap = {
        'Glass Patio Covers': 'glass patio cover',
        'Aluminum Patio Covers': 'aluminum',
        'Skyline Combo Covers': 'skyline',
        'Sunrooms': 'sunroom',
      };
      const prefix = prefixMap[name] || '';
      if (!prefix) return [];
      return (this.projects || [])
        .filter((p) => (p.name || '').toLowerCase().includes(prefix))
        .map((p) => publicAssetUrl(p.image))
        .slice(0, 6);
    },
    serviceNavLinks() {
      const labels = {
        aluminum: 'Aluminum patio covers',
        glass: 'Glass patio covers',
        skyline: 'Skyline combo',
        sunrooms: 'Sunrooms',
      };
      return SERVICE_PAGE_ORDER.map((k) => ({
        to: SERVICE_PAGES[k].path,
        label: labels[k],
      }));
    },
    faqList() {
      return Array.isArray(this.s1.faqItems) ? this.s1.faqItems : [];
    },
    cityPageLinks() {
      return CITY_PAGE_ORDER.map((id) => ({
        path: CITY_PAGES[id].path,
        label: `Patio covers — ${id.charAt(0).toUpperCase() + id.slice(1)}`,
      }));
    },
    guidePageLinks() {
      const labels = {
        'patio-cover-cost': 'Patio cover cost in Vancouver',
        'glass-vs-aluminum': 'Glass vs aluminum patio covers',
        permit: 'Patio cover permits',
        rain: 'Best cover for rain',
        'install-timeline': 'How long installation takes',
      };
      return GUIDE_PAGE_ORDER.map((id) => ({
        path: GUIDE_PAGES[id].path,
        label: labels[id] || id,
      }));
    },
    /** Non-empty string only — Teleport + img must never bind null/invalid `is`-like state (Vue 3.2). */
    chatLightboxDisplaySrc() {
      const raw = this.chatLightboxImage;
      if (raw == null) return '';
      const s = String(raw).trim();
      if (!s) return '';
      if (/^https?:\/\//i.test(s)) return s;
      if (s.startsWith('data:') || s.startsWith('blob:')) return s;
      return publicAssetUrl(s);
    },
    heroBackdropStyle() {
      const u = cssUrlValue(this.cfg && this.cfg.heroBackground);
      if (!u) return {};
      return {
        backgroundImage: `url("${u}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      };
    },
  },
  created() {
    const d = siteData;
    this.cfg = d.site;
    this.s1 = d.section1;
    this.s2 = d.section2;
    this.s3 = d.section3;
    this.services = d.services;
    this.beforeAfter = d.beforeAfterProjects || null;
    this.projects = d.projects;
    this.randomizeProjects();
    this.features = d.features;
    this.benefits = d.benefits;
    this.activeCity = d.section2.cities[0];
    this.siteLoaded = true;
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.chatLayoutMobile = window.matchMedia('(max-width: 640px)').matches;
    }
    if (typeof window !== 'undefined') {
      this.getOrCreateVisitorId();
      if (typeof window !== 'undefined' && window.console) {
        console.log('VISITOR_DEBUG', window.localStorage.getItem('loomihome_visitor_id'));
      }
    }
  },
  mounted() {
    this._onServiceModalEscape = (e) => {
      if (e.key === 'Escape' && this.chatLightboxDisplaySrc) {
        this.closeChatLightbox();
        return;
      }
      if (e.key === 'Escape' && this.serviceModalService) {
        this.closeServiceModal();
      }
      if (e.key === 'Escape' && this.chatDockPanelOpen) {
        this.collapseChatPanel();
      }
    };
    window.addEventListener('keydown', this._onServiceModalEscape);

    try {
      if (sessionStorage.getItem('openChat') === '1') {
        sessionStorage.removeItem('openChat');
        this.$nextTick(() => this.openChatPanel());
      }
    } catch {
      /* ignore */
    }

    this._mqChatMobile = window.matchMedia('(max-width: 640px)');
    this._onChatMobileMql = () => {
      const mobile = this._mqChatMobile.matches;
      this.chatLayoutMobile = mobile;
      if (!mobile) {
        this.chatMobilePanelOpen = false;
      }
    };
    this._onChatMobileMql();
    if (this._mqChatMobile.addEventListener) {
      this._mqChatMobile.addEventListener('change', this._onChatMobileMql);
    } else if (this._mqChatMobile.addListener) {
      this._mqChatMobile.addListener(this._onChatMobileMql);
    }

    const graph = [localBusinessNode()];
    const faqNode = faqPageNode(this.faqList);
    if (faqNode) graph.push(faqNode);
    injectJsonLd({ '@context': 'https://schema.org', '@graph': graph });
  },
  beforeUnmount() {
    removeJsonLd();
    window.removeEventListener('keydown', this._onServiceModalEscape);
    if (this._mqChatMobile && this._onChatMobileMql) {
      if (this._mqChatMobile.removeEventListener) {
        this._mqChatMobile.removeEventListener('change', this._onChatMobileMql);
      } else if (this._mqChatMobile.removeListener) {
        this._mqChatMobile.removeListener(this._onChatMobileMql);
      }
    }
  },
  methods: {
    publicAssetUrl,
    /** Hero primary CTA — open chat in place (no page scroll; avoids jumping toward booking). */
    /** Absolute URL for public/ assets (helps some hosts + lightbox). */
    resolvedPublicUrl(path) {
      if (path == null) return '';
      if (typeof path !== 'string') return '';
      const raw = path.trim();
      if (!raw) return '';
      const t = publicAssetUrl(raw);
      if (!t) return '';
      if (/^https?:\/\//i.test(t)) return t;
      if (t.startsWith('data:') || t.startsWith('blob:')) return t;
      if (typeof window !== 'undefined' && t.startsWith('/')) {
        return `${window.location.origin}${t}`;
      }
      return t;
    },
    closeChatLightbox() {
      this.chatLightboxImage = null;
    },
    openBeforeAfterLightbox(path) {
      const url = this.resolvedPublicUrl(path);
      if (typeof url === 'string' && url.length > 0) {
        this.chatLightboxImage = url;
      }
    },
    startEstimateFromHero() {
      this.openChatPanel({ focusPreventScroll: true });
      this.chatHeroHighlight = true;
      clearTimeout(this._chatHeroHighlightTimer);
      this._chatHeroHighlightTimer = setTimeout(() => {
        this.chatHeroHighlight = false;
        this._chatHeroHighlightTimer = null;
      }, 1350);
    },
    openChatPanel(options = {}) {
      const focusPreventScroll = !!options.focusPreventScroll;
      if (this.chatLayoutMobile) {
        this.chatMobilePanelOpen = true;
      } else {
        this.chatDesktopMinimized = false;
      }
      this.$nextTick(() => {
        const inp = this.$refs.chatInput;
        if (inp && typeof inp.focus === 'function') {
          inp.focus(focusPreventScroll ? { preventScroll: true } : undefined);
        }
        this.scrollToBottom();
      });
    },
    collapseChatPanel() {
      if (this.chatLayoutMobile) {
        this.chatMobilePanelOpen = false;
      } else {
        this.chatDesktopMinimized = true;
      }
    },
    generateMessageId() {
      return `m_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    },
    replaceMessageById(messageId, fields) {
      const idx = this.messages.findIndex((m) => m.id === messageId);
      if (idx === -1) return;
      const prev = this.messages[idx];
      this.messages.splice(idx, 1, { ...prev, ...fields });
    },
    /** v_ + 3 chars from Math.random base36; only when creating a new visitor id. */
    generateVisitorId() {
      return `v_${Math.random().toString(36).slice(2, 5)}`;
    },
    /** Always returns a non-empty id for /ask (localStorage key: loomihome_visitor_id). */
    getOrCreateVisitorId() {
      if (typeof window === 'undefined') return '';
      const KEY = 'loomihome_visitor_id';
      try {
        let id = window.localStorage.getItem(KEY);
        if (!id) {
          id = this.generateVisitorId();
          window.localStorage.setItem(KEY, id);
        }
        this.visitorId = id;
        return id;
      } catch {
        const fallback = this.generateVisitorId();
        this.visitorId = fallback;
        return fallback;
      }
    },
    /** Log a bot/system line to the same Google Sheet as /ask (fire-and-forget). */
    logChatDisplayToSheet({ question, answer, email, phone } = {}) {
      if (typeof window === 'undefined' || !this.cfg || !this.cfg.chatApiUrl) return;
      let url;
      try {
        const u = new URL(this.cfg.chatApiUrl);
        u.pathname = '/log-chat-display';
        url = u.toString();
      } catch {
        return;
      }
      const em =
        email !== undefined && email !== null
          ? email
          : (this.chatBookingForm && this.chatBookingForm.email) || (this.form && this.form.email) || '';
      const ph =
        phone !== undefined && phone !== null
          ? phone
          : (this.chatBookingForm && this.chatBookingForm.phone) || (this.form && this.form.phone) || '';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: this.getOrCreateVisitorId(),
          question: String(question || '').slice(0, 4000),
          answer: String(answer || '').slice(0, 4000),
          project_type: (this.projectInfo && this.projectInfo.project_type) || '',
          city: (this.projectInfo && this.projectInfo.city) || '',
          email: em,
          phone: ph,
        }),
      }).catch(() => {});
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

      const productInquiry = this.detectProductInquiry(text);

      const placeholderId = this.generateMessageId();
      this.messages.push({
        id: placeholderId,
        type: 'bot',
        text: productInquiry ? 'Let me pull up some info on that...' : 'Got it — calculating your estimate...',
        showCta: false,
        isPlaceholder: true,
      });
      this.$nextTick(() => this.scrollToBottom());

      if (this.shouldOpenQuickBookFromChat(text)) {
        const intro = this.quickBookIntroForUserMessage(text);
        this.replaceMessageById(placeholderId, {
          type: 'bot',
          text: intro,
          showCta: false,
          showQuickBookForm: true,
          isPlaceholder: false,
        });
        this.logChatDisplayToSheet({ question: text, answer: intro });
        this.openChatPanel();
        this.showChatBookingForm();
        this.$nextTick(() => this.scrollToBottom());
        return;
      }

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

      let questionForAI = text;
      if (productInquiry) {
        if (productInquiry.isMulti) {
          questionForAI = `[Customer is asking about patio covers in general. Introduce all three patio cover types (Glass, Aluminum, Skyline Combo) briefly and ask which one interests them.] ${text}`;
        } else {
          questionForAI = `[Customer is asking about ${productInquiry.name}. Introduce this product briefly and naturally, then ask for their preferred size to give an estimate.] ${text}`;
        }
      }

      const history = this.messages
        .filter((m) => !m.isPlaceholder && m.text)
        .slice(-12)
        .map((m) => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));

      try {
        const askBody = {
          question: questionForAI,
          history,
          project_type: (this.projectInfo && this.projectInfo.project_type) || '',
          city: (this.projectInfo && this.projectInfo.city) || '',
          email: (this.form && this.form.email) || '',
          phone: (this.form && this.form.phone) || '',
          visitor_id: this.getOrCreateVisitorId(),
        };
        console.log('ASK_PAYLOAD_DEBUG', askBody);
        const res = await fetch(this.cfg.chatApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(askBody),
        });
        const data = await res.json();
        const answer = data.answer || 'Sorry, something went wrong.';
        const isPrice = this.isPriceResponse(answer);
        const aiAsksForDetails = this.aiAsksForContactDetails(answer);

        const showBookBtn = aiAsksForDetails || isPrice;
        let productCard = null;
        let productCards = null;
        if (productInquiry) {
          if (productInquiry.isMulti) {
            productCards = productInquiry.services.map((s) => ({ name: s.name, image: s.image, description: s.description }));
          } else {
            productCard = { name: productInquiry.name, image: productInquiry.image, description: productInquiry.description, gallery: productInquiry.gallery || [] };
          }
        }
        const forceQuickBook = this.aiAnswerShouldOpenQuickBook(answer, text);

        this.replaceMessageById(placeholderId, {
          type: 'bot',
          text: answer,
          isPrice,
          showCta: forceQuickBook ? false : showBookBtn,
          showQuickBookForm: !!forceQuickBook,
          productCard,
          productCards,
          isPlaceholder: false,
        });
        if (forceQuickBook) {
          this.openChatPanel();
          this.showChatBookingForm();
        }
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
    highlightProducts(text, msgType) {
      if (!text || msgType === 'user') return text;
      return text.replace(
        /\b(glass patio cover|aluminum patio cover|skyline combo cover|glass cover|aluminum cover|skyline combo|glass|aluminum|skyline)\b/gi,
        '<span class="chat-product-tag">$1</span>',
      );
    },
    scrollToBottom() {
      const el = this.$refs.chatMessages;
      if (el) el.scrollTop = el.scrollHeight;
    },
    detectProductInquiry(text) {
      if (!text) return null;
      const lower = text.toLowerCase();
      const services = this.cfg.services || [];
      const projects = this.cfg.projects || [];

      const productKeywords = [
        { keys: ['glass patio', 'glass cover', 'glass roof'], match: 'Glass Patio Covers', projectPrefix: 'Glass Patio Cover' },
        { keys: ['aluminum patio', 'aluminum cover', 'aluminium patio', 'aluminium cover', 'vpanel', 'v-panel', 'v panel'], match: 'Aluminum Patio Covers', projectPrefix: 'Aluminum' },
        { keys: ['skyline', 'combo cover', 'combo patio'], match: 'Skyline Combo Covers', projectPrefix: 'Skyline' },
        { keys: ['sunroom', 'sun room', 'four season', '4 season'], match: 'Sunrooms', projectPrefix: 'Sunroom' },
      ];

      for (const pk of productKeywords) {
        if (pk.keys.some((k) => lower.includes(k))) {
          const service = services.find((s) => s.name === pk.match);
          if (!service) return null;

          const gallery = projects
            .filter((p) => (p.name || '').toLowerCase().includes(pk.projectPrefix.toLowerCase()))
            .map((p) => p.image)
            .slice(0, 6);

          return { ...service, gallery, isMulti: false };
        }
      }

      const genericPatio = lower.includes('patio cover') || lower.includes('patiocover') || lower.includes('patio');
      if (genericPatio) {
        return { isMulti: true, services: services.filter((s) => s.name !== 'Sunrooms') };
      }

      return null;
    },
    /** Last bot turn suggested booking / measurement / CTA — used for short "yes"/"ok" follow-ups */
    recentBotSuggestedBooking() {
      const botMsgs = this.messages.filter(
        (m) =>
          m.type === 'bot' &&
          !m.isPlaceholder &&
          typeof m.text === 'string' &&
          m.text.trim(),
      );
      for (let i = botMsgs.length - 1; i >= 0; i--) {
        const msg = botMsgs[i];
        if (msg.showCta || msg.showQuickBookForm) return true;
        const t = msg.text.toLowerCase();
        if (
          /book|booking|measurement|appointment|schedule|on-site|onsite|site visit|free measurement|quick form|get booked|arrange.*visit|上门|预约|测量/.test(
            t,
          )
        ) {
          return true;
        }
      }
      return false;
    },
    quickBookIntroForUserMessage(userText) {
      if (userText && /[\u4e00-\u9fff]/.test(userText)) {
        return '好的 — 请填写下面的快速表单，我们会安排免费上门测量。';
      }
      return 'Perfect — fill in the quick form below and we\'ll arrange your free on-site measurement.';
    },
    /** Strong booking / schedule intent → open in-chat Quick Book (no redirect to section 3) */
    shouldOpenQuickBookFromChat(text) {
      if (!text || typeof text !== 'string') return false;

      if (this.isSiteMeasurementRequest(text)) return true;

      const raw = text.trim();
      const lower = raw.toLowerCase();

      const looksLikeBookingRefusal =
        /(\bno\b|\bnot\b|\bdon't\b|\bdont\b|\bnever\b|\bcancel\b).{0,32}\b(book|appointment|schedule|预约|测量)|\b(book|appointment|schedule|预约).{0,32}(\bno\b|\bnot\b|\bcancel\b|\bdon't\b|\bdont\b)/i.test(
          raw,
        );
      if (looksLikeBookingRefusal) return false;

      const zhStrong =
        /预约|预订|想预约|要预约|我要预约|快速预约|预约测量|上门测量|安排测量|免费测量|现在预约|马上预约|订测量|测量预约|想订测量|怎么预约|如何预约/.test(
          raw,
        );
      if (zhStrong) return true;

      if (/\b(book|books|booking)\b/i.test(lower)) return true;

      const enStrong = [
        'book now',
        'quick book',
        'i want book',
        'i want to book',
        'want to book',
        'need to book',
        'would like to book',
        'how to book',
        'how do i book',
        'how can i book',
        'book free measurement',
        'book measurement',
        'book an appointment',
        'book appointment',
        'book a measurement',
        'make an appointment',
        'set up an appointment',
        'set up appointment',
        'schedule',
        'appointment',
        'schedule a visit',
        'schedule visit',
        'schedule measurement',
        'book it',
        'go ahead and book',
        'sign me up',
        'register me',
      ];
      if (enStrong.some((p) => lower.includes(p))) return true;

      const soft = new Set([
        'yes',
        'yeah',
        'yep',
        'yup',
        'sure',
        'ok',
        'okay',
        'sounds good',
        'please',
        'do it',
        'go ahead',
        "let's do it",
        'lets do it',
      ]);
      const norm = lower.replace(/[!?.]+$/g, '').trim();
      if (soft.has(norm) && this.recentBotSuggestedBooking()) return true;

      return false;
    },
    /**
     * If the API still answered with “use the quick form in the chat” but local intent was missed,
     * open the real Quick Book UI so the user is not stuck on text-only.
     */
    aiAnswerShouldOpenQuickBook(answer, userText) {
      if (!answer || typeof answer !== 'string' || !userText) return false;
      const a = answer.toLowerCase();
      const mentionsInChatForm =
        /quick form|in the chat|use the quick|fill in the quick|chat to get booked|quick book form|in-chat|快速表单|聊天窗口|填写.*表单/.test(
          a,
        );
      if (!mentionsInChatForm) return false;
      return this.shouldOpenQuickBookFromChat(userText);
    },
    isSiteMeasurementRequest(text) {
      if (!text) return false;
      const lower = text.toLowerCase();

      const phrases = [
        'book measurement',
        'book a measurement',
        'book free measurement',
        'need on-site measurement',
        'need onsite measurement',
        'i need someone to measure',
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
        'Free site measurement can be arranged. Please book the appointment form and the team can confirm final pricing on site.',
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
    scrollToGetQuote() {
      this.scrollToSection('#confirm-final-quote');
      this.appointmentHighlight = true;
      setTimeout(() => {
        this.appointmentHighlight = false;
      }, 1500);
    },
    scrollToSection(selector) {
      const target = this.$el.querySelector(selector);
      if (!target || typeof target.scrollIntoView !== 'function') return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    hasServiceModal(service) {
      return (
        Array.isArray(service?.modalBullets) && service.modalBullets.length > 0
      );
    },
    openServiceModal(service) {
      if (!this.hasServiceModal(service)) return;
      this.serviceModalService = service;
    },
    closeServiceModal() {
      this.serviceModalService = null;
    },
    viewAllProjects() {
      this.serviceModalService = null;
      this.$nextTick(() => {
        const el = this.$el.querySelector('.section-projects');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    aiAsksForContactDetails(text) {
      if (!text) return false;
      const lower = text.toLowerCase();
      const cues = [
        'your name', 'your phone', 'your email', 'your contact',
        'your address', 'contact info', 'contact details',
        'reach you', 'get in touch', 'provide your',
        'share your name', 'share your phone',
      ];
      return cues.some((c) => lower.includes(c));
    },
    /** Latest bot message that carries the in-chat Quick Book (still active). */
    latestQuickBookHostMessage() {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        const m = this.messages[i];
        if (m.type === 'bot' && m.showQuickBookForm && !this.chatBookingForm.success) {
          return m;
        }
      }
      return null;
    },
    showChatBookingForm() {
      if (this.chatBookingForm.success) return;
      this.openChatPanel();
      this.chatBookingForm.visible = true;
      const host = this.latestQuickBookHostMessage();
      if (host) {
        host.showCta = false;
      }
      if (this.projectInfo.city) {
        this.chatBookingForm.city = this.projectInfo.city;
      }
    },
    closeChatQuickBook() {
      this.chatBookingForm.visible = false;
      this.chatBookingForm.errors = {};
      this.chatBookingForm.error = '';
      const host = this.latestQuickBookHostMessage();
      if (host) {
        host.showCta = true;
      }
      this.$nextTick(() => this.scrollToBottom());
    },
    triggerQuickBook() {
      const host = this.latestQuickBookHostMessage();
      if (host) {
        host.showCta = false;
        this.showChatBookingForm();
        this.$nextTick(() => this.scrollToBottom());
        return;
      }
      const quickBookIntro =
        'Perfect — fill in the quick form below and we\'ll arrange your free on-site measurement.';
      this.messages.push({
        id: this.generateMessageId(),
        type: 'bot',
        text: quickBookIntro,
        showCta: false,
        showQuickBookForm: true,
        isPlaceholder: false,
      });
      this.logChatDisplayToSheet({ question: '[quick_book:cta]', answer: quickBookIntro });
      this.showChatBookingForm();
      this.$nextTick(() => this.scrollToBottom());
    },
    scrollToAppointmentFromChat() {
      this.collapseChatPanel();
      this.$nextTick(() => {
        this.handleChatCtaClick();
        this.scrollToAppointment();
      });
    },
    inferProjectType() {
      if (this.chatBookingForm.projectType) return this.chatBookingForm.projectType;

      const { project_type, material_type } = this.projectInfo;
      if (project_type === 'Sunroom') return 'Sunroom';
      if (material_type === 'Glass') return 'Glass Patio Cover';
      if (material_type === 'Aluminum') return 'Aluminum Patio Cover';
      if (project_type === 'Patio Cover') return 'Patio Cover';

      const allText = this.messages.map((m) => m.text || '').join(' ').toLowerCase();
      if (allText.includes('sunroom')) return 'Sunroom';
      if (allText.includes('glass')) return 'Glass Patio Cover';
      if (allText.includes('aluminum') || allText.includes('aluminium')) return 'Aluminum Patio Cover';
      if (allText.includes('skyline')) return 'Skyline Combo Cover';
      return 'Patio Cover / Sunroom';
    },
    validateChatBookingForm() {
      const errs = {};
      if (!this.chatBookingForm.name.trim()) errs.name = 'Name is required';
      if (!this.chatBookingForm.phone.trim()) errs.phone = 'Phone is required';
      if (!this.chatBookingForm.email.trim()) errs.email = 'Email is required';
      if (!this.chatBookingForm.city.trim()) errs.city = 'Address is required';
      this.chatBookingForm.errors = errs;
      return Object.keys(errs).length === 0;
    },
    async submitChatBookingForm() {
      if (!this.validateChatBookingForm()) return;

      this.chatBookingForm.submitting = true;
      this.chatBookingForm.error = '';

      const payload = {
        source: 'website_chat',
        name: this.chatBookingForm.name.trim(),
        phone: this.chatBookingForm.phone.trim(),
        email: this.chatBookingForm.email.trim(),
        city: this.chatBookingForm.city.trim(),
        address: '',
        project_type: this.inferProjectType(),
        size: (this.projectInfo && this.projectInfo.size) || '',
        preferred_contact_time: '',
        message: 'User requested free on-site measurement from chat.',
        notes: 'Lead submitted from chat mini booking form.',
      };

      try {
        const url = this.cfg.leadApiUrl || 'https://fastapi-0bcw.onrender.com/lead';
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `Server responded with ${res.status}`);
        }

        this.chatBookingForm.success = true;
        this.chatBookingForm.visible = false;

        const leadThanks =
          'Got it 👍 Request received. A follow-up will be arranged shortly to confirm your free on-site measurement.';
        this.messages.push({
          id: this.generateMessageId(),
          type: 'bot',
          text: leadThanks,
          showCta: false,
        });
        this.logChatDisplayToSheet({
          question: '[lead:chat_quick_form]',
          answer: leadThanks,
          email: this.chatBookingForm.email.trim(),
          phone: this.chatBookingForm.phone.trim(),
        });
        this.$nextTick(() => this.scrollToBottom());
      } catch {
        this.chatBookingForm.error = 'Something went wrong. Please try again or use the booking form below.';
      } finally {
        this.chatBookingForm.submitting = false;
      }
    },
    startChatResize(e) {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const panel = this.$el.querySelector('.chat-widget-panel--embed');
      this.chatResizeStartY = clientY;
      this.chatResizeStartH = panel.offsetHeight;
      const onMove = (ev) => {
        const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
        const delta = this.chatResizeStartY - y;
        const newH = Math.min(Math.max(this.chatResizeStartH + delta, 200), window.innerHeight - 40);
        this.chatResizeHeight = newH;
      };
      const onEnd = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
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

        // Glass: 1,2,3,4,6,7 have fixed price & sqft ($13/sq ft rough model); rest are Custom build, no price/size
        const glassMatch = (project.name || '').match(/Glass Patio Cover Project (\d+)/i);
        if (glassMatch) {
          const num = parseInt(glassMatch[1], 10);
          if ([1, 2, 3, 4, 6, 7].includes(num)) {
            if (typeof project.price === 'number') {
              project.sqft = Math.round(project.price / 13 / 10) * 10;
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
          // Base ranges by type; sqft derived from same rough $/sq ft as chat pricing model
          let min = 4000;
          let max = 8000;
          let ratePerSqft = 12.5;

          if (name.includes('aluminum') || name.includes('pergola')) {
            min = 4000;
            max = 7000;
            ratePerSqft = 9;
          } else if (name.includes('glass')) {
            min = 5000;
            max = 8000;
            ratePerSqft = 13;
          } else if (name.includes('skyline')) {
            min = 5500;
            max = 8000;
            ratePerSqft = 12.5;
          } else if (name.includes('sunroom')) {
            min = 6000;
            max = 8000;
            ratePerSqft = 35;
          }

          project.price =
            Math.floor(min / 100) * 100 +
            Math.floor(Math.random() * ((max - min) / 100 + 1)) * 100;
          const rawSqft = project.price / ratePerSqft;
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
    onAppointmentDecoImageError(event) {
      const img = event && event.target;
      if (!img || (img.src && String(img.src).startsWith('blob:'))) return;
      const raw = [
        this.cfg && this.cfg.appointmentShowcaseFallback,
        this.cfg && this.cfg.appointmentDecoImage,
        '/house/Aluminum/p12.jpg',
        '/house/p23.jpg',
        '/house/sunrooms/sunroom3.jpeg',
      ].filter((u) => !!u);
      const chain = [...new Set(raw)];
      let step = Number(img.dataset.decoFallbackStep || 0);
      if (step >= chain.length) return;
      const next = chain[step];
      img.dataset.decoFallbackStep = String(step + 1);
      img.src = next;
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

      if (!email.trim() && !phone.trim()) {
        this.formError = 'Please provide at least an email address or a phone number.';
        this.formSubmitting = false;
        return;
      }

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
  background: #ffffff;
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

/* Full Background — photo from heroBackdropStyle when configured; soft fallback when not */
.hero-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f1f5f9;
  background-image: none;
  z-index: 0;
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
  background: rgba(15, 23, 42, 0.18);
  border-radius: 3px;
}

.app--service-modal-open .scroll-container {
  overflow: hidden;
}

/* Service detail popup (e.g. Glass Patio Covers) */
.service-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10060;
  background: rgba(15, 23, 42, 0.48);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right))
    max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
}

.service-modal-dialog {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 28px 28px 24px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.28),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.service-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #334155;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
  backdrop-filter: blur(4px);
}

.service-modal-close:hover {
  background: #fff;
  color: #0f172a;
}

.service-modal-title {
  margin: 0 36px 16px 0;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.25;
}

.service-modal-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #334155;
  font-size: 15px;
  line-height: 1.55;
}

.service-modal-list li + li {
  margin-top: 0.35em;
}

.service-modal-best {
  margin: 18px 0 0;
  padding-top: 14px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.45;
}

.service-modal-hero {
  width: calc(100% + 56px);
  margin: -28px -28px 18px;
  max-height: 260px;
  object-fit: contain;
  object-position: center;
  border-radius: 20px 20px 0 0;
  display: block;
  background: #f1f5f9;
  padding: 8px 0;
}

.service-modal-desc {
  margin: 0 0 14px;
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
}

.service-modal-gallery {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.service-modal-thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  border: 1px solid rgba(148, 163, 184, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
}

.service-modal-thumb:hover {
  transform: scale(1.06);
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.18);
}

.service-modal-projects-btn {
  display: block;
  width: 100%;
  margin-top: 18px;
  padding: 12px 0;
  border: none;
  border-radius: 12px;
  background: #111827;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.service-modal-projects-btn:hover {
  background: #1e293b;
}

/* Sections — full width of viewport (respect safe areas) */
.section {
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px max(16px, env(safe-area-inset-left)) 28px
    max(16px, env(safe-area-inset-right));
  scroll-snap-align: start;
  box-sizing: border-box;
}

.section-hero {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
  padding: 20px max(12px, env(safe-area-inset-left)) 24px
    max(12px, env(safe-area-inset-right));
  min-height: 100vh;
  max-height: none;
  overflow-x: hidden;
  overflow-y: visible;
  box-sizing: border-box;
}

.section-projects {
  align-items: stretch;
  padding: 40px max(12px, env(safe-area-inset-left)) 40px
    max(12px, env(safe-area-inset-right));
  box-sizing: border-box;
}

.section-projects .content-wrapper.glass-panel {
  border-radius: 0;
  width: 100%;
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: #ffffff;
}

.section-projects .content-wrapper.glass-panel::before {
  background: #ffffff;
}

.section-projects .header {
  border-bottom: none;
}

.section-projects .why-choose-us {
  border-top: none;
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
  max-width: none;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-hero .content-wrapper {
  flex: 0 1 auto;
  width: 100%;
  max-width: none;
  min-width: 0;
  min-height: 0;
  padding: 0;
  padding-bottom: 12px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  border-radius: 0;
}

/* Hero: let hero-bg photo show through — frosted glass, not a solid white sheet */
.section-hero .content-wrapper.glass-panel {
  border: none;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  background: transparent;
}

.section-hero .content-wrapper.glass-panel::before {
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.82) 0%,
    rgba(248, 250, 252, 0.76) 42%,
    rgba(241, 245, 249, 0.72) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
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
  padding: 20px max(16px, env(safe-area-inset-left)) 16px
    max(16px, env(safe-area-inset-right));
  overflow: visible;
  background-color: #ffffff;
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
  border-bottom: none;
}

.hero-header {
  width: 100%;
}

/* Brand (LoomiHome) + subtitle */
.hero-top-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px 32px;
  width: 100%;
}

.hero-brand-block {
  flex: 1 1 260px;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Company name — primary headline (suffix e.g. “Patios” is smaller) */
.site-brand {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.28em 0.4em;
  line-height: 1.08;
}

.site-brand-name {
  font-size: clamp(2.5rem, 7vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #0f172a;
}

.site-brand-suffix {
  /* Same font as .app; +4 size steps from base “Patios” scale */
  font-size: clamp(1.95rem, 3.15vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #64748b;
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

/* Tagline under brand */
.hero-title {
  font-size: clamp(1.2rem, 2.8vw, 1.5rem);
  line-height: 1.35;
  color: #334155;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  margin: 0;
  font-size: 16px;
  color: #334155;
  line-height: 1.5;
}

.hero-eyebrow {
  margin: 0 0 6px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25em 0.35em;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
}

.hero-eyebrow-name {
  color: #0f172a;
}

.hero-eyebrow-suffix {
  color: #94a3b8;
  font-weight: 600;
}

.hero-main-title {
  margin: 0 0 10px;
  font-size: clamp(1.65rem, 4.5vw, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: #0f172a;
}

.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  margin-top: 16px;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.hero-cta--primary {
  background: #0f172a;
  color: #fff;
  border-color: #0f172a;
}

.hero-cta--primary:hover {
  background: #1e293b;
  border-color: #1e293b;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
}

.hero-cta--primary:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 3px;
}

.hero-cta--secondary {
  background: #fff;
  color: #0f172a;
  border-color: #cbd5e1;
}

.hero-cta--secondary:hover {
  border-color: #0f172a;
  background: #f8fafc;
}

.hero-cta--secondary:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 3px;
}

/* Horizontal nav under hero heading */
.hero-subnav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 32px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  width: 100%;
}

.hero-subnav__link {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.02em;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.hero-subnav__link:hover {
  color: #334155;
  border-bottom-color: #0f172a;
}

.hero-subnav__link:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 3px;
  border-radius: 4px;
}

.hero-subnav__link--emphasized {
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.hero-subnav__link--inverse {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 10px;
  background: #0f172a;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  border-bottom: none;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.18);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-subnav__link--inverse:hover {
  color: #ffffff;
  border-bottom-color: transparent;
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.22);
}

.hero-subnav__link--inverse:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 3px;
}

#home {
  scroll-margin-top: 24px;
}

#our-products {
  scroll-margin-top: max(20px, env(safe-area-inset-top));
}

#before-after-projects {
  scroll-margin-top: 24px;
}

.our-products-intro {
  padding: 8px max(16px, env(safe-area-inset-left)) 4px
    max(16px, env(safe-area-inset-right));
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  margin-top: 4px;
}

.our-products-heading {
  margin: 0 0 6px;
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.2;
}

.our-products-lead {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #64748b;
  font-weight: 500;
  max-width: 40em;
}

#past-projects {
  scroll-margin-top: 24px;
}

#confirm-final-quote {
  scroll-margin-top: 24px;
}

#why-us {
  scroll-margin-top: 24px;
}

/* Site footer — light, modern */
.site-footer {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-top: 1px solid rgba(148, 163, 184, 0.32);
  scroll-snap-align: end;
}

.site-footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 52px 28px 40px;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.85fr) minmax(0, 1fr);
  gap: 36px 44px;
  grid-template-areas:
    'brand nav contact'
    'cta cta cta'
    'copy copy copy';
}

.site-footer__brand {
  grid-area: brand;
}

.site-footer__name {
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.site-footer__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.62;
  color: #64748b;
  max-width: 36em;
}

.site-footer__nav {
  grid-area: nav;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.site-footer__link {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.site-footer__link:hover {
  color: #0f172a;
  border-bottom-color: rgba(15, 23, 42, 0.2);
}

.site-footer__link:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 3px;
  border-radius: 2px;
}

.site-footer__contact {
  grid-area: contact;
}

.site-footer__email {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px solid rgba(15, 23, 42, 0.22);
  margin-bottom: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.site-footer__email:hover {
  color: #1d4ed8;
  border-bottom-color: rgba(29, 78, 216, 0.45);
}

.site-footer__email:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 3px;
  border-radius: 2px;
}

.site-footer__area {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.site-footer__cta {
  grid-area: cta;
  margin: 0;
  padding-top: 28px;
  border-top: 1px solid rgba(148, 163, 184, 0.28);
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  text-align: center;
  letter-spacing: -0.01em;
}

.site-footer__copy {
  grid-area: copy;
  margin: 0;
  padding-top: 14px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
}

@media (max-width: 900px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
    grid-template-areas:
      'brand'
      'contact'
      'nav'
      'cta'
      'copy';
    gap: 26px;
    padding: 44px 20px 36px;
  }

  .site-footer__nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px 20px;
  }

  .site-footer__link {
    border-bottom: none;
  }

  .site-footer__link:hover {
    border-bottom: none;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .site-footer__cta {
    padding-top: 22px;
  }

  .site-footer__copy {
    padding-top: 10px;
  }
}

/* Floating chat — fixed bottom-right */
.chat-widget-dock {
  position: fixed;
  bottom: max(12px, env(safe-area-inset-bottom));
  right: max(12px, env(safe-area-inset-right));
  left: auto;
  z-index: 10050;
  width: min(100vw - 24px, 400px);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
  pointer-events: none;
}

.chat-widget-dock .chat-widget-panel--embed {
  pointer-events: auto;
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  max-height: calc(100vh - 40px);
  height: min(520px, 72vh);
  flex: 0 0 auto;
  box-shadow: 0 24px 56px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  transform-origin: bottom right;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

/* Hero CTA "Start My Estimate" — obvious visual feedback */
@keyframes chat-widget-panel-attention {
  0% {
    box-shadow: 0 24px 56px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: scale(1);
  }
  18% {
    box-shadow:
      0 0 0 3px rgba(14, 165, 233, 0.95),
      0 0 48px 14px rgba(45, 212, 191, 0.55),
      0 28px 64px rgba(15, 23, 42, 0.38);
    transform: scale(1.035);
  }
  55% {
    box-shadow:
      0 0 0 2px rgba(14, 165, 233, 0.65),
      0 0 32px 8px rgba(45, 212, 191, 0.4),
      0 24px 56px rgba(15, 23, 42, 0.32);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 24px 56px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: scale(1);
  }
}

@keyframes chat-widget-launcher-attention {
  0% {
    transform: scale(1);
    box-shadow:
      0 8px 28px rgba(14, 165, 233, 0.42),
      0 4px 14px rgba(45, 212, 191, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
  20% {
    transform: scale(1.12);
    box-shadow:
      0 0 0 4px rgba(14, 165, 233, 0.9),
      0 0 36px 12px rgba(45, 212, 191, 0.65),
      0 12px 36px rgba(14, 165, 233, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
  }
  100% {
    transform: scale(1);
    box-shadow:
      0 8px 28px rgba(14, 165, 233, 0.42),
      0 4px 14px rgba(45, 212, 191, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }
}

.chat-widget-dock--hero-highlight .chat-widget-panel--embed {
  animation: chat-widget-panel-attention 1.25s cubic-bezier(0.34, 1.3, 0.64, 1)
    forwards;
}

.chat-widget-dock--hero-highlight.chat-widget-dock--mobile-bubble:not(
    .chat-widget-dock--panel-open
  )
  .chat-mobile-launcher,
.chat-widget-dock--hero-highlight.chat-widget-dock--desktop-minimized
  .chat-mobile-launcher {
  animation: chat-widget-launcher-attention 1.25s cubic-bezier(0.34, 1.3, 0.64, 1)
    forwards;
}

@media (prefers-reduced-motion: reduce) {
  .chat-widget-dock--hero-highlight .chat-widget-panel--embed,
  .chat-widget-dock--hero-highlight.chat-widget-dock--mobile-bubble:not(
      .chat-widget-dock--panel-open
    )
    .chat-mobile-launcher,
  .chat-widget-dock--hero-highlight.chat-widget-dock--desktop-minimized
    .chat-mobile-launcher {
    animation-duration: 0.01ms !important;
  }
}

/* Mobile bubble mode (viewport ≤640px) + desktop minimized: FAB only */
.chat-widget-dock--mobile-bubble .chat-mobile-launcher,
.chat-widget-dock--desktop-minimized .chat-mobile-launcher {
  position: relative;
  pointer-events: auto;
  align-self: flex-end;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(
    145deg,
    #5eead4 0%,
    #2dd4bf 28%,
    #22d3ee 58%,
    #0ea5e9 88%,
    #0284c7 100%
  );
  color: #f8fafc;
  box-shadow:
    0 8px 28px rgba(14, 165, 233, 0.42),
    0 4px 14px rgba(45, 212, 191, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.chat-widget-dock--mobile-bubble .chat-mobile-launcher:hover,
.chat-widget-dock--desktop-minimized .chat-mobile-launcher:hover {
  box-shadow:
    0 10px 34px rgba(14, 165, 233, 0.48),
    0 4px 16px rgba(45, 212, 191, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.chat-widget-dock--mobile-bubble .chat-mobile-launcher:active,
.chat-widget-dock--desktop-minimized .chat-mobile-launcher:active {
  transform: scale(0.95);
}

.chat-widget-dock--mobile-bubble .chat-mobile-launcher-icon,
.chat-widget-dock--desktop-minimized .chat-mobile-launcher-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4ade80;
  filter: drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))
    drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
}

.chat-widget-dock--mobile-bubble .chat-mobile-launcher-icon svg,
.chat-widget-dock--desktop-minimized .chat-mobile-launcher-icon svg {
  width: 26px;
  height: 26px;
  stroke-width: 2.4;
}

/* Green “online” dot on FAB (bottom-right of lightning) */
.chat-widget-dock .chat-launcher-online-dot {
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid rgba(255, 255, 255, 0.92);
  box-sizing: content-box;
  box-shadow:
    0 0 0 1px rgba(3, 105, 161, 0.35),
    0 0 8px rgba(34, 197, 94, 0.7),
    0 1px 3px rgba(15, 23, 42, 0.2);
  z-index: 2;
  pointer-events: none;
  animation: bot-avatar-status-pulse 2.6s ease-in-out infinite;
}

.chat-widget-dock--mobile-bubble:not(.chat-widget-dock--panel-open),
.chat-widget-dock--desktop-minimized {
  width: auto;
  max-width: none;
  left: auto;
  align-items: flex-end;
}

.chat-widget-dock--mobile-bubble .chat-resize-handle {
  display: none;
}

.chat-widget-dock--mobile-bubble .chat-widget-panel--embed {
  width: 100%;
  max-width: 100%;
}

.chat-resize-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 0 2px;
  cursor: ns-resize;
  user-select: none;
  -webkit-user-select: none;
}

.chat-resize-bar {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: #cbd5e1;
  transition: background 0.15s;
}

.chat-resize-handle:hover .chat-resize-bar {
  background: #94a3b8;
}

.chat-widget-dock .chat-widget-header {
  padding: 12px 16px;
}

.chat-widget-dock .chat-widget-header-title {
  font-size: 1.125rem;
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

.chat-product-tag {
  display: inline;
  font-weight: 650;
  color: #0f172a;
  background: rgba(15, 23, 42, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  font-size: 0.97em;
  letter-spacing: -0.01em;
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

/* Hero: all four patio products in one row on wide screens */
.section-hero .services-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 1200px) {
  .section-hero .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

.section-hero .card-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
}

.section-hero .card-product-title {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: #0f172a;
  margin: 0 0 2px;
}

.section-hero .card-price-block {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(148, 163, 184, 0.45);
}

.section-hero .card-price-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 2px;
}

.section-hero .card-price {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
  line-height: 1.2;
}

@media (min-width: 1201px) {
  .section-hero .service-card .card-info {
    padding: 12px 10px 14px;
  }

  .section-hero .card-product-title {
    font-size: 16px;
  }

  .section-hero .card-price {
    font-size: 17px;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  transition: box-shadow 0.25s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.service-card:hover {
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

/* Hero patio cards: flush with white page — no card chrome */
.section-hero .service-card {
  border: none;
  outline: none;
  box-shadow: none;
  background: #ffffff;
  background-color: #ffffff;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.section-hero .service-card:hover {
  border: none;
  outline: none;
  box-shadow: none;
}

/* Bullet cards: two per row on desktop (e.g. Glass | Aluminum) */
.service-card-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

/* Patio split row: image left, text column left-aligned */
.service-card-layout--split {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
}

.service-card-layout--split .card-image {
  flex: 0 0 42%;
  max-width: 42%;
  min-width: 0;
  align-self: stretch;
}

.service-card-layout--split .card-info {
  flex: 1 1 auto;
  min-width: 0;
  padding: 16px 18px 16px 12px;
  gap: 8px;
  justify-content: flex-start;
  align-items: stretch;
  text-align: left;
}

.service-card-layout--split .card-info h3 {
  text-align: left;
  align-self: stretch;
  width: 100%;
}

.service-card-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-card-bullets li {
  position: relative;
  padding-left: 1rem;
  font-size: 13px;
  line-height: 1.45;
  color: #000000;
}

.service-card-bullets li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: 700;
}

.service-card-best-for {
  margin: 4px 0 0;
  padding-top: 10px;
  border-top: 1px solid rgba(148, 163, 184, 0.4);
  font-size: 12px;
  line-height: 1.45;
  color: #000000;
}

.service-card-best-label {
  font-weight: 600;
  color: #000000;
  margin-right: 0.35em;
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

.card-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.04));
}

/* Hero product cards: identical image frames; full image inside (letterbox if needed) */
.section-hero .service-card .card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  flex-shrink: 0;
  overflow: hidden;
  background: #f8fafc;
}

.section-hero .service-card .card-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

.section-hero .service-card .card-image .card-image-overlay {
  position: absolute;
  z-index: 1;
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
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.card-image--modal-trigger {
  cursor: pointer;
}

.card-image--modal-trigger:hover img {
  transform: scale(1.03);
}

.card-info-heading--modal-trigger {
  cursor: pointer;
}

.card-info-heading--modal-trigger:hover {
  color: #334155;
}

.card-price--modal-trigger {
  cursor: pointer;
}

.card-price--modal-trigger:hover {
  opacity: 0.85;
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

.trust-strip--points {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.section-hero .trust-strip {
  border-top: none;
}

.trust-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.trust-item--line {
  justify-content: center;
}

.trust-line {
  font-size: 12px;
  font-weight: 600;
  color: #e5e7eb;
  line-height: 1.35;
}

/* Before & after project showcase (home) */
.home-before-after {
  margin-top: 16px;
  padding: 22px max(16px, env(safe-area-inset-left)) 24px
    max(16px, env(safe-area-inset-right));
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(255, 255, 255, 0.55);
}

.home-before-after__intro {
  margin-bottom: 18px;
}

.home-before-after__title {
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.home-before-after__subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: #64748b;
  max-width: 44em;
}

.home-before-after__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.25rem;
}

.home-before-after__card {
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}

.home-before-after__pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.home-before-after__shot {
  position: relative;
  margin: 0;
  min-height: 0;
  aspect-ratio: 4 / 3;
  background: #e2e8f0;
}

.home-before-after__shot:first-child {
  border-right: 1px solid rgba(226, 232, 240, 0.9);
}

.home-before-after__zoom-hit {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  cursor: zoom-in;
  background: #e2e8f0;
  line-height: 0;
  -webkit-tap-highlight-color: transparent;
}

.home-before-after__zoom-hit:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}

.home-before-after__zoom-hit img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.home-before-after__label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f8fafc;
  background: rgba(15, 23, 42, 0.78);
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.home-before-after__meta {
  padding: 14px 14px 16px;
}

.home-before-after__type {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
}

.home-before-after__facts {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
}

.home-before-after__sep {
  margin: 0 6px;
  color: #94a3b8;
}

.home-before-after__benefit {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #64748b;
}

.home-before-after__cta-block {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  text-align: center;
}

.home-before-after__cta-btn {
  margin-left: auto;
  margin-right: auto;
}

.home-before-after__cta-note {
  margin: 12px auto 0;
  max-width: 32rem;
  font-size: 14px;
  line-height: 1.5;
  color: #64748b;
}

.home-before-after__more {
  display: inline-block;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.home-before-after__more:hover {
  color: #1e293b;
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

.home-service-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(226, 232, 240, 0.85);
}

.home-service-nav__link {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px solid rgba(15, 23, 42, 0.2);
}

.home-service-nav__link:hover {
  border-bottom-color: #0f172a;
}

.home-seo-block {
  margin-top: 20px;
  padding: 20px 24px 22px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(248, 250, 252, 0.65);
}

.home-seo-block__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 10px;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.home-seo-block__body {
  margin: 0 0 10px;
  font-size: 15px;
  line-height: 1.55;
  color: #334155;
}

.home-seo-block__area {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

.home-faq {
  margin-top: 8px;
  padding: 20px 24px 24px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
}

.home-faq__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 14px;
  letter-spacing: -0.02em;
}

.home-faq__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.home-faq__item {
  border: 1px solid rgba(226, 232, 240, 0.95);
  border-radius: 10px;
  padding: 0 12px;
  background: #fff;
}

.home-faq__q {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  padding: 12px 4px;
  cursor: pointer;
  list-style: none;
}

.home-faq__q::-webkit-details-marker {
  display: none;
}

.home-faq__a {
  margin: 0 4px 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #475569;
}

.home-seo-hub {
  margin-top: 12px;
  padding: 22px 24px 24px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 12px 12px;
}

.home-seo-hub__title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.home-seo-hub__lead {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

.home-seo-hub__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem 1.5rem;
}

.home-seo-hub__h3 {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  margin: 0 0 10px;
}

.home-seo-hub__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home-seo-hub__list li {
  margin-bottom: 8px;
}

.home-seo-hub__list a {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.home-seo-hub__list a:hover {
  color: #1e293b;
}

.chat-widget-panel {
  display: flex;
  flex-direction: column;
  width: min(100vw - 24px, 300px);
  max-height: min(58vh, 400px);
  border-radius: 16px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.chat-widget-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  background: linear-gradient(180deg, #fff 0%, #f8fafc 100%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.95);
}

.chat-widget-header-lead {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.chat-widget-ai-badge {
  flex-shrink: 0;
  margin-top: 2px;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1;
  color: #fff;
  border-radius: 8px;
  background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.35);
}

.chat-widget-header-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.chat-widget-header-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  line-height: 1.25;
}

.chat-widget-header-subtitle {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
  color: #64748b;
  letter-spacing: -0.01em;
}

.chat-widget-close {
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: rgba(241, 245, 249, 0.9);
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.35);
}

.chat-widget-close-icon {
  width: 24px;
  height: 24px;
}

.chat-widget-close:hover {
  background: #e2e8f0;
  color: #0f172a;
  box-shadow: 0 0 0 1px rgba(100, 116, 139, 0.45);
}

.chat-widget-close:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

.chat-widget-dock .chat-section {
  border: none;
  padding: 0;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.chat-widget-dock .chat-container {
  margin: 0;
  max-width: 100%;
  width: 100%;
  min-height: 160px;
  max-height: none;
  border-radius: 0;
  box-shadow: none;
  border: none;
  background: #fafbfc;
}

.chat-widget-dock .chat-messages {
  padding: 14px 14px 10px;
  gap: 12px;
  max-height: none;
  min-height: 0;
  flex: 1;
}

.chat-widget-dock .message-bubble {
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.45;
}

.chat-widget-dock .message-bubble p + p {
  margin-top: 6px;
}

.chat-widget-dock .bot-avatar {
  position: relative;
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  border-radius: 8px;
}

.chat-widget-dock .bot-avatar .bot-avatar-status {
  right: -2px;
  bottom: -2px;
  width: 9px;
  height: 9px;
  border-width: 1.5px;
  border-color: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 0 0 1px rgba(34, 197, 94, 0.35),
    0 0 6px rgba(74, 222, 128, 0.55),
    0 1px 3px rgba(15, 23, 42, 0.2);
  animation: bot-avatar-status-pulse 2.6s ease-in-out infinite;
}

.chat-widget-dock .bot-avatar .avatar-icon {
  color: #4ade80;
  filter: drop-shadow(0 0 6px rgba(74, 222, 128, 0.9))
    drop-shadow(0 1px 2px rgba(15, 23, 42, 0.35));
}

.chat-widget-dock .avatar-icon svg {
  width: 15px;
  height: 15px;
  stroke-width: 2.5;
}

.chat-widget-dock .chat-input-wrap {
  padding: 8px 10px 10px;
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  background: #fff;
}

.chat-widget-dock .chat-input-helper {
  font-size: 10px;
  margin-bottom: 4px;
}

.chat-widget-dock .chat-input input {
  font-size: 13px;
  padding: 8px 10px;
}

.chat-widget-dock .send-btn {
  width: 36px;
  height: 36px;
}

.chat-widget-dock .typing-bubble {
  padding: 10px 14px;
}

.chat-widget-dock .chat-cta-card {
  margin: 4px 0 0 36px;
  padding: 10px 12px;
}

.chat-widget-dock .chat-cta-title {
  font-size: 12px;
}

.chat-widget-dock .chat-cta-text {
  font-size: 11px;
}

/* Product card in chat */
.chat-product-card {
  margin: 8px 0 4px 40px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.chat-product-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.chat-product-info {
  padding: 10px 12px;
}

.chat-product-name {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px 0;
}

.chat-product-desc {
  font-size: 11.5px;
  color: #4b5563;
  margin: 0;
  line-height: 1.45;
}

.chat-widget-dock .chat-product-card {
  margin: 4px 0 2px 36px;
}

.chat-widget-dock .chat-product-img {
  height: 90px;
}

.chat-widget-dock .chat-product-name {
  font-size: 12px;
}

.chat-widget-dock .chat-product-desc {
  font-size: 11px;
}

/* Gallery thumbnails inside product card */
.chat-product-gallery {
  display: flex;
  gap: 6px;
  padding: 0 10px 10px;
  overflow-x: auto;
}

.chat-gallery-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid rgba(148, 163, 184, 0.3);
  flex-shrink: 0;
  transition: transform 0.15s, box-shadow 0.15s;
}

.chat-gallery-thumb:hover {
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.18);
}

.chat-widget-dock .chat-gallery-thumb {
  width: 50px;
  height: 50px;
}

/* Multiple product option cards */
.chat-product-options {
  margin: 8px 0 4px 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-product-option {
  display: flex;
  gap: 10px;
  padding: 8px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.3);
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
}

.chat-product-option:hover {
  box-shadow: 0 3px 12px rgba(15, 23, 42, 0.12);
  transform: translateY(-1px);
}

.chat-option-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.chat-option-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.chat-option-name {
  font-size: 12.5px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2px;
}

.chat-option-desc {
  font-size: 11px;
  color: #4b5563;
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.chat-widget-dock .chat-product-options {
  margin: 4px 0 2px 36px;
}

.chat-widget-dock .chat-option-img {
  width: 52px;
  height: 52px;
}

.chat-widget-dock .chat-option-name {
  font-size: 11.5px;
}

.chat-widget-dock .chat-option-desc {
  font-size: 10.5px;
}

/* Lightbox overlay */
.chat-lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.chat-lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 10px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  object-fit: contain;
}

.chat-lightbox-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.15s;
}

.chat-lightbox-close:hover {
  opacity: 1;
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

/* Mini booking form inside chat */
.chat-booking-card {
  margin: 6px 0 0 36px;
  padding: 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.chat-booking-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.chat-booking-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  flex: 1;
  min-width: 0;
}

.chat-booking-close {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: rgba(241, 245, 249, 0.95);
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.35);
}

.chat-booking-close:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.chat-booking-close:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

.chat-booking-close-icon {
  width: 18px;
  height: 18px;
}

.chat-booking-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-booking-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-booking-field input {
  padding: 9px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: #1e293b;
  background: #f8fafc;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.chat-booking-field input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  background: #fff;
}

.chat-booking-field input::placeholder {
  color: #94a3b8;
}

.chat-booking-err {
  font-size: 11px;
  color: #dc2626;
  padding-left: 2px;
}

.chat-booking-select {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
  color: #64748b;
  background: #f8fafc;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.chat-booking-select:focus {
  border-color: #3b82f6;
}

.chat-booking-select:has(option:checked:not([value=""])) {
  color: #1e293b;
}

.chat-booking-submit {
  margin-top: 4px;
  padding: 10px 0;
  width: 100%;
  border: none;
  border-radius: 8px;
  background: #0f172a;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}

.chat-booking-submit:hover {
  background: #1e293b;
}

.chat-booking-submit:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.chat-booking-form-err {
  font-size: 11px;
  color: #dc2626;
  margin: 4px 0 0;
  text-align: center;
}

.chat-booking-hint {
  font-size: 11px;
  color: #64748b;
  margin: 8px 0 0;
  text-align: center;
}

.chat-widget-dock .chat-booking-card {
  margin: 4px 0 0 36px;
  padding: 12px;
}

.chat-widget-dock .chat-booking-title {
  font-size: 12px;
}

.chat-widget-dock .chat-booking-close {
  width: 36px;
  height: 36px;
}

.chat-widget-dock .chat-booking-close-icon {
  width: 19px;
  height: 19px;
}

.chat-widget-dock .chat-booking-field input {
  padding: 8px 9px;
  font-size: 12px;
}

.chat-widget-dock .chat-booking-submit {
  padding: 8px 0;
  font-size: 12px;
}

/* Persistent mini booking form in chat */
.chat-quick-book {
  border-top: 1px solid #e2e8f0;
  padding: 10px 12px;
  background: #f8fafc;
  flex-shrink: 0;
}

.chat-quick-book--success {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #16a34a;
  padding: 12px;
}

.chat-quick-book-header {
  margin-bottom: 8px;
}

.chat-quick-book-title {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

.chat-quick-book-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chat-quick-book-row {
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.chat-quick-book-field {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.chat-quick-book-field input,
.chat-quick-book-field select {
  width: 100%;
  padding: 7px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  color: #1e293b;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.chat-quick-book-field input:focus,
.chat-quick-book-field select:focus {
  border-color: #3b82f6;
}

.chat-quick-book-field input::placeholder {
  color: #94a3b8;
}

.chat-quick-book-field select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #64748b;
}

.chat-quick-book-field select:has(option:checked:not([value=""])) {
  color: #1e293b;
}

.chat-quick-book-btn {
  flex-shrink: 0;
  padding: 7px 14px;
  border: none;
  border-radius: 6px;
  background: #0f172a;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
  align-self: flex-start;
}

.chat-quick-book-btn:hover {
  background: #1e293b;
}

.chat-quick-book-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-quick-book .chat-booking-err {
  font-size: 10px;
  color: #dc2626;
  padding-left: 2px;
}

.chat-quick-book .chat-booking-form-err {
  font-size: 11px;
  color: #dc2626;
  margin: 2px 0 0;
}

@media (max-width: 900px) {
  .section-hero {
    padding: 12px max(12px, env(safe-area-inset-left)) 16px
      max(12px, env(safe-area-inset-right));
  }

  .section-hero .content-wrapper {
    max-width: none;
    padding-bottom: 10px;
  }

  .hero-top-row {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .hero-brand-block {
    max-width: 100%;
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

  .services-section {
    padding: 12px 18px 18px;
  }

  .chat-container {
    max-width: 100%;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .section-hero .services-grid {
    grid-template-columns: 1fr;
  }

  .trust-strip {
    grid-template-columns: 1fr;
    padding-inline: 16px;
  }

  .trust-strip--points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .trust-strip--points {
    grid-template-columns: 1fr;
  }
}

@media (max-height: 750px) {
  .trust-strip {
    display: none;
  }
}

@media (max-width: 640px) {
  .service-card-layout--split {
    flex-direction: column;
  }

  .service-card-layout--split .card-image {
    flex: none;
    max-width: 100%;
    width: 100%;
  }

  .service-card-layout--split .card-info {
    flex: 1 1 auto;
    max-width: 100%;
    width: 100%;
    padding: 14px 16px 16px;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 16px max(10px, env(safe-area-inset-left)) 16px
      max(10px, env(safe-area-inset-right));
  }

  .header {
    padding: 16px 16px 10px;
  }

  .site-brand-name {
    font-size: clamp(2rem, 9vw, 2.75rem);
  }

  .site-brand-suffix {
    font-size: clamp(1.8rem, 3.75vw, 2rem);
  }

  .hero-title {
    font-size: 1.15rem;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-main-title {
    font-size: clamp(1.35rem, 6vw, 1.85rem);
  }

  .hero-cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-cta {
    width: 100%;
  }

  .hero-top-row {
    flex-direction: column;
  }

  /* Full-width chat dock on narrow viewports */
  .chat-widget-dock {
    left: max(12px, env(safe-area-inset-left));
    right: max(12px, env(safe-area-inset-right));
    width: auto;
    max-width: none;
  }

  .chat-widget-dock .chat-widget-panel--embed {
    max-width: 100%;
    min-height: min(280px, 42vh);
    max-height: min(420px, 50vh);
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
  padding: 28px max(16px, env(safe-area-inset-left)) 32px
    max(16px, env(safe-area-inset-right));
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

/* Project Cards — four per row */
.project-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
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
}

.project-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

/* Why Choose Us */
.why-choose-us {
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  padding-top: 36px;
}

.why-choose-us .section-heading {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 18px 20px;
}

.feature-icon {
  font-size: 22px;
  flex-shrink: 0;
  width: 28px;
  text-align: center;
}

.feature-text {
  line-height: 1.4;
}

/* ============================
   Section 3: Confirm Final Quote
   ============================ */

.section-appointment {
  position: relative;
  padding: 64px 24px 72px;
  scroll-snap-align: start;
  background: #f7f8fa;
}

.appt-layout {
  display: flex;
  gap: 48px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-start;
}

.appt-layout--highlight .appt-form-col {
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.8),
    0 12px 40px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.4s ease;
}

/* ---- Info column (left) ---- */

.appt-info-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 12px;
}

.appt-info-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.appt-main-title {
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.4px;
  line-height: 1.2;
}

.appt-main-subtitle {
  font-size: 16px;
  color: #475569;
  line-height: 1.65;
}



/* ---- Form column (right) ---- */

.appt-form-col {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 16px;
  padding: 36px 32px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

.appt-form-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.appt-form-subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.55;
  margin-bottom: 20px;
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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0 14px;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.form-field:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: #fff;
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
  color: #94a3b8;
  pointer-events: none;
  flex-shrink: 0;
}

.details-label {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
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
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #1e293b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, border-color 0.15s;
}

.upload-choose-btn:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
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
  padding: 14px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #0f172a;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.2px;
}

.submit-btn:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.55;
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

  .appt-layout {
    flex-direction: column;
    gap: 32px;
  }

  .appt-main-title {
    font-size: 26px;
  }

  .appt-form-col {
    padding: 28px 20px 32px;
  }
}

/* ===================================================
   MOBILE-ONLY FIXES (phones ≤ 480px)
   These do NOT affect desktop (> 480px).
   =================================================== */
@media (max-width: 480px) {

  /* --- Hero: remove forced full-viewport height, tighter vertical rhythm --- */
  .section-hero {
    min-height: auto;
    padding: 8px max(8px, env(safe-area-inset-left)) 10px
      max(8px, env(safe-area-inset-right));
  }

  .section-hero .content-wrapper {
    max-height: none;
    padding-bottom: 4px;
  }

  .section-hero .header {
    padding: 12px 14px 8px;
  }

  .section-hero .body-section {
    margin-top: 2px;
  }

  .hero-top-row {
    gap: 8px 14px;
  }

  .hero-brand-block {
    gap: 5px;
  }

  .section-hero .body-section-cards-only .services-section {
    padding: 10px 10px 10px;
  }

  /* --- Subnav: three text links on one row; Get quote full-width below (less crowded) --- */
  .hero-subnav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    column-gap: 14px;
    row-gap: 8px;
    margin-top: 8px;
    padding-top: 10px;
    border-top: 1px solid rgba(226, 232, 240, 0.9);
  }

  .hero-subnav__link--emphasized {
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
  }

  .hero-subnav__link--inverse {
    flex-basis: 100%;
    width: 100%;
    order: 10;
    margin-top: 2px;
    text-align: center;
    padding: 12px 18px;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: -0.02em;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.18);
  }

  /* --- Chat widget: shorter default panel, lighter chrome --- */
  .chat-widget-dock {
    left: 6px;
    right: 6px;
    bottom: 6px;
  }

  .chat-widget-dock .chat-widget-panel--embed {
    height: min(300px, 44svh);
    max-height: min(360px, 50svh);
    min-height: 160px;
    border-radius: 14px;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .chat-widget-dock .chat-widget-header {
    padding: 8px 12px;
  }

  .chat-widget-dock .chat-widget-header-title {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .chat-widget-dock .chat-widget-header-subtitle {
    font-size: 11px;
    line-height: 1.3;
  }

  .chat-widget-dock .chat-widget-ai-badge {
    padding: 3px 6px;
    font-size: 9px;
  }

  .chat-widget-dock .chat-resize-handle {
    padding: 4px 0 2px;
  }

  .chat-widget-dock .chat-messages {
    padding: 8px 10px 6px;
    gap: 8px;
  }

  .chat-widget-dock .chat-input-wrap {
    padding: 6px 8px 8px;
  }

  .chat-widget-dock .send-btn {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
  }

  .chat-widget-dock .chat-cta-actions {
    flex-direction: column;
    gap: 6px;
  }

  .chat-widget-dock .chat-cta-btn {
    width: 100%;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    padding: 9px 12px;
    border-radius: 10px;
  }

  .chat-widget-dock .message-bubble {
    padding: 7px 9px;
    font-size: 12.5px;
    max-width: 88%;
  }

  .chat-widget-dock .bot-avatar {
    width: 22px;
    height: 22px;
    min-width: 22px;
  }

  .chat-widget-dock .bot-avatar .avatar-icon {
    width: 12px;
    height: 12px;
  }

  .chat-widget-dock .chat-widget-close {
    min-width: 42px;
    min-height: 42px;
    width: 42px;
    height: 42px;
  }

  /* Product cards in chat — narrower on phones */
  .chat-product-card {
    margin-left: 30px;
  }

  .chat-product-img {
    height: 100px;
  }

  .chat-product-gallery {
    padding: 0 8px 8px;
    gap: 5px;
  }

  .chat-gallery-thumb {
    width: 46px;
    height: 46px;
  }

  /* Multi product option cards in chat */
  .chat-product-options {
    margin-left: 30px;
  }

  .chat-option-img {
    width: 48px;
    height: 48px;
  }

  .chat-option-name {
    font-size: 11px;
  }

  .chat-option-desc {
    font-size: 10px;
  }

  /* Chat CTA card — prevent overflow */
  .chat-widget-dock .chat-cta-card {
    margin-left: 30px;
    padding: 8px 10px;
  }

  .chat-widget-dock .chat-cta-title {
    font-size: 11.5px;
  }

  /* Quick Book form in chat — tighter */
  .chat-widget-dock .chat-booking-card {
    margin-left: 30px;
    padding: 10px;
  }

  .chat-widget-dock .chat-booking-field input {
    padding: 8px 10px;
    font-size: 12.5px;
  }

  /* Chat input area — compact row */
  .chat-widget-dock .chat-input-wrap input {
    font-size: 13px;
    padding: 7px 10px;
  }

  /* --- Service modal (popup): full-width on phones --- */
  .service-modal-overlay {
    padding: 10px;
    align-items: flex-end;
  }

  .service-modal-dialog {
    max-width: 100%;
    max-height: 80vh;
    padding: 20px 18px 18px;
    border-radius: 16px 16px 0 0;
  }

  .service-modal-hero {
    width: calc(100% + 36px);
    margin: -20px -18px 14px;
    max-height: 200px;
    border-radius: 16px 16px 0 0;
  }

  .service-modal-title {
    font-size: 1.15rem;
    margin-right: 30px;
  }

  .service-modal-desc {
    font-size: 13px;
  }

  .service-modal-list {
    font-size: 13px;
  }

  .service-modal-thumb {
    width: 56px;
    height: 56px;
  }

  .service-modal-projects-btn {
    font-size: 13px;
    padding: 10px 0;
    margin-top: 14px;
  }

  .service-modal-close {
    top: 8px;
    right: 8px;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }

  /* --- Hero section: tighter brand + nav --- */
  .site-brand-name {
    font-size: clamp(1.75rem, 9vw, 2.25rem);
  }

  .hero-title {
    font-size: 1rem;
  }

  .hero-subtitle {
    font-size: 13px;
    line-height: 1.45;
  }

  /* --- Service cards on hero: better mobile proportions --- */
  .section-hero .service-card .card-image {
    aspect-ratio: 16 / 9;
  }

  .card-info h3 {
    font-size: 16px;
  }

  .card-price {
    font-size: 15px;
  }

  .card-info {
    padding: 10px 12px 12px;
  }

  /* --- Project cards: 2-col grid instead of 1 on phones --- */
  .project-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .project-card {
    border-radius: 8px;
  }

  .project-image img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .project-name {
    font-size: 12px;
    padding: 6px 8px;
  }

  .project-meta {
    font-size: 11px;
    padding: 0 8px 6px;
  }

  /* --- Why Choose Us: clearer hierarchy, less “floating” empty feel --- */
  .why-choose-us {
    padding-top: 22px;
    margin-top: 4px;
    border-top-color: rgba(226, 232, 240, 0.75);
  }

  .why-choose-us .section-heading {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 14px;
    letter-spacing: -0.03em;
    color: #0f172a;
  }

  .section-projects .why-choose-us .features-grid {
    gap: 10px;
  }

  .section-projects .why-choose-us .feature-item {
    padding: 14px 14px;
    font-size: 14px;
    line-height: 1.45;
    font-weight: 600;
    background: #ffffff;
    border-color: rgba(226, 232, 240, 0.95);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
  }

  .section-projects .why-choose-us .feature-icon {
    font-size: 18px;
    width: 26px;
  }

  /* --- Booking form (section 3): tighter spacing --- */
  .section-appointment {
    padding: 40px 12px 48px;
  }

  .appt-main-title {
    font-size: 22px;
  }

  .appt-main-subtitle {
    font-size: 14px;
  }

  .appt-form-col {
    padding: 20px 16px 24px;
    border-radius: 12px;
  }

  .appt-form-col input,
  .appt-form-col select,
  .appt-form-col textarea {
    font-size: 14px;
  }

  .upload-actions {
    flex-direction: column;
  }

  /* --- Lightbox: more padding on phones --- */
  .chat-lightbox-overlay {
    padding: 12px;
  }

  .chat-lightbox-img {
    max-width: 95vw;
    max-height: 80vh;
    border-radius: 8px;
  }

  .chat-lightbox-close {
    top: 10px;
    right: 12px;
    font-size: 28px;
  }
}

/* Narrow phones (~400px): single-column project cards (overrides 2-col rule above) */
@media (max-width: 400px) {
  .project-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .project-name {
    font-size: 13px;
  }
}

/* Chat bubble dock position: overrides full-bleed .chat-widget-dock rules on small phones */
@media (max-width: 640px) {
  .chat-widget-dock.chat-widget-dock--mobile-bubble:not(.chat-widget-dock--panel-open) {
    left: auto;
    right: max(8px, env(safe-area-inset-right));
    bottom: max(8px, env(safe-area-inset-bottom));
    width: auto;
    max-width: none;
  }

  .chat-widget-dock.chat-widget-dock--mobile-bubble.chat-widget-dock--panel-open {
    left: max(6px, env(safe-area-inset-left));
    right: max(6px, env(safe-area-inset-right));
    width: auto;
    max-width: none;
  }
}
</style>
