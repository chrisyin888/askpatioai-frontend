<template>
  <main class="market-page market-lobby">
    <header class="market-shell market-header lobby-header">
      <div>
        <p class="market-eyebrow">{{ tr('Lead Marketplace', 'Lead Marketplace') }}</p>
        <h1>{{ tr('Lobby', '大厅') }}</h1>
        <p class="market-muted">
          {{
            tr(
              'City and project type are shown until you purchase. Buy with coins to unlock contacts.',
              '购买前显示城市和项目类型。用 coin 购买后解锁联系方式。',
            )
          }}
        </p>
      </div>
      <div class="market-actions">
        <button type="button" class="market-secondary" @click="toggleLang">{{ langToggleLabel }}</button>
        <button type="button" class="market-secondary" @click="refresh">{{ tr('Refresh', '刷新') }}</button>
        <router-link to="/account">{{ tr('Account', '账号') }}</router-link>
        <router-link to="/admin-leads">{{ tr('Admin', '管理员后台') }}</router-link>
        <button type="button" @click="logout">{{ tr('Logout', '退出登录') }}</button>
      </div>
      <p v-if="alertBanner" class="market-alert-banner">
        {{ tr('New lead in lobby', '大厅有新 Lead') }}: {{ alertBanner }}
      </p>
      <p v-if="refreshNotice" class="market-refresh-notice">{{ refreshNotice }}</p>
    </header>

    <section class="market-shell market-stats">
      <article>
        <span>{{ tr('Logged in as', '当前登录') }}</span>
        <strong>{{ user.name }}</strong>
        <small>{{ user.phone || user.email }}</small>
      </article>
      <article>
        <span>{{ tr('Wallet balance', '钱包余额') }}</span>
        <strong>{{ walletBalance }} coins</strong>
        <small>{{ tr('Coins are deducted when a lead is purchased.', '购买 lead 时会自动扣 coin。') }}</small>
      </article>
      <article>
        <span>{{ tr('Available to buy', '待抢 leads') }}</span>
        <strong>{{ availableLeads.length }}</strong>
        <small>{{ tr('Open leads waiting for purchase.', '这些 lead 还未被购买。') }}</small>
      </article>
      <article>
        <span>{{ tr('Sold leads', '已成交 leads') }}</span>
        <strong>{{ soldLeads.length }}</strong>
        <small>{{ tr('Already purchased in the marketplace.', '大厅里已被买走的 leads。') }}</small>
      </article>
      <article>
        <span>{{ tr('Your purchases', '你已购买') }}</span>
        <strong>{{ purchases.length }}</strong>
        <small>{{ tr('Leads you bought with coins.', '你用 coin 买下的 leads。') }}</small>
      </article>
    </section>

    <section class="market-shell lobby-hall lead-deck-shell">
      <div class="lobby-hall__intro">
        <div>
          <h2>{{ tr('Available Leads', '可抢 Leads') }}</h2>
          <p>
            {{
              tr(
                'We publish homeowner leads here for contractors to purchase.',
                '我们在这里发布 homeowner leads，供承包商购买。',
              )
            }}
          </p>
        </div>
        <button type="button" class="market-secondary" @click="refresh">{{ tr('Refresh', '刷新') }}</button>
      </div>
      <p v-if="refreshNotice" class="market-refresh-notice market-refresh-notice--inline">{{ refreshNotice }}</p>

      <div v-if="availableLeads.length" class="lead-deck__meta">
        <span class="lead-deck__pool-badge lead-deck__pool-badge--live">
          <span class="lead-deck__pool-dot"></span>
          {{ tr('AVAILABLE', '可抢') }}
        </span>
        <span>{{ browseLeads.length }} {{ tr('open leads', '条待抢') }}</span>
        <span>{{ deckPosition }}</span>
      </div>

      <div v-if="availableLeads.length" class="lobby-available-strip">
        <button
          v-for="lead in availableLeads"
          :key="lead.id"
          type="button"
          class="lobby-available-chip"
          :class="{ 'lobby-available-chip--active': currentLead && currentLead.id === lead.id }"
          @click="goToLead(lead.id)"
        >
          <span class="lobby-available-chip__badge">{{ tr('AVAILABLE', '可抢') }}</span>
          <span v-if="isLeadNew(lead)" class="lobby-available-chip__new">{{ tr('NEW', '新') }}</span>
          <span class="lobby-available-chip__text">
            <strong>{{ lead.city }}</strong>
            <small>{{ lead.projectType }}</small>
          </span>
        </button>
      </div>

      <div v-if="currentLead" class="lead-deck">
        <div class="lead-deck__nav">
          <button type="button" class="market-secondary" :disabled="deckIndex <= 0" @click="goPrev">
            {{ tr('Previous', '上一个') }}
          </button>
          <button type="button" class="market-secondary" :disabled="deckIndex >= browseLeads.length - 1" @click="goNext">
            {{ tr('Next', '下一个') }}
          </button>
        </div>

        <div
          class="lead-deck__stack"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <article
            v-if="peekLead"
            class="lead-date-card lead-date-card--peek"
            :class="projectThemeClass(peekLead.projectType)"
            aria-hidden="true"
          >
            <div class="lead-date-card__shine"></div>
            <span class="lead-date-card__available-badge">
              <span class="lead-date-card__available-dot"></span>
              {{ tr('AVAILABLE', '可抢') }}
            </span>
            <p class="lead-date-card__region-label">{{ tr('Service area', '服务地区') }}</p>
            <p class="lead-date-card__city">{{ peekLead.city }}</p>
            <p class="lead-date-card__project">{{ peekLead.projectType }}</p>
          </article>

          <article
            class="lead-date-card"
            :class="[projectThemeClass(currentLead.projectType), swipeClass]"
          >
            <div class="lead-date-card__shine"></div>
            <div class="lead-date-card__status-row">
              <span class="lead-date-card__available-badge">
                <span class="lead-date-card__available-dot"></span>
                {{ tr('AVAILABLE', '可抢') }}
              </span>
              <span v-if="isLeadNew(currentLead)" class="lead-date-card__new-badge">{{ tr('NEW', '新单') }}</span>
            </div>
            <p class="lead-date-card__region-label">{{ tr('Service area', '服务地区') }}</p>
            <h3 class="lead-date-card__city">{{ currentLead.city }}</h3>
            <p class="lead-date-card__project">{{ currentLead.projectType }}</p>

            <div class="lead-date-card__blurred" aria-hidden="true">
              <div class="lead-date-card__top">
                <strong>{{ displayLead.coinCost }} coins</strong>
              </div>
              <p class="lead-date-card__eyebrow">{{ tr('Homeowner lead', 'Homeowner Lead') }}</p>
              <p class="lead-date-card__size">{{ displayLead.size }}</p>
              <p class="lead-date-card__notes">{{ displayLead.notes }}</p>
              <ul class="lead-date-card__locked">
                <li>
                  <span>{{ tr('Customer', '客户') }}</span>
                  <strong>{{ displayLead.customerName }}</strong>
                </li>
                <li>
                  <span>{{ tr('Phone', '电话') }}</span>
                  <strong>{{ displayLead.phone }}</strong>
                </li>
                <li>
                  <span>{{ tr('Email', '邮箱') }}</span>
                  <strong>{{ displayLead.email }}</strong>
                </li>
              </ul>
            </div>

            <p class="lead-date-card__guest-banner">
              {{
                tr('Purchase to unlock size, notes and contact details.', '购买后解锁尺寸、备注和联系方式。')
              }}
            </p>
          </article>
        </div>

        <div class="lead-deck__actions">
          <button type="button" class="lead-deck__pass" @click="passLead">
            {{ tr('Skip', '跳过') }}
          </button>
          <button type="button" class="lead-deck__buy" @click="requestBuyLead(currentLead)">
            {{ tr('Buy Lead', '购买 Lead') }}
          </button>
        </div>
      </div>

      <div v-if="pendingPurchaseLead" class="purchase-confirm" role="dialog" aria-modal="true">
        <div class="purchase-confirm__backdrop" @click="cancelPurchase"></div>
        <section class="purchase-confirm__card">
          <h2>{{ tr('Confirm purchase', '确认购买') }}</h2>
          <p class="purchase-confirm__lead">
            {{
              tr(
                'Spend coins to unlock this lead contact details?',
                '确认花费 coin 解锁这个 lead 的联系方式吗？',
              )
            }}
          </p>
          <dl class="purchase-confirm__summary">
            <div>
              <dt>{{ tr('Service area', '服务地区') }}</dt>
              <dd>{{ pendingPurchaseLead.city }}</dd>
            </div>
            <div>
              <dt>{{ tr('Project', '项目') }}</dt>
              <dd>{{ pendingPurchaseLead.projectType }}</dd>
            </div>
            <div>
              <dt>{{ tr('Cost', '花费') }}</dt>
              <dd>{{ pendingPurchaseLead.coinCost }} coins</dd>
            </div>
            <div>
              <dt>{{ tr('Wallet balance', '钱包余额') }}</dt>
              <dd>{{ walletBalance }} coins</dd>
            </div>
            <div>
              <dt>{{ tr('Balance after purchase', '购买后余额') }}</dt>
              <dd :class="{ 'purchase-confirm__shortfall': pendingPurchaseInsufficient }">
                {{ walletBalance - pendingPurchaseLead.coinCost }} coins
              </dd>
            </div>
          </dl>
          <p v-if="pendingPurchaseInsufficient" class="purchase-confirm__recharge">
            {{
              tr(
                'Not enough coins. Contact Chris to top up your wallet.',
                'Coin 余额不足，请联系 Chris 充值。',
              )
            }}
            <a :href="`tel:${rechargeContact.phone}`">{{ rechargeContact.name }} · {{ rechargeContact.phone }}</a>
          </p>
          <div class="purchase-confirm__actions">
            <button type="button" class="market-secondary" @click="cancelPurchase">
              {{ tr('Cancel', '取消') }}
            </button>
            <button
              v-if="pendingPurchaseInsufficient"
              type="button"
              class="lobby-login-cta"
              @click="openRechargePrompt(pendingPurchaseLead)"
            >
              {{ tr('Contact to top up', '联系充值') }}
            </button>
            <button v-else type="button" @click="confirmPurchase">{{ tr('Confirm purchase', '确认购买') }}</button>
          </div>
        </section>
      </div>

      <div v-if="rechargePromptOpen" class="purchase-confirm" role="dialog" aria-modal="true">
        <div class="purchase-confirm__backdrop" @click="closeRechargePrompt"></div>
        <section class="purchase-confirm__card purchase-confirm__card--recharge">
          <p class="purchase-confirm__badge purchase-confirm__badge--warn">{{ tr('Top up needed', '需要充值') }}</p>
          <h2>{{ tr('Not enough coins', 'Coin 余额不足') }}</h2>
          <p class="purchase-confirm__lead">
            {{
              tr(
                'Your wallet balance is too low for this lead. Contact Chris to add coins.',
                '你的 coin 余额不够购买这个 lead，请联系 Chris 充值。',
              )
            }}
          </p>
          <dl v-if="rechargePromptLead" class="purchase-confirm__summary">
            <div>
              <dt>{{ tr('Lead cost', 'Lead 价格') }}</dt>
              <dd>{{ rechargePromptLead.coinCost }} coins</dd>
            </div>
            <div>
              <dt>{{ tr('Wallet balance', '钱包余额') }}</dt>
              <dd>{{ walletBalance }} coins</dd>
            </div>
            <div>
              <dt>{{ tr('Contact for top-up', '充值联系') }}</dt>
              <dd>
                <a :href="`tel:${rechargeContact.phone}`">
                  {{ rechargeContact.name }} · {{ rechargeContact.phone }}
                </a>
              </dd>
            </div>
          </dl>
          <div class="purchase-confirm__actions">
            <button type="button" class="market-secondary" @click="closeRechargePrompt">
              {{ tr('Close', '关闭') }}
            </button>
            <a :href="`tel:${rechargeContact.phone}`" class="lobby-login-cta lobby-login-cta--wide">
              {{ tr('Call Chris', '联系 Chris') }}
            </a>
          </div>
        </section>
      </div>

      <p v-if="!availableLeads.length" class="market-empty">
        {{ tr('No leads available right now. Please check back later.', '暂时没有可抢 leads，请稍后再来。') }}
      </p>
      <p v-else-if="!browseLeads.length" class="market-empty">
        {{ tr('You skipped all leads in this session. Refresh to browse the lobby again.', '你本会话已跳过所有 leads。点刷新可重新浏览大厅。') }}
      </p>
      <p v-if="message" class="market-message" :class="{ 'market-message--error': messageIsError }">
        {{ message }}
      </p>
    </section>

    <section class="market-shell lobby-sold-section">
      <div class="lobby-hall__intro">
        <div>
          <h2>{{ tr('Sold Leads', '已成交 Leads') }}</h2>
          <p>
            {{
              tr(
                'Leads already purchased — city and project type are shown here.',
                '已被购买的 leads — 这里显示城市和项目类型。',
              )
            }}
          </p>
        </div>
        <span v-if="soldLeads.length" class="lobby-sold-section__count">
          {{ soldLeads.length }} {{ tr('sold', '已成交') }}
        </span>
      </div>

      <div v-if="soldLeads.length" class="lobby-sold-strip">
        <article v-for="lead in soldLeads" :key="lead.id" class="lobby-sold-chip">
          <span class="lobby-sold-chip__badge">{{ tr('SOLD', '已成交') }}</span>
          <strong>{{ lead.city }}</strong>
          <span class="lobby-sold-chip__project">{{ lead.projectType }}</span>
          <span class="lobby-sold-chip__buyer">{{ lead.buyerName }}</span>
          <small>{{ formatSoldDate(lead.purchasedAt) }}</small>
        </article>
      </div>
      <p v-else class="market-empty">{{ tr('No sold leads yet.', '还没有已成交 leads。') }}</p>
    </section>

    <section class="market-shell">
      <h2>{{ tr('Coin History', 'Coin 记录') }}</h2>
      <div class="market-table-wrap">
        <table class="market-table">
          <thead>
            <tr>
              <th>{{ tr('Time', '时间') }}</th>
              <th>{{ tr('Change', '变动') }}</th>
              <th>{{ tr('Balance after', '变动后余额') }}</th>
              <th>{{ tr('Type', '类型') }}</th>
              <th>{{ tr('Details', '说明') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in walletTransactions" :key="row.id">
              <td>{{ formatTime(row.createdAt) }}</td>
              <td :class="row.delta >= 0 ? 'coin-delta--add' : 'coin-delta--deduct'">
                {{ row.delta >= 0 ? '+' : '' }}{{ row.delta }}
              </td>
              <td>{{ row.balanceAfter }}</td>
              <td>{{ transactionLabel(row.type) }}</td>
              <td>{{ row.note || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="!walletTransactions.length" class="market-empty">{{ tr('No coin records yet.', '还没有 coin 记录。') }}</p>
    </section>

    <section class="market-shell">
      <h2>{{ tr('Your Matches', '已匹配 Leads') }}</h2>
      <div class="market-table-wrap">
        <table class="market-table">
          <thead>
            <tr>
              <th>{{ tr('Customer', '客户') }}</th>
              <th>{{ tr('Contact', '联系方式') }}</th>
              <th>{{ tr('Project', '项目') }}</th>
              <th>{{ tr('City', '城市') }}</th>
              <th>{{ tr('Cost', '花费') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases" :key="purchase.id">
              <td>{{ purchase.lead?.customerName || tr('Unknown', '未知') }}</td>
              <td>
                <strong>{{ purchase.lead?.phone }}</strong>
                <span>{{ purchase.lead?.email }}</span>
              </td>
              <td>{{ purchase.lead?.projectType }}<br /><small>{{ purchase.lead?.size }}</small></td>
              <td>{{ purchase.lead?.city }}</td>
              <td>{{ purchase.coinCost }} coins</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="!purchases.length" class="market-empty">{{ tr('No purchases yet.', '还没有购买记录。') }}</p>
    </section>
  </main>
</template>

<script>
import {
  clearCurrentUser,
  getCurrentUser,
  getWalletBalance,
  listLeadsForContractor,
  listSoldLeadsForLobby,
  sortLeadsByCity,
  listPurchasesForContractor,
  listWalletTransactions,
  purchaseLead,
  MARKETPLACE_RECHARGE_CONTACT,
} from '../utils/leadMarketplaceStore';
import { getMarketplaceLang, marketText, setMarketplaceLang } from '../utils/marketplaceI18n';
import {
  ensureNotificationPermission,
  listUnreadAlertsForContractor,
  markContractorAlertsRead,
  showBrowserLeadNotification,
} from '../utils/marketplaceNotify';

export default {
  name: 'ContractorDashboard',
  data() {
    return {
      user: {},
      leads: [],
      purchases: [],
      walletTransactions: [],
      walletBalance: 0,
      message: '',
      messageIsError: false,
      pendingPurchaseLead: null,
      alertBanner: '',
      knownLeadIds: [],
      pollTimer: null,
      deckIndex: 0,
      passedLeadIds: [],
      touchStartX: 0,
      swipeClass: '',
      lang: getMarketplaceLang(),
      soldLeads: [],
      rechargePromptOpen: false,
      rechargePromptLead: null,
      rechargeContact: MARKETPLACE_RECHARGE_CONTACT,
      refreshNotice: '',
      refreshNoticeTimer: null,
    };
  },
  computed: {
    availableLeads() {
      return sortLeadsByCity(
        this.leads.filter(
          (lead) => lead.status === 'available' && !lead.purchased && !lead.buyerId,
        ),
      );
    },
    browseLeads() {
      const passed = new Set(this.passedLeadIds);
      return this.availableLeads.filter((lead) => !passed.has(lead.id));
    },
    currentLead() {
      if (!this.browseLeads.length) return null;
      const index = Math.min(this.deckIndex, this.browseLeads.length - 1);
      return this.browseLeads[index];
    },
    peekLead() {
      if (!this.browseLeads.length || this.deckIndex >= this.browseLeads.length - 1) return null;
      return this.browseLeads[this.deckIndex + 1];
    },
    deckPosition() {
      if (!this.browseLeads.length) return '0 / 0';
      const index = Math.min(this.deckIndex, this.browseLeads.length - 1);
      return `${index + 1} / ${this.browseLeads.length}`;
    },
    langToggleLabel() {
      return this.lang === 'zh' ? 'English' : '中文';
    },
    displayLead() {
      if (!this.currentLead) return null;
      return {
        ...this.currentLead,
        coinCost: '██',
        size: '██ × ██',
        notes: '████████████████████████',
        customerName: '████████',
        phone: '*** *** ****',
        email: '***@***.***',
      };
    },
    pendingPurchaseInsufficient() {
      if (!this.pendingPurchaseLead) return false;
      return this.walletBalance < Number(this.pendingPurchaseLead.coinCost || 0);
    },
  },
  created() {
    const user = getCurrentUser();
    if (!user || user.role !== 'contractor') {
      this.$router.replace('/contractor-login');
      return;
    }
    this.user = user;
    ensureNotificationPermission();
    this.refresh({ silent: true });
    this.knownLeadIds = this.availableLeads.map((lead) => lead.id);
  },
  mounted() {
    this.checkNotifications();
    this.pollTimer = window.setInterval(() => this.checkNotifications(), 15000);
    window.addEventListener('storage', this.checkNotifications);
  },
  beforeUnmount() {
    if (this.pollTimer) window.clearInterval(this.pollTimer);
    if (this.refreshNoticeTimer) window.clearTimeout(this.refreshNoticeTimer);
    window.removeEventListener('storage', this.checkNotifications);
  },
  methods: {
    tr(en, zh) {
      return marketText(en, zh, this.lang);
    },
    toggleLang() {
      this.lang = setMarketplaceLang(this.lang === 'zh' ? 'en' : 'zh');
      this.message = '';
      this.refresh({ silent: true });
    },
    refresh(options = {}) {
      this.soldLeads = listSoldLeadsForLobby();
      if (!this.user.id) return;
      this.leads = listLeadsForContractor(this.user.id);
      this.purchases = listPurchasesForContractor(this.user.id);
      this.walletTransactions = listWalletTransactions({ contractorId: this.user.id, limit: 30 });
      this.walletBalance = getWalletBalance(this.user.id);
      this.passedLeadIds = [];
      this.deckIndex = 0;
      this.knownLeadIds = this.availableLeads.map((lead) => lead.id);
      if (!options.silent) {
        this.showRefreshNotice();
      }
    },
    showRefreshNotice() {
      this.refreshNotice = this.tr('Data refreshed.', '数据已刷新。');
      if (this.refreshNoticeTimer) window.clearTimeout(this.refreshNoticeTimer);
      this.refreshNoticeTimer = window.setTimeout(() => {
        this.refreshNotice = '';
      }, 2500);
    },
    checkNotifications() {
      if (!this.user.id) return;
      this.refresh();

      const alerts = listUnreadAlertsForContractor(this.user.id);
      if (alerts.length) {
        alerts.forEach((alert) => {
          const message = this.lang === 'zh' ? alert.messageZh : alert.messageEn;
          this.showNewLeadAlert(message);
        });
        markContractorAlertsRead(
          this.user.id,
          alerts.map((alert) => alert.id),
        );
        return;
      }

      const currentIds = this.availableLeads.map((lead) => lead.id);
      currentIds.forEach((leadId) => {
        if (!this.knownLeadIds.includes(leadId)) {
          const lead = this.availableLeads.find((item) => item.id === leadId);
          if (lead) {
            this.showNewLeadAlert(`${lead.city} · ${this.tr('New lead', '新 lead')}`);
          }
        }
      });
      this.knownLeadIds = currentIds;
    },
    showNewLeadAlert(message) {
      this.alertBanner = message;
      showBrowserLeadNotification(this.tr('New lead in lobby', '大厅有新 Lead'), message);
    },
    formatTime(value) {
      if (!value) return '-';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleString(this.lang === 'zh' ? 'zh-CN' : 'en-CA');
    },
    formatSoldDate(value) {
      if (!value) return '-';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString(this.lang === 'zh' ? 'zh-CN' : 'en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },
    transactionLabel(type) {
      const labels = {
        admin_add: this.tr('Admin add', '管理员增加'),
        admin_deduct: this.tr('Admin deduct', '管理员扣除'),
        lead_purchase: this.tr('Lead purchase', '购买 Lead'),
      };
      return labels[type] || type;
    },
    projectThemeClass(projectType) {
      const value = String(projectType || '').toLowerCase();
      if (value.includes('sunroom')) return 'lead-date-card--sunroom';
      if (value.includes('glass')) return 'lead-date-card--glass';
      if (value.includes('aluminum')) return 'lead-date-card--aluminum';
      if (value.includes('skyline')) return 'lead-date-card--skyline';
      return 'lead-date-card--default';
    },
    goPrev() {
      if (this.deckIndex > 0) this.deckIndex -= 1;
    },
    goNext() {
      if (this.deckIndex < this.browseLeads.length - 1) this.deckIndex += 1;
    },
    goToLead(leadId) {
      if (this.passedLeadIds.includes(leadId)) {
        this.passedLeadIds = this.passedLeadIds.filter((id) => id !== leadId);
      }
      this.$nextTick(() => {
        const index = this.browseLeads.findIndex((lead) => lead.id === leadId);
        if (index >= 0) this.deckIndex = index;
      });
    },
    isLeadNew(lead) {
      if (!lead?.createdAt) return false;
      const created = new Date(lead.createdAt).getTime();
      if (Number.isNaN(created)) return false;
      return Date.now() - created < 7 * 86400000;
    },
    passLead() {
      if (!this.currentLead) return;
      const wasLast = this.deckIndex >= this.browseLeads.length - 1;
      this.passedLeadIds.push(this.currentLead.id);
      this.triggerSwipe('lead-date-card--swipe-left');
      this.$nextTick(() => {
        if (!this.browseLeads.length) {
          this.deckIndex = 0;
          return;
        }
        if (wasLast) this.deckIndex = Math.max(0, this.browseLeads.length - 1);
      });
    },
    onTouchStart(event) {
      this.touchStartX = event.changedTouches?.[0]?.clientX || 0;
    },
    onTouchEnd(event) {
      const endX = event.changedTouches?.[0]?.clientX || 0;
      const delta = endX - this.touchStartX;
      if (delta > 80) {
        this.triggerSwipe('lead-date-card--swipe-right');
        if (this.currentLead) {
          this.requestBuyLead(this.currentLead);
        }
      } else if (delta < -80) {
        this.passLead();
      }
    },
    triggerSwipe(className) {
      this.swipeClass = className;
      window.setTimeout(() => {
        this.swipeClass = '';
      }, 220);
    },
    requestBuyLead(lead) {
      this.message = '';
      if (this.walletBalance < Number(lead.coinCost || 0)) {
        this.openRechargePrompt(lead);
        return;
      }
      this.pendingPurchaseLead = lead;
    },
    openRechargePrompt(lead) {
      this.pendingPurchaseLead = null;
      this.rechargePromptLead = lead;
      this.rechargePromptOpen = true;
    },
    closeRechargePrompt() {
      this.rechargePromptOpen = false;
      this.rechargePromptLead = null;
    },
    cancelPurchase() {
      this.pendingPurchaseLead = null;
    },
    confirmPurchase() {
      if (!this.pendingPurchaseLead) return;
      const leadSnapshot = { ...this.pendingPurchaseLead };
      const leadId = leadSnapshot.id;
      this.pendingPurchaseLead = null;
      const result = purchaseLead(this.user.id, leadId);
      if (!result.ok && result.insufficientCoins) {
        this.openRechargePrompt(leadSnapshot);
        return;
      }
      this.message = result.ok
        ? this.tr('Lead purchased. Contact info is now unlocked.', 'Lead 已购买，客户联系方式已解锁。')
        : result.error;
      this.messageIsError = !result.ok;
      if (result.ok) {
        this.passedLeadIds = this.passedLeadIds.filter((id) => id !== leadId);
      }
      this.refresh();
      this.deckIndex = 0;
    },
    logout() {
      clearCurrentUser();
      this.$router.push('/contractor-login');
    },
  },
};
</script>

<style>
.market-page {
  min-height: 100vh;
  padding: 24px;
  background: #eef2ff;
  color: #0f172a;
}
.market-lobby {
  background:
    radial-gradient(circle at top, rgba(219, 39, 119, 0.12), transparent 34%),
    radial-gradient(circle at bottom right, rgba(2, 132, 199, 0.12), transparent 28%),
    #eef2ff;
}
.lobby-header h1 {
  font-size: clamp(2.4rem, 8vw, 4rem);
}
.lobby-hall {
  background: linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%);
  border-color: #fbcfe8;
}
.lobby-activity {
  padding: 18px 18px 16px;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  border-color: #334155;
  color: #e2e8f0;
  overflow: hidden;
}
.lobby-activity__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.lobby-activity__live-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.lobby-activity__head strong {
  font-size: 1rem;
  letter-spacing: -0.02em;
}
.lobby-activity__head small {
  color: #94a3b8;
  font-weight: 700;
}
.lobby-activity__pulse {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.65);
  animation: lobby-pulse 1.8s ease infinite;
}
@keyframes lobby-pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.65); }
  70% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
.lobby-ticker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.lobby-ticker:last-child {
  margin-bottom: 0;
}
.lobby-ticker__badge {
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(234, 179, 8, 0.18);
  color: #fde68a;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
}
.lobby-ticker__badge--live {
  background: rgba(34, 197, 94, 0.18);
  color: #86efac;
}
.lobby-ticker__viewport {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.lobby-ticker__track {
  display: flex;
  width: max-content;
  gap: 12px;
  will-change: transform;
}
.lobby-ticker__track--sold {
  animation: lobby-marquee-sold 52s linear infinite;
}
.lobby-ticker__track--live {
  animation: lobby-marquee-live 38s linear infinite;
}
.lobby-ticker__chip {
  flex: 0 0 auto;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
}
.lobby-ticker__chip--sold {
  background: rgba(234, 179, 8, 0.12);
  border: 1px solid rgba(250, 204, 21, 0.28);
  color: #fef3c7;
}
.lobby-ticker__chip--live {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.24);
  color: #dcfce7;
}
@keyframes lobby-marquee-sold {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes lobby-marquee-live {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.lead-deck__autoplay-badge {
  padding: 6px 10px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #047857;
  font-size: 12px;
  font-weight: 800;
  animation: lobby-pulse 2.2s ease infinite;
}
.lead-date-card--roll-in {
  animation: lead-card-roll-in 0.42s ease;
}
@keyframes lead-card-roll-in {
  from {
    opacity: 0.45;
    transform: translateY(22px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.lobby-sold-archive {
  background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
  border-color: #fde68a;
  overflow: hidden;
}
.lobby-sold-archive__head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.lobby-sold-archive__head p {
  margin: 6px 0 0;
  color: #64748b;
}
.lobby-sold-archive__count {
  flex: 0 0 auto;
  padding: 10px 14px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-weight: 900;
}
.lobby-sold-archive__viewport {
  position: relative;
  height: min(520px, 62vh);
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid #fde68a;
  background: #fffdf7;
  mask-image: linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent);
}
.lobby-sold-archive__track {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
  padding: 14px;
  animation: lobby-archive-scroll 80s linear infinite;
}
.lobby-sold-archive__viewport:hover .lobby-sold-archive__track {
  animation-play-state: paused;
}
@keyframes lobby-archive-scroll {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
.sold-archive-card {
  position: relative;
  min-height: 210px;
  padding: 18px;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18);
}
.sold-archive-card__shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 55%);
  pointer-events: none;
}
.sold-archive-card__badge {
  display: inline-block;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
}
.sold-archive-card__project {
  margin: 0;
  font-size: 12px;
  opacity: 0.85;
}
.sold-archive-card h3 {
  margin: 6px 0 0;
  font-size: 1.45rem;
  letter-spacing: -0.04em;
}
.sold-archive-card__size,
.sold-archive-card__customer,
.sold-archive-card__notes,
.sold-archive-card__masked {
  margin: 8px 0 0;
  line-height: 1.45;
  font-size: 0.92rem;
}
.sold-archive-card__masked {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.18);
  border: 1px dashed rgba(255, 255, 255, 0.35);
  font-style: italic;
}
.sold-archive-card__notes {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.92;
}
.sold-archive-card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 12px;
}
.sold-archive-card__footer strong {
  margin-left: auto;
}
.lobby-hall__intro {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.lobby-hall__intro h2 {
  margin: 0;
  letter-spacing: -0.04em;
}
.lobby-hall__intro p {
  margin: 6px 0 0;
  color: #64748b;
}
.market-shell {
  width: min(1180px, 100%);
  margin: 0 auto 18px;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.08);
}
.market-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.market-eyebrow {
  margin: 0 0 8px;
  color: #0284c7;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.market-header h1,
.market-shell h2 {
  margin: 0;
  letter-spacing: -0.04em;
}
.market-alert-banner {
  flex: 1 1 100%;
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fef9c3;
  color: #854d0e;
  font-weight: 800;
}
.market-refresh-notice {
  flex: 1 1 100%;
  margin: 0;
  padding: 10px 14px;
  border-radius: 12px;
  background: #dcfce7;
  color: #166534;
  font-weight: 800;
}
.market-refresh-notice--inline {
  margin-top: 12px;
}
.market-muted,
.market-section-head p,
.market-empty {
  color: #64748b;
}
.market-actions {
  display: flex;
  gap: 10px;
}
.market-actions a,
.market-actions button,
.market-secondary,
.lead-deck__buy {
  border: 0;
  border-radius: 12px;
  padding: 11px 14px;
  background: #0f172a;
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
}
.market-secondary {
  background: #e2e8f0;
  color: #0f172a;
}
.market-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}
.market-stats article {
  padding: 18px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.market-stats span,
.market-stats small {
  display: block;
  color: #64748b;
}
.market-stats strong {
  display: block;
  margin: 6px 0;
  font-size: 1.55rem;
}
.market-section-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.lead-deck-shell {
  overflow: hidden;
}
.lead-deck__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
  color: #64748b;
  font-weight: 700;
}
.lead-deck__pool-badge {
  padding: 6px 10px;
  border-radius: 999px;
  background: #fce7f3;
  color: #be185d;
  font-size: 12px;
  font-weight: 800;
}
.lead-deck__pool-badge--live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #dcfce7;
  color: #047857;
}
.lead-deck__pool-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.65);
  animation: lobby-pulse 1.8s ease infinite;
}
.lobby-available-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.lobby-available-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
  padding: 10px 14px;
  background: #f0fdf4;
  color: #065f46;
  font-weight: 800;
  cursor: pointer;
}
.lobby-available-chip--active {
  background: #047857;
  border-color: #047857;
  color: #fff;
}
.lobby-available-chip--active .lobby-available-chip__badge {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.lobby-available-chip--active .lobby-available-chip__new {
  background: #fde68a;
  color: #92400e;
}
.lobby-available-chip__badge {
  padding: 4px 8px;
  border-radius: 999px;
  background: #dcfce7;
  color: #047857;
  font-size: 10px;
  letter-spacing: 0.1em;
}
.lobby-available-chip__new {
  padding: 4px 8px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-size: 10px;
  font-weight: 900;
}
.lobby-available-chip__text {
  display: grid;
  gap: 2px;
  text-align: left;
}
.lobby-available-chip__text strong {
  font-size: 0.95rem;
}
.lobby-available-chip__text small {
  color: #047857;
  font-size: 11px;
  font-weight: 700;
}
.lobby-available-chip--active .lobby-available-chip__text small {
  color: #dcfce7;
}
.lobby-sold-section {
  background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);
  border-color: #fde68a;
}
.lobby-sold-section__count {
  flex: 0 0 auto;
  padding: 10px 14px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-weight: 900;
}
.lobby-sold-strip {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
.lobby-sold-chip {
  display: grid;
  gap: 6px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #fde68a;
  background: #fffdf7;
}
.lobby-sold-chip__badge {
  display: inline-block;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.lobby-sold-chip strong {
  font-size: 1.2rem;
  color: #0f172a;
}
.lobby-sold-chip__project {
  color: #475569;
  font-weight: 700;
}
.lobby-sold-chip__buyer {
  color: #64748b;
  font-weight: 700;
}
.lobby-sold-chip small {
  color: #94a3b8;
}
.lead-deck__nav {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.lead-deck__stack {
  position: relative;
  min-height: 430px;
  display: grid;
  place-items: center;
  padding: 8px 0 18px;
  touch-action: pan-y;
}
.lead-date-card {
  position: relative;
  z-index: 2;
  width: min(100%, 420px);
  min-height: 390px;
  padding: 24px;
  border-radius: 28px;
  color: #fff;
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.28);
  transition: transform 0.22s ease, opacity 0.22s ease;
}
.lead-date-card--peek {
  position: absolute;
  z-index: 1;
  inset: 18px 14px auto;
  min-height: 360px;
  transform: scale(0.96) translateY(12px);
  opacity: 0.55;
  pointer-events: none;
}
.lead-date-card--default {
  background: linear-gradient(145deg, #0f172a 0%, #334155 100%);
}
.lead-date-card--available {
  background: linear-gradient(145deg, #047857 0%, #10b981 100%);
  border: 2px solid rgba(167, 243, 208, 0.45);
  box-shadow: 0 28px 60px rgba(16, 185, 129, 0.28);
}
.lead-date-card__status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.lead-date-card__available-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
}
.lead-date-card__available-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #bbf7d0;
  box-shadow: 0 0 0 0 rgba(187, 247, 208, 0.8);
  animation: lobby-pulse 1.8s ease infinite;
}
.lead-date-card__new-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(254, 243, 199, 0.92);
  color: #92400e;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.lead-date-card--sunroom {
  background: linear-gradient(145deg, #ea580c 0%, #f59e0b 100%);
}
.lead-date-card--glass {
  background: linear-gradient(145deg, #0284c7 0%, #06b6d4 100%);
}
.lead-date-card--aluminum {
  background: linear-gradient(145deg, #475569 0%, #64748b 100%);
}
.lead-date-card--skyline {
  background: linear-gradient(145deg, #7c3aed 0%, #db2777 100%);
}
.lead-date-card--swipe-left {
  transform: translateX(-120%) rotate(-12deg);
  opacity: 0;
}
.lead-date-card--swipe-right {
  transform: translateX(120%) rotate(12deg);
  opacity: 0;
}
.lead-date-card__shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 55%);
  pointer-events: none;
}
.lead-date-card__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 18px;
}
.lead-date-card .lead-pill {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}
.lead-date-card__eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.82;
}
.lead-date-card__city {
  margin: 0;
  font-size: clamp(2rem, 7vw, 2.8rem);
  letter-spacing: -0.05em;
}
.lead-date-card__project {
  margin: 10px 0 0;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.4;
  opacity: 0.95;
}
.lead-date-card__region-label {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.72;
}
.lead-date-card__blurred {
  margin-top: 18px;
  filter: blur(8px);
  opacity: 0.55;
  user-select: none;
  pointer-events: none;
}
.lead-date-card__size,
.lead-date-card__notes {
  margin: 10px 0 0;
  line-height: 1.55;
  opacity: 0.92;
}
.lead-date-card__locked {
  list-style: none;
  margin: 22px 0 0;
  padding: 16px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.22);
  display: grid;
  gap: 12px;
}
.lead-date-card__locked li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.lead-date-card__locked span {
  font-size: 12px;
  opacity: 0.78;
}
.lead-date-card__locked strong {
  font-size: 0.95rem;
}
.lead-date-card__hint {
  margin: 16px 0 0;
  text-align: center;
  font-size: 12px;
  opacity: 0.78;
}
.lead-date-card__notes--locked {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.18);
  border: 1px dashed rgba(255, 255, 255, 0.35);
  font-style: italic;
}
.lead-date-card__locked--guest strong {
  filter: blur(6px);
  user-select: none;
  letter-spacing: 0.08em;
}
.lead-date-card__guest-banner {
  margin: 14px 0 0;
  padding: 12px 14px;
  border-radius: 14px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.24);
}
.lobby-login-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 12px;
  padding: 11px 16px;
  background: linear-gradient(135deg, #db2777 0%, #ea580c 100%);
  color: #fff;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 0 12px 28px rgba(219, 39, 119, 0.28);
}
.lobby-login-cta--wide {
  flex: 1;
  padding: 13px 18px;
}
.lobby-guest-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  background: linear-gradient(135deg, #fff7ed 0%, #fdf2f8 100%);
  border-color: #fbcfe8;
}
.lobby-guest-stats article {
  padding: 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid #fecdd3;
}
.lobby-guest-stats span,
.lobby-guest-stats small {
  display: block;
  color: #64748b;
}
.lobby-guest-stats strong {
  display: block;
  margin: 6px 0;
  font-size: 1.55rem;
}
.lobby-guest-stats__hero strong {
  color: #be185d;
}
.lobby-guest-stats__cta a {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #0f172a;
  color: #fff;
  font-weight: 900;
  text-decoration: none;
}
.lead-deck__buy--guest {
  background: linear-gradient(135deg, #db2777 0%, #ea580c 100%);
}
.purchase-confirm__card--guest {
  text-align: center;
}
.purchase-confirm__badge {
  margin: 0 0 8px;
  color: #be185d;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.purchase-confirm__badge--warn {
  color: #b45309;
}
.purchase-confirm__recharge {
  margin: 0 0 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff7ed;
  color: #9a3412;
  font-weight: 700;
  line-height: 1.5;
}
.purchase-confirm__recharge a,
.purchase-confirm__card--recharge a {
  color: #c2410c;
  font-weight: 900;
  text-decoration: none;
}
.purchase-confirm__shortfall {
  color: #dc2626;
}
.purchase-confirm__card--recharge {
  text-align: center;
}
.lead-deck__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 420px;
  margin: 0 auto;
}
.lead-deck__pass,
.lead-deck__buy {
  border: 0;
  border-radius: 999px;
  padding: 15px 18px;
  font-weight: 900;
  cursor: pointer;
}
.lead-deck__pass {
  background: #fff;
  color: #64748b;
  border: 2px solid #e2e8f0;
}
.lead-deck__buy {
  background: #0f172a;
  color: #fff;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.24);
}
.lead-pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: #e0f2fe;
  color: #075985;
  font-size: 12px;
  font-weight: 800;
}
.market-message {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #dcfce7;
  color: #166534;
  font-weight: 800;
}
.market-message--error {
  background: #fee2e2;
  color: #991b1b;
}
.market-table-wrap {
  overflow-x: auto;
}
.market-table {
  width: 100%;
  border-collapse: collapse;
}
.market-table th,
.market-table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
  vertical-align: top;
}
.market-table span {
  display: block;
  color: #64748b;
}
.coin-delta--add {
  color: #166534;
  font-weight: 800;
}
.coin-delta--deduct {
  color: #b91c1c;
  font-weight: 800;
}
.purchase-confirm {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 24px;
}
.purchase-confirm__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
}
.purchase-confirm__card {
  position: relative;
  width: min(100%, 460px);
  padding: 24px;
  border-radius: 22px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.24);
}
.purchase-confirm__card h2 {
  margin: 0 0 8px;
}
.purchase-confirm__lead {
  margin: 0 0 18px;
  color: #64748b;
  line-height: 1.6;
}
.purchase-confirm__summary {
  display: grid;
  gap: 12px;
  margin: 0 0 20px;
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.purchase-confirm__summary dt {
  color: #64748b;
  font-size: 12px;
}
.purchase-confirm__summary dd {
  margin: 4px 0 0;
  font-weight: 800;
}
.purchase-confirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
@media (max-width: 720px) {
  .market-header,
  .market-section-head,
  .lobby-hall__intro,
  .lead-deck__nav {
    flex-direction: column;
  }
  .market-page {
    padding: 12px;
  }
  .lead-deck__stack {
    min-height: 460px;
  }
}
</style>
