<template>
  <main class="market-page">
    <header class="market-shell market-header">
      <div>
        <p class="market-eyebrow">LoomiHome Admin</p>
        <h1>{{ tr('Lead Control Room', 'Lead 管理后台') }}</h1>
        <p class="market-muted">
          {{
            tr(
              'Create leads, manage contractor coin wallets, and view purchase status.',
              '录入 leads、管理承包商 coin 钱包，并查看购买状态。',
            )
          }}
        </p>
      </div>
      <div class="market-actions">
        <button type="button" class="market-secondary" @click="toggleLang">{{ langToggleLabel }}</button>
        <router-link to="/lobby">{{ tr('Lobby', '大厅') }}</router-link>
        <router-link to="/account">{{ tr('Account', '账号') }}</router-link>
        <button type="button" @click="logout">{{ tr('Logout', '退出登录') }}</button>
      </div>
    </header>

    <section class="market-shell admin-grid">
      <form class="admin-card" @submit.prevent="submitLead">
        <h2>{{ tr('Create Lead', '创建 Lead') }}</h2>
        <label>{{ tr('Customer name', '客户姓名') }}<input v-model="leadForm.customerName" /></label>
        <label>{{ tr('Phone', '电话') }}<input v-model="leadForm.phone" /></label>
        <label>{{ tr('Email', '邮箱') }}<input v-model="leadForm.email" type="email" /></label>
        <label>{{ tr('City', '城市') }}<input v-model="leadForm.city" /></label>
        <label>
          {{ tr('Project type', '项目类型') }}
          <select v-model="leadForm.projectType">
            <option>Patio Cover</option>
            <option>Aluminum Patio Cover</option>
            <option>Glass Patio Cover</option>
            <option>Skyline Combo Cover</option>
            <option>Sunroom</option>
          </select>
        </label>
        <label>{{ tr('Size / scope', '尺寸范围') }}<input v-model="leadForm.size" :placeholder="tr('Example: 12x16 ft', '例如：12x16 ft')" /></label>
        <label>{{ tr('Coin cost', '购买需要 Coin') }}<input v-model.number="leadForm.coinCost" type="number" min="1" /></label>
        <label class="admin-card__full">{{ tr('Notes', '备注') }}<textarea v-model="leadForm.notes"></textarea></label>
        <button type="submit">{{ tr('Add lead', '添加 Lead') }}</button>
        <p v-if="leadMessage" class="market-message" :class="{ 'market-message--error': leadError }">
          {{ leadMessage }}
        </p>
      </form>

      <div class="admin-card">
        <h2>{{ tr('Contractor Wallets', '承包商钱包') }}</h2>
        <div v-for="contractor in contractors" :key="contractor.id" class="wallet-row">
          <div class="wallet-row__info">
            <strong>{{ contractor.name }}</strong>
            <span>{{ contractor.phone || contractor.email }}</span>
            <small>{{ walletBalance(contractor.id) }} coins</small>
          </div>
          <div class="wallet-row__controls">
            <input
              v-model.number="walletAdjustments[contractor.id]"
              type="number"
              min="1"
              step="1"
              :aria-label="tr('Coin amount', 'Coin 数量')"
            />
            <button type="button" @click="changeCoins(contractor.id, 1)">
              {{ tr('Add', '增加') }}
            </button>
            <button type="button" class="wallet-row__deduct" @click="changeCoins(contractor.id, -1)">
              {{ tr('Deduct', '扣除') }}
            </button>
          </div>
        </div>
        <p v-if="walletMessage" class="market-message" :class="{ 'market-message--error': walletError }">
          {{ walletMessage }}
        </p>
      </div>
    </section>

    <section class="market-shell">
      <div class="market-section-head">
        <div>
          <h2>{{ tr('Coin Ledger', 'Coin 记录') }}</h2>
          <p>{{ tr('Every admin add/deduct and lead purchase is logged here.', '管理员增减 coin 和购买 lead 都会记录在这里。') }}</p>
        </div>
        <button type="button" class="market-secondary" @click="refresh">{{ tr('Refresh', '刷新') }}</button>
      </div>
      <div class="market-table-wrap">
        <table class="market-table">
          <thead>
            <tr>
              <th>{{ tr('Time', '时间') }}</th>
              <th>{{ tr('Contractor', '承包商') }}</th>
              <th>{{ tr('Change', '变动') }}</th>
              <th>{{ tr('Balance after', '变动后余额') }}</th>
              <th>{{ tr('Type', '类型') }}</th>
              <th>{{ tr('Details', '说明') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in walletTransactions" :key="row.id">
              <td>{{ formatTime(row.createdAt) }}</td>
              <td>{{ row.contractor?.name || '-' }}</td>
              <td :class="row.delta >= 0 ? 'coin-delta--add' : 'coin-delta--deduct'">
                {{ row.delta >= 0 ? '+' : '' }}{{ row.delta }}
              </td>
              <td>{{ row.balanceAfter }}</td>
              <td>{{ transactionLabel(row.type) }}</td>
              <td>{{ transactionDetails(row) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="!walletTransactions.length" class="market-empty">{{ tr('No coin records yet.', '还没有 coin 记录。') }}</p>
    </section>

    <section class="market-shell">
      <div class="market-section-head">
        <div>
          <h2>{{ tr('All Leads', '全部 Leads') }}</h2>
          <p>
            {{
              tr(
                'New leads enter the lobby and are visible to every contractor until someone buys them.',
                '新 lead 进入大厅，在被购买前所有承包商都能看到。',
              )
            }}
          </p>
        </div>
        <button type="button" class="market-secondary" @click="refresh">{{ tr('Refresh', '刷新') }}</button>
      </div>

      <div class="market-table-wrap">
        <table class="market-table">
          <thead>
            <tr>
              <th>{{ tr('Customer', '客户') }}</th>
              <th>{{ tr('Contact', '联系方式') }}</th>
              <th>{{ tr('Project', '项目') }}</th>
              <th>Coins</th>
              <th>{{ tr('Status', '状态') }}</th>
              <th>{{ tr('Buyer', '购买方') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leads" :key="lead.id">
              <td>{{ lead.customerName }}</td>
              <td>
                <strong>{{ lead.phone }}</strong>
                <span>{{ lead.email || tr('No email', '没有邮箱') }}</span>
              </td>
              <td>{{ lead.projectType }}<br /><small>{{ lead.city }} · {{ lead.size }}</small></td>
              <td>{{ lead.coinCost }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="lead.status === 'available' ? 'status-pill--pool' : 'status-pill--sold'"
                >
                  {{
                    lead.status === 'available'
                      ? tr('In lobby', '大厅中')
                      : tr('Sold', '已售出')
                  }}
                </span>
              </td>
              <td>{{ lead.buyer?.name || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import {
  adjustWallet,
  clearCurrentUser,
  createLead,
  getAdminLeadRows,
  getCurrentUser,
  getWalletBalance,
  listContractors,
  listWalletTransactions,
} from '../utils/leadMarketplaceStore';
import { getMarketplaceLang, marketText, setMarketplaceLang } from '../utils/marketplaceI18n';
import { notifyContractorsNewLead } from '../utils/marketplaceNotify';

function emptyLeadForm() {
  return {
    customerName: '',
    phone: '',
    email: '',
    city: 'Vancouver',
    projectType: 'Patio Cover',
    size: '',
    notes: '',
    coinCost: 25,
  };
}

export default {
  name: 'AdminLeads',
  data() {
    return {
      user: null,
      leads: [],
      contractors: [],
      leadForm: emptyLeadForm(),
      leadMessage: '',
      leadError: false,
      walletAdjustments: {},
      walletMessage: '',
      walletError: false,
      walletTransactions: [],
      lang: getMarketplaceLang(),
    };
  },
  computed: {
    langToggleLabel() {
      return this.lang === 'zh' ? 'English' : '中文';
    },
  },
  created() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      this.$router.replace('/admin-login');
      return;
    }
    this.user = user;
    this.refresh();
  },
  methods: {
    tr(en, zh) {
      return marketText(en, zh, this.lang);
    },
    toggleLang() {
      this.lang = setMarketplaceLang(this.lang === 'zh' ? 'en' : 'zh');
      this.leadMessage = '';
      this.refresh();
    },
    refresh() {
      this.contractors = listContractors();
      this.leads = getAdminLeadRows();
      this.walletTransactions = listWalletTransactions();
      this.contractors.forEach((contractor) => {
        if (!this.walletAdjustments[contractor.id]) {
          this.walletAdjustments[contractor.id] = 50;
        }
      });
    },
    walletBalance(userId) {
      return getWalletBalance(userId);
    },
    async submitLead() {
      const result = createLead(this.leadForm);
      if (!result.ok) {
        this.leadMessage = result.error;
        this.leadError = true;
        return;
      }

      this.leadForm = emptyLeadForm();
      this.refresh();
      this.leadMessage = this.tr('Lead created. Sending contractor alerts...', 'Lead 已创建，正在发送承包商提醒...');
      this.leadError = false;

      const notify = await notifyContractorsNewLead(result.lead, this.contractors, this.lang);
      if (notify.sms.length) {
        this.leadMessage = this.tr('Lead created and contractor SMS alert sent.', 'Lead 已创建，已发送承包商短信提醒。');
      } else if (notify.smsPending) {
        this.leadMessage = this.tr(
          'Lead created. Kalvin gets an in-app alert in the contractor dashboard. SMS to his phone needs server setup.',
          'Lead 已创建。Kalvin 打开承包商后台会收到提醒。手机短信还需要配置服务器。',
        );
      } else {
        this.leadMessage = this.tr(
          'Lead created. Kalvin will get an in-app alert when he opens the contractor dashboard.',
          'Lead 已创建。Kalvin 打开承包商后台时会收到提醒。',
        );
      }

      if (notify.errors.length) {
        this.leadMessage = `${this.leadMessage} ${notify.errors[0]}`;
      }
    },
    changeCoins(userId, direction) {
      const raw = Number(this.walletAdjustments[userId] || 0);
      const amount = Math.round(raw);
      if (!Number.isFinite(amount) || amount <= 0) {
        this.walletMessage = this.tr('Enter a coin amount greater than 0.', '请输入大于 0 的 coin 数量。');
        this.walletError = true;
        return;
      }
      const result = adjustWallet(userId, amount * direction, {
        actorId: this.user.id,
        actorName: this.user.name,
      });
      this.walletMessage = result.ok
        ? this.tr(`Wallet updated. New balance: ${result.balance} coins.`, `钱包已更新。新余额：${result.balance} coins。`)
        : result.error;
      this.walletError = !result.ok;
      this.refresh();
    },
    formatTime(value) {
      if (!value) return '-';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleString(this.lang === 'zh' ? 'zh-CN' : 'en-CA');
    },
    transactionLabel(type) {
      const labels = {
        admin_add: this.tr('Admin add', '管理员增加'),
        admin_deduct: this.tr('Admin deduct', '管理员扣除'),
        lead_purchase: this.tr('Lead purchase', '购买 Lead'),
      };
      return labels[type] || type;
    },
    transactionDetails(row) {
      if (row.type === 'lead_purchase') {
        return row.note || this.tr('Lead purchase', '购买 Lead');
      }
      if (row.actorName) {
        return this.tr(`By ${row.actorName}`, `操作人：${row.actorName}`);
      }
      return row.note || '-';
    },
    logout() {
      clearCurrentUser();
      this.$router.push('/admin-login');
    },
  },
};
</script>

<style>
.admin-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
  gap: 18px;
}
.admin-card {
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}
.admin-card h2 {
  margin-bottom: 4px;
}
.admin-card label {
  display: grid;
  gap: 6px;
  font-weight: 800;
  color: #334155;
}
.admin-card input,
.admin-card select,
.admin-card textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font: inherit;
  background: #fff;
}
.admin-card textarea {
  min-height: 90px;
  resize: vertical;
}
.admin-card button {
  border: 0;
  border-radius: 12px;
  padding: 12px 14px;
  background: #0f172a;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}
.wallet-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #e2e8f0;
}
.wallet-row__info {
  min-width: 0;
}
.wallet-row span,
.wallet-row small {
  display: block;
  color: #64748b;
}
.wallet-row__controls {
  display: grid;
  grid-template-columns: minmax(80px, 1fr) auto auto;
  gap: 8px;
  align-items: center;
}
.wallet-row__controls input {
  min-width: 0;
}
.wallet-row__controls button {
  white-space: nowrap;
}
.wallet-row__deduct {
  background: #f97316 !important;
}
.status-pill {
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-weight: 800;
  font-size: 12px;
}
.status-pill--sold {
  background: #dbeafe;
  color: #1d4ed8;
}
.status-pill--pool {
  background: #fce7f3;
  color: #be185d;
}
.coin-delta--add {
  color: #166534;
  font-weight: 800;
}
.coin-delta--deduct {
  color: #b91c1c;
  font-weight: 800;
}
.market-empty {
  color: #64748b;
}
.market-section-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}
.market-section-head h2 {
  margin: 0;
}
.market-section-head p {
  color: #64748b;
  margin: 6px 0 0;
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
.market-secondary {
  border: 0;
  border-radius: 12px;
  padding: 11px 14px;
  background: #e2e8f0;
  color: #0f172a;
  font-weight: 800;
  cursor: pointer;
}
@media (max-width: 900px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
}
</style>
