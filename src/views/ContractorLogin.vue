<template>
  <main class="market-auth">
    <section class="market-auth__card">
      <div class="market-auth__top">
        <p class="market-auth__eyebrow">LoomiHome Lead Marketplace</p>
        <button type="button" class="market-lang-toggle" @click="toggleLang">
          {{ langToggleLabel }}
        </button>
      </div>

      <h1 v-if="mode === 'login'">{{ tr('Contractor Login', '承包商登录') }}</h1>
      <h1 v-else-if="mode === 'forgot-request'">{{ tr('Forgot Password', '忘记密码') }}</h1>
      <h1 v-else>{{ tr('Reset Password', '重置密码') }}</h1>

      <p class="market-auth__lead">
        <template v-if="mode === 'login'">
          {{
            tr(
              'Sign in with your contractor email or phone number.',
              '请使用承包商邮箱或手机号登录。',
            )
          }}
        </template>
        <template v-else-if="mode === 'forgot-request'">
          {{
            tr(
              'Enter your account email and we will send a 6-digit reset code.',
              '输入账号邮箱，我们会发送 6 位验证码。',
            )
          }}
        </template>
        <template v-else>
          {{
            tr(
              'Enter the reset code from your email and choose a new password.',
              '输入邮件里的验证码，并设置新密码。',
            )
          }}
        </template>
      </p>

      <form v-if="mode === 'login'" class="market-auth__form" @submit.prevent="login">
        <label>
          {{ tr('Email or phone', '邮箱或手机号') }}
          <input v-model="email" type="text" autocomplete="username" required />
        </label>
        <label>
          {{ tr('Password', '密码') }}
          <span class="market-auth__password">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
            />
            <button type="button" class="market-auth__password-toggle" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <button type="button" class="market-auth__link" @click="openForgotRequest">
          {{ tr('Forgot password?', '忘记密码？') }}
        </button>
        <p v-if="error" class="market-auth__error">{{ error }}</p>
        <p v-if="success" class="market-auth__success">{{ success }}</p>
        <button type="submit">{{ tr('Login', '登录') }}</button>
        <router-link class="market-auth__secondary-link" to="/admin-login">
          {{ tr('Admin login', '管理员登录') }}
        </router-link>
      </form>

      <form v-else-if="mode === 'forgot-request'" class="market-auth__form" @submit.prevent="sendResetCode">
        <label>
          {{ tr('Account email', '账号邮箱') }}
          <input v-model="resetEmail" type="email" autocomplete="email" required />
        </label>
        <p v-if="error" class="market-auth__error">{{ error }}</p>
        <p v-if="success" class="market-auth__success">{{ success }}</p>
        <button type="submit" :disabled="sendingReset">
          {{ sendingReset ? tr('Sending...', '发送中...') : tr('Send reset code', '发送验证码') }}
        </button>
        <button type="button" class="market-auth__secondary" @click="mode = 'login'">
          {{ tr('Back to login', '返回登录') }}
        </button>
      </form>

      <form v-else class="market-auth__form" @submit.prevent="submitReset">
        <label>
          {{ tr('Account email', '账号邮箱') }}
          <input v-model="resetEmail" type="email" autocomplete="email" required />
        </label>
        <label>
          {{ tr('Reset code', '验证码') }}
          <input v-model="resetCode" type="text" inputmode="numeric" maxlength="6" required />
        </label>
        <label>
          {{ tr('New password', '新密码') }}
          <span class="market-auth__password">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
            />
            <button type="button" class="market-auth__password-toggle" @click="showNewPassword = !showNewPassword">
              {{ showNewPassword ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <label>
          {{ tr('Confirm new password', '确认新密码') }}
          <span class="market-auth__password">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
            />
            <button type="button" class="market-auth__password-toggle" @click="showConfirmPassword = !showConfirmPassword">
              {{ showConfirmPassword ? '🙈' : '👁' }}
            </button>
          </span>
        </label>
        <p v-if="error" class="market-auth__error">{{ error }}</p>
        <p v-if="success" class="market-auth__success">{{ success }}</p>
        <button type="submit">{{ tr('Reset password', '重置密码') }}</button>
        <button type="button" class="market-auth__secondary" @click="mode = 'forgot-request'">
          {{ tr('Resend code', '重新发送验证码') }}
        </button>
      </form>
    </section>
  </main>
</template>

<script>
import {
  createPasswordResetCode,
  loginMarketplaceUser,
  resetMarketplacePassword,
} from '../utils/leadMarketplaceStore';
import { getMarketplaceLang, marketText, setMarketplaceLang } from '../utils/marketplaceI18n';
import { sendPasswordResetEmail } from '../utils/marketplaceNotify';

export default {
  name: 'ContractorLogin',
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      showPassword: false,
      resetEmail: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false,
      sendingReset: false,
      error: '',
      success: '',
      lang: getMarketplaceLang(),
    };
  },
  computed: {
    langToggleLabel() {
      return this.lang === 'zh' ? 'English' : '中文';
    },
  },
  methods: {
    tr(en, zh) {
      return marketText(en, zh, this.lang);
    },
    toggleLang() {
      this.lang = setMarketplaceLang(this.lang === 'zh' ? 'en' : 'zh');
      this.error = '';
      this.success = '';
    },
    openForgotRequest() {
      this.mode = 'forgot-request';
      this.resetEmail = this.email.includes('@') ? this.email : '';
      this.error = '';
      this.success = '';
    },
    login() {
      const result = loginMarketplaceUser(this.email, this.password, { role: 'contractor' });
      if (!result.ok) {
        this.error = result.error;
        this.success = '';
        return;
      }
      this.error = '';
      const redirect = typeof this.$route.query.redirect === 'string' ? this.$route.query.redirect : '/lobby';
      this.$router.push(redirect);
    },
    async sendResetCode() {
      this.error = '';
      this.success = '';
      this.sendingReset = true;
      const result = createPasswordResetCode(this.resetEmail, { role: 'contractor' });
      if (!result.ok) {
        this.error = result.error;
        this.sendingReset = false;
        return;
      }
      try {
        await sendPasswordResetEmail(result.user, result.code, this.lang);
        this.mode = 'forgot-reset';
        this.success = this.tr(
          'Reset code sent. Check your email and enter the code below.',
          '验证码已发送，请查收邮件并输入验证码。',
        );
      } catch {
        this.error = this.tr(
          'Could not send reset email. Try again or contact admin.',
          '验证码邮件发送失败，请重试或联系管理员。',
        );
      } finally {
        this.sendingReset = false;
      }
    },
    submitReset() {
      this.error = '';
      this.success = '';
      const result = resetMarketplacePassword(
        this.resetEmail,
        this.resetCode,
        this.newPassword,
        this.confirmPassword,
        { role: 'contractor' },
      );
      if (!result.ok) {
        this.error = result.error;
        return;
      }
      this.mode = 'login';
      this.email = this.resetEmail;
      this.password = '';
      this.resetCode = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.success = this.tr('Password reset successful. You can log in now.', '密码重置成功，现在可以登录。');
    },
  },
};
</script>

<style>
.market-auth {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #e0f2fe 0%, #f8fafc 42%, #ecfeff 100%);
  color: #0f172a;
}
.market-auth__card {
  width: min(100%, 520px);
  padding: 32px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.16);
  border: 1px solid rgba(226, 232, 240, 0.9);
}
.market-auth__eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0284c7;
}
.market-auth__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}
.market-lang-toggle {
  background: #e0f2fe !important;
  color: #075985 !important;
  padding: 8px 12px !important;
  border-radius: 999px !important;
}
.market-auth h1 {
  margin: 0 0 10px;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.06em;
}
.market-auth__lead {
  margin: 0 0 24px;
  color: #475569;
  line-height: 1.6;
}
.market-auth__form {
  display: grid;
  gap: 14px;
}
.market-auth label {
  display: grid;
  gap: 6px;
  font-weight: 700;
  color: #334155;
}
.market-auth input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font: inherit;
}
.market-auth__password {
  position: relative;
  display: block;
}
.market-auth__password input {
  padding-right: 48px;
}
.market-auth__password-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0 !important;
  border: 0;
  border-radius: 999px;
  background: transparent !important;
  color: #64748b !important;
}
.market-auth button,
.market-auth__secondary {
  border: 0;
  border-radius: 12px;
  padding: 13px 16px;
  font-weight: 800;
  cursor: pointer;
  background: #0f172a;
  color: #fff;
}
.market-auth__secondary {
  background: #e2e8f0;
  color: #0f172a;
}
.market-auth__link {
  justify-self: start;
  padding: 0;
  background: transparent;
  color: #0284c7;
  font-weight: 700;
}
.market-auth__error {
  margin: 0;
  color: #b91c1c;
  font-weight: 700;
}
.market-auth__success {
  margin: 0;
  color: #166534;
  font-weight: 700;
}
.market-auth__secondary-link {
  display: block;
  text-align: center;
  color: #64748b;
  font-weight: 700;
  text-decoration: none;
}
</style>
