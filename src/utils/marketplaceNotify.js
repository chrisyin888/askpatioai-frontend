import siteData from '../data/siteData.json';
import { marketText } from './marketplaceI18n';

const ALERTS_KEY = 'loomihome_marketplace_alerts_v1';
const LEAD_API_URL = siteData.site.leadApiUrl || 'https://fastapi-0bcw.onrender.com/lead';
const API_BASE = LEAD_API_URL.replace(/\/lead\/?$/, '');
const WEBHOOK_URL = siteData.site.contractorNotifyWebhookUrl || '';
const SMS_NOTIFY_URL = siteData.site.contractorSmsNotifyUrl || `${API_BASE}/notify-contractor-sms`;
const CONTRACTOR_LOGIN_URL =
  typeof window !== 'undefined' ? `${window.location.origin}/lobby` : 'https://loomihomepatios.ca/lobby';

function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return digits ? `+${digits}` : '';
}

export function formatNewLeadMessage(lead, lang = 'en') {
  const city = lead.city || '-';
  const project = lead.projectType || '-';
  const coins = lead.coinCost || 0;
  return marketText(
    `New LoomiHome lead: ${city} · ${project} · ${coins} coins. Enter the lobby: ${CONTRACTOR_LOGIN_URL}`,
    `LoomiHome 新 Lead：${city} · ${project} · ${coins} coins。请进入大厅：${CONTRACTOR_LOGIN_URL}`,
    lang,
  );
}

function pushLocalContractorAlert(lead, contractors) {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const raw = window.localStorage.getItem(ALERTS_KEY);
  let alerts = [];
  try {
    alerts = raw ? JSON.parse(raw) : [];
  } catch {
    alerts = [];
  }

  const entry = {
    id: `alert_${lead.id}`,
    leadId: lead.id,
    contractorIds: contractors.map((c) => c.id),
    messageEn: formatNewLeadMessage(lead, 'en'),
    messageZh: formatNewLeadMessage(lead, 'zh'),
    createdAt: new Date().toISOString(),
    readBy: [],
  };

  alerts.unshift(entry);
  window.localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 50)));
}

export function listUnreadAlertsForContractor(contractorId) {
  if (typeof window === 'undefined' || !window.localStorage) return [];

  const raw = window.localStorage.getItem(ALERTS_KEY);
  let alerts = [];
  try {
    alerts = raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }

  return alerts.filter(
    (alert) =>
      Array.isArray(alert.contractorIds) &&
      alert.contractorIds.includes(contractorId) &&
      !(alert.readBy || []).includes(contractorId),
  );
}

export function markContractorAlertsRead(contractorId, alertIds = []) {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const raw = window.localStorage.getItem(ALERTS_KEY);
  if (!raw) return;

  let alerts = [];
  try {
    alerts = JSON.parse(raw);
  } catch {
    return;
  }

  const idSet = new Set(alertIds);
  alerts = alerts.map((alert) => {
    if (idSet.size > 0 && !idSet.has(alert.id)) return alert;
    if (!Array.isArray(alert.contractorIds) || !alert.contractorIds.includes(contractorId)) return alert;
    const readBy = new Set(alert.readBy || []);
    readBy.add(contractorId);
    return { ...alert, readBy: [...readBy] };
  });

  window.localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}

export async function syncMarketplaceLeadToBackend(lead) {
  const payload = {
    source: 'marketplace_admin',
    name: lead.customerName,
    phone: lead.phone,
    email: lead.email || '',
    city: lead.city,
    project_type: lead.projectType,
    size: lead.size || '',
    message: `Marketplace lead · ${lead.coinCost} coins`,
    notes: lead.notes || '',
  };

  const res = await fetch(LEAD_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Lead sync failed (${res.status})`);
  }

  return res.json().catch(() => ({}));
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json().catch(() => ({}));
}

async function notifyContractorPhone(phone, lead, message) {
  const normalizedPhone = normalizePhone(phone);
  const payload = {
    phone: normalizedPhone,
    to: normalizedPhone,
    message,
    lead_id: lead.id,
    city: lead.city,
    project_type: lead.projectType,
    coin_cost: lead.coinCost,
  };

  if (WEBHOOK_URL) {
    await postJson(WEBHOOK_URL, payload);
    return { channel: 'webhook', ok: true };
  }

  try {
    await postJson(SMS_NOTIFY_URL, payload);
    return { channel: 'sms_api', ok: true };
  } catch (error) {
    if (SMS_NOTIFY_URL.includes('/notify-contractor-sms')) {
      throw error;
    }
    throw error;
  }
}

export async function notifyContractorsNewLead(lead, contractors, lang = 'en') {
  const message = formatNewLeadMessage(lead, lang);
  const result = {
    localAlert: false,
    backendSynced: false,
    sms: [],
    smsPending: false,
    errors: [],
  };

  pushLocalContractorAlert(lead, contractors);
  result.localAlert = true;

  try {
    await syncMarketplaceLeadToBackend(lead);
    result.backendSynced = true;
  } catch (error) {
    result.errors.push(
      marketText(
        `Lead saved locally, but backend sync failed: ${error.message}`,
        `Lead 已保存在本地，但同步到后台失败：${error.message}`,
        lang,
      ),
    );
  }

  await Promise.all(
    contractors
      .filter((contractor) => contractor.phone)
      .map(async (contractor) => {
        try {
          const sent = await notifyContractorPhone(contractor.phone, lead, message);
          result.sms.push({ phone: contractor.phone, ...sent });
        } catch (error) {
          if (WEBHOOK_URL) {
            result.errors.push(
              marketText(
                `SMS alert to ${contractor.phone} failed: ${error.message}`,
                `发送短信到 ${contractor.phone} 失败：${error.message}`,
                lang,
              ),
            );
          } else {
            result.smsPending = true;
          }
        }
      }),
  );

  return result;
}

export function showBrowserLeadNotification(title, body) {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    new Notification(title, { body, tag: 'loomihome-new-lead' });
    return true;
  } catch {
    return false;
  }
}

export async function ensureNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return Notification.requestPermission();
}

export async function sendPasswordResetEmail(user, code, lang = 'en') {
  const LEAD_API_URL = siteData.site.leadApiUrl || 'https://fastapi-0bcw.onrender.com/lead';
  const message = marketText(
    `Your LoomiHome password reset code is ${code}. It expires in 15 minutes.`,
    `你的 LoomiHome 密码重置验证码是 ${code}，15 分钟内有效。`,
    lang,
  );
  const payload = {
    source: 'marketplace_password_reset',
    name: user.name || 'Contractor',
    phone: user.phone || '-',
    email: user.email,
    city: 'Marketplace',
    project_type: 'Password reset',
    message,
    notes: 'Marketplace contractor password reset code.',
  };

  const res = await fetch(LEAD_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Reset email failed (${res.status})`);
  }

  return res.json().catch(() => ({}));
}
