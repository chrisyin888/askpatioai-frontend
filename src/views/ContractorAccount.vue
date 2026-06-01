<template>
  <main class="market-page market-account">
    <header class="market-shell market-header">
      <div>
        <p class="market-eyebrow">{{ tr('Account', '账号') }}</p>
        <h1>{{ tr('Change Password', '修改密码') }}</h1>
        <p class="market-muted">
          {{ tr('Update your marketplace login password.', '更新你的 marketplace 登录密码。') }}
        </p>
      </div>
      <div class="market-actions">
        <button type="button" class="market-secondary" @click="toggleLang">{{ langToggleLabel }}</button>
        <router-link v-if="user.role === 'admin'" to="/admin-leads">{{ tr('Admin', '管理员后台') }}</router-link>
        <router-link v-else to="/lobby">{{ tr('Lobby', '大厅') }}</router-link>
        <button type="button" @click="logout">{{ tr('Logout', '退出登录') }}</button>
      </div>
    </header>

    <section class="market-shell account-card">
      <p class="account-card__who">
        <strong>{{ user.name }}</strong>
        <span>{{ user.email || user.phone }}</span>
      </p>

      <form class="account-form" @submit.prevent="submit">
        <label>
          {{ tr('Current password', '当前密码') }}
          <span class="account-form__password">
            <input v-model="currentPassword" :type="showCurrent ? 'text' : 'password'" autocomplete="current-password" required />
            <button type="button" class="account-form__toggle" @click="showCurrent = !showCurrent">
              {{ showCurrent ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <label>
          {{ tr('New password', '新密码') }}
          <span class="account-form__password">
            <input v-model="newPassword" :type="showNew ? 'text' : 'password'" autocomplete="new-password" required />
            <button type="button" class="account-form__toggle" @click="showNew = !showNew">
              {{ showNew ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <label>
          {{ tr('Confirm new password', '确认新密码') }}
          <span class="account-form__password">
            <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" autocomplete="new-password" required />
            <button type="button" class="account-form__toggle" @click="showConfirm = !showConfirm">
              {{ showConfirm ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <p v-if="message" class="market-message" :class="{ 'market-message--error': messageIsError }">{{ message }}</p>
        <button type="submit">{{ tr('Save new password', '保存新密码') }}</button>
      </form>
    </section>
  </main>
</template>

<script>
import {
  changeMarketplacePassword,
  clearCurrentUser,
  getCurrentUser,
} from '../utils/leadMarketplaceStore';
import { getMarketplaceLang, marketText, setMarketplaceLang } from '../utils/marketplaceI18n';

export default {
  name: 'ContractorAccount',
  data() {
    return {
      user: {},
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrent: false,
      showNew: false,
      showConfirm: false,
      message: '',
      messageIsError: false,
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
    if (!user) {
      this.$router.replace('/contractor-login');
      return;
    }
    this.user = user;
  },
  methods: {
    tr(en, zh) {
      return marketText(en, zh, this.lang);
    },
    toggleLang() {
      this.lang = setMarketplaceLang(this.lang === 'zh' ? 'en' : 'zh');
      this.message = '';
    },
    submit() {
      const result = changeMarketplacePassword(
        this.user.id,
        this.currentPassword,
        this.newPassword,
        this.confirmPassword,
      );
      this.message = result.ok
        ? this.tr('Password updated successfully.', '密码已更新。')
        : result.error;
      this.messageIsError = !result.ok;
      if (result.ok) {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }
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
.market-header h1 {
  margin: 0;
  letter-spacing: -0.04em;
}
.market-muted {
  color: #64748b;
}
.market-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.market-actions a,
.market-actions button {
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
  background: #e2e8f0 !important;
  color: #0f172a !important;
}
.account-card {
  width: min(560px, 100%);
}
.account-card__who {
  margin: 0 0 18px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}
.account-card__who span {
  display: block;
  margin-top: 4px;
  color: #64748b;
}
.account-form {
  display: grid;
  gap: 14px;
}
.account-form label {
  display: grid;
  gap: 6px;
  font-weight: 700;
  color: #334155;
}
.account-form input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 48px 13px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font: inherit;
}
.account-form__password {
  position: relative;
  display: block;
}
.account-form__toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}
.account-form button[type='submit'] {
  border: 0;
  border-radius: 12px;
  padding: 13px 16px;
  font-weight: 800;
  cursor: pointer;
  background: #0f172a;
  color: #fff;
}
.market-message {
  margin: 0;
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
@media (max-width: 720px) {
  .market-header {
    flex-direction: column;
  }
  .market-page {
    padding: 12px;
  }
}
</style>
