const STORAGE_KEY = 'loomihome_lead_marketplace_v9';
const SESSION_KEY = 'loomihome_lead_marketplace_session_v1';
const RESET_STORAGE_KEY = 'loomihome_marketplace_password_resets_v1';

import { marketText } from './marketplaceI18n';
import { LEGACY_LEADS } from '../data/legacyLeads';

export const MARKETPLACE_RECHARGE_CONTACT = {
  name: 'Chris',
  phone: '2369690888',
};

export function getInsufficientCoinsMessage(cost, balance) {
  const need = Number(cost || 0);
  const have = Number(balance || 0);
  return marketText(
    `Not enough coins. This lead costs ${need} coins and you have ${have}. Contact ${MARKETPLACE_RECHARGE_CONTACT.name} at ${MARKETPLACE_RECHARGE_CONTACT.phone} to top up.`,
    `Coin 余额不足。这个 lead 需要 ${need} coins，你当前有 ${have} coins。请联系 ${MARKETPLACE_RECHARGE_CONTACT.name} 充值：${MARKETPLACE_RECHARGE_CONTACT.phone}。`,
  );
}

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function resolveLegacyBuyerId(lead, index) {
  const notes = String(lead.notes || '').toLowerCase();
  if (notes.includes('kalvin')) return 'contractor-kalvin';
  if (notes.includes('chris')) return 'contractor-chris';
  return index % 2 === 0 ? 'contractor-kalvin' : 'contractor-chris';
}

function inferLegacyPurchasedAt(lead, index) {
  const notes = String(lead.notes || '');
  const year = 2025;

  const mayMatch = notes.match(/May\s+(\d{1,2})/i) || notes.match(/5月\s*(\d{1,2})/);
  if (mayMatch) {
    const day = String(mayMatch[1]).padStart(2, '0');
    return new Date(`${year}-05-${day}T16:30:00`).toISOString();
  }

  const juneMatch = notes.match(/June\s+(\d{1,2})/i) || notes.match(/6月\s*(\d{1,2})/);
  if (juneMatch) {
    const day = String(juneMatch[1]).padStart(2, '0');
    return new Date(`${year}-06-${day}T16:30:00`).toISOString();
  }

  const day = String((index % 27) + 1).padStart(2, '0');
  return new Date(`${year}-05-${day}T14:00:00`).toISOString();
}

function buildLegacySoldLeads() {
  const base = new Date('2025-05-01T10:00:00').getTime();
  return LEGACY_LEADS.map((lead, index) => {
    const buyerId = resolveLegacyBuyerId(lead, index);
    return {
      id: `legacy-lead-${index + 1}`,
      customerName: lead.customerName,
      phone: lead.phone,
      email: lead.email || '',
      city: lead.city,
      projectType: lead.projectType,
      size: lead.size || '',
      notes: lead.notes || '',
      coinCost: lead.coinCost || 25,
      status: 'sold',
      buyerId,
      createdAt: new Date(base + index * 3600000).toISOString(),
    };
  });
}

function buildLegacyPurchases(leads) {
  return leads.map((lead, index) => ({
    id: `legacy-purchase-${index + 1}`,
    contractorId: lead.buyerId,
    leadId: lead.id,
    coinCost: lead.coinCost || 25,
    purchasedAt: inferLegacyPurchasedAt(LEGACY_LEADS[index], index),
  }));
}

function mergeLegacySoldRecords(state) {
  if (state.legacySoldImported) return state;

  const legacyLeads = buildLegacySoldLeads();
  const leadIds = new Set((state.leads || []).map((lead) => lead.id));
  const purchaseLeadIds = new Set((state.purchases || []).map((purchase) => purchase.leadId));

  const newLeads = legacyLeads.filter((lead) => !leadIds.has(lead.id));
  const newPurchases = buildLegacyPurchases(legacyLeads).filter(
    (purchase) => !purchaseLeadIds.has(purchase.leadId),
  );

  state.leads = [...(state.leads || []), ...newLeads];
  state.purchases = [...newPurchases, ...(state.purchases || [])];
  state.legacySoldImported = true;
  return state;
}

function buildSeedLeads() {
  const samples = [
    { city: 'Surrey', projectType: 'Sunroom', size: '12x16', coinCost: 30 },
    { city: 'Burnaby', projectType: 'Patio Cover', size: '10x10', coinCost: 25 },
    { city: 'Richmond', projectType: 'Glass Patio Cover', size: '14x9', coinCost: 30 },
    { city: 'Coquitlam', projectType: 'Aluminum Patio Cover', size: '16x5', coinCost: 25 },
  ];

  return samples.map((sample, index) => ({
    id: `seed-lead-${index + 1}`,
    customerName: 'Homeowner',
    phone: '604-000-0000',
    email: '',
    city: sample.city,
    projectType: sample.projectType,
    size: sample.size,
    notes: 'New homeowner inquiry in Greater Vancouver.',
    coinCost: sample.coinCost,
    status: 'available',
    buyerId: '',
    createdAt: new Date(Date.now() - index * 3600000).toISOString(),
  }));
}

function defaultState() {
  const legacyLeads = buildLegacySoldLeads();
  return {
    users: [
      {
        id: 'admin',
        role: 'admin',
        name: 'Chris',
        email: 'chrisyin0082@gmail.com',
        password: 'w0626975',
      },
      {
        id: 'contractor-kalvin',
        role: 'contractor',
        name: 'Kalvin',
        email: '',
        phone: '7788988169',
        password: '7788988169',
      },
      {
        id: 'contractor-chris',
        role: 'contractor',
        name: 'Chris',
        email: 'chrisyin0082@gmail.com',
        phone: '',
        password: 'w0626975',
      },
    ],
    wallets: {
      'contractor-kalvin': { userId: 'contractor-kalvin', balance: 0 },
      'contractor-chris': { userId: 'contractor-chris', balance: 0 },
    },
    leads: [...buildSeedLeads(), ...legacyLeads],
    purchases: buildLegacyPurchases(legacyLeads),
    walletTransactions: [],
    legacySoldImported: true,
  };
}

function isBrowserStorageAvailable() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

function mergeWithDefaults(parsed = {}) {
  const defaults = defaultState();
  const userMap = new Map(defaults.users.map((user) => [user.id, { ...user }]));
  for (const user of parsed.users || []) {
    const existing = userMap.get(user.id);
    userMap.set(user.id, existing ? { ...existing, ...user } : { ...user });
  }

  const wallets = { ...defaults.wallets, ...(parsed.wallets || {}) };
  for (const user of userMap.values()) {
    if (user.role === 'contractor' && !wallets[user.id]) {
      wallets[user.id] = { userId: user.id, balance: 0 };
    }
  }

  const leads = Array.isArray(parsed.leads) && parsed.leads.length ? parsed.leads : defaults.leads;
  const purchases = Array.isArray(parsed.purchases) ? parsed.purchases : defaults.purchases;

  return mergeLegacySoldRecords({
    ...defaults,
    ...parsed,
    users: [...userMap.values()],
    wallets,
    leads,
    purchases,
    walletTransactions: Array.isArray(parsed.walletTransactions) ? parsed.walletTransactions : [],
    legacySoldImported: parsed.legacySoldImported === true,
  });
}

export function loadMarketplaceState() {
  if (!isBrowserStorageAvailable()) return defaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = defaultState();
    saveMarketplaceState(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    const merged = mergeWithDefaults(parsed);
    saveMarketplaceState(merged);
    return merged;
  } catch {
    const seeded = defaultState();
    saveMarketplaceState(seeded);
    return seeded;
  }
}

export function saveMarketplaceState(state) {
  if (!isBrowserStorageAvailable()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getCurrentUser() {
  if (!isBrowserStorageAvailable()) return null;
  const userId = window.localStorage.getItem(SESSION_KEY);
  if (!userId) return null;
  return loadMarketplaceState().users.find((u) => u.id === userId) || null;
}

export function setCurrentUser(userId) {
  if (!isBrowserStorageAvailable()) return;
  window.localStorage.setItem(SESSION_KEY, userId);
}

export function clearCurrentUser() {
  if (!isBrowserStorageAvailable()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

function normalizeLoginId(value) {
  const raw = String(value || '').trim().toLowerCase();
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10 ? digits : raw;
}

function userMatchesLogin(user, loginId) {
  const normalized = normalizeLoginId(loginId);
  if (String(user.email || '').trim().toLowerCase() === String(loginId || '').trim().toLowerCase()) {
    return true;
  }
  if (user.phone && normalizeLoginId(user.phone) === normalized) {
    return true;
  }
  return false;
}

export function loginMarketplaceUser(loginId, password = '', options = {}) {
  const { role } = options;
  const state = loadMarketplaceState();
  const user = state.users.find((u) => {
    if (role && u.role !== role) return false;
    return userMatchesLogin(u, loginId);
  });

  if (!user) {
    return {
      ok: false,
      error: role === 'admin'
        ? marketText('No admin account found for that email.', '没有找到这个邮箱对应的管理员账号。')
        : role === 'contractor'
          ? marketText('No contractor account found for that email or phone.', '没有找到这个邮箱或手机号对应的承包商账号。')
          : marketText('No account found for that email or phone.', '没有找到这个邮箱或手机号对应的账号。'),
    };
  }

  if (user.password && user.password !== password) {
    return { ok: false, error: marketText('Incorrect password.', '密码不正确。') };
  }

  setCurrentUser(user.id);
  return { ok: true, user: clone(user) };
}

export function listContractors() {
  return loadMarketplaceState().users.filter((u) => u.role === 'contractor');
}

export function getWalletBalance(userId) {
  const state = loadMarketplaceState();
  return Number(state.wallets[userId]?.balance || 0);
}

function recordWalletTransaction(state, entry) {
  if (!Array.isArray(state.walletTransactions)) {
    state.walletTransactions = [];
  }
  state.walletTransactions.unshift({
    id: makeId('wtx'),
    createdAt: nowIso(),
    ...entry,
  });
  state.walletTransactions = state.walletTransactions.slice(0, 200);
}

export function listWalletTransactions(options = {}) {
  const { contractorId = '', limit = 100 } = options;
  const state = loadMarketplaceState();
  let rows = Array.isArray(state.walletTransactions) ? state.walletTransactions : [];
  if (contractorId) {
    rows = rows.filter((row) => row.contractorId === contractorId);
  }
  return rows.slice(0, limit).map((row) => ({
    ...row,
    contractor: state.users.find((user) => user.id === row.contractorId) || null,
  }));
}

export function topUpWallet(userId, amount, options = {}) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) {
    return { ok: false, error: marketText('Top-up amount must be greater than 0.', '充值数量必须大于 0。') };
  }
  return adjustWallet(userId, Math.round(value), options);
}

export function adjustWallet(userId, delta, options = {}) {
  const value = Math.round(Number(delta));
  if (!Number.isFinite(value) || value === 0) {
    return { ok: false, error: marketText('Coin amount must not be 0.', 'Coin 数量不能是 0。') };
  }

  const state = loadMarketplaceState();
  const wallet = state.wallets[userId] || { userId, balance: 0 };
  const current = Number(wallet.balance || 0);
  const next = current + value;
  if (next < 0) {
    return {
      ok: false,
      error: marketText(
        `Cannot deduct ${Math.abs(value)} coins. Current balance is ${current}.`,
        `不能扣 ${Math.abs(value)} coins。当前余额是 ${current}。`,
      ),
    };
  }

  wallet.balance = next;
  state.wallets[userId] = wallet;

  const type = options.type || (value > 0 ? 'admin_add' : 'admin_deduct');
  recordWalletTransaction(state, {
    contractorId: userId,
    delta: value,
    balanceAfter: next,
    type,
    note: options.note || '',
    leadId: options.leadId || '',
    actorId: options.actorId || '',
    actorName: options.actorName || '',
  });

  saveMarketplaceState(state);
  return { ok: true, balance: wallet.balance };
}

export function createLead(input) {
  const coinCost = Math.max(1, Math.round(Number(input.coinCost) || 1));
  const lead = {
    id: makeId('lead'),
    customerName: String(input.customerName || '').trim(),
    phone: String(input.phone || '').trim(),
    email: String(input.email || '').trim(),
    city: String(input.city || '').trim(),
    projectType: String(input.projectType || '').trim(),
    size: String(input.size || '').trim(),
    notes: String(input.notes || '').trim(),
    coinCost,
    status: 'available',
    buyerId: '',
    createdAt: nowIso(),
  };

  if (!lead.customerName || !lead.phone || !lead.city || !lead.projectType) {
    return {
      ok: false,
      error: marketText(
        'Customer name, phone, city, and project type are required.',
        '客户姓名、电话、城市、项目类型是必填的。',
      ),
    };
  }

  const state = loadMarketplaceState();
  state.leads.unshift(lead);
  saveMarketplaceState(state);
  return { ok: true, lead: clone(lead) };
}

export function listLeadsForContractor(contractorId) {
  const state = loadMarketplaceState();
  const purchasedIds = new Set(
    state.purchases.filter((p) => p.contractorId === contractorId).map((p) => p.leadId),
  );

  return sortLeadsByCity(
    state.leads.map((lead) => {
      const purchased = purchasedIds.has(lead.id);
      return {
        ...lead,
        purchased,
        contactLocked: !purchased,
        customerName: purchased ? lead.customerName : marketText('Buy to unlock', '购买后解锁'),
        phone: purchased ? lead.phone : marketText('Buy to unlock', '购买后解锁'),
        email: purchased ? lead.email : marketText('Buy to unlock', '购买后解锁'),
      };
    }),
  );
}

export function listLeadsForGuestPreview() {
  const state = loadMarketplaceState();
  const lockedName = marketText('Hidden until login', '登录后可见');
  const lockedPhone = marketText('*** *** ****', '*** *** ****');
  const lockedEmail = marketText('***@***.***', '***@***.***');

  return sortLeadsByCity(
    state.leads
      .filter((lead) => lead.status !== 'sold')
      .map((lead) => ({
      ...lead,
      previewMode: true,
      purchased: false,
      contactLocked: true,
      notesLocked: true,
      customerName: lockedName,
      phone: lockedPhone,
      email: lockedEmail,
      notes: '',
    })),
  );
}

function compareByCity(a, b) {
  const cityCompare = String(a.city || '').localeCompare(String(b.city || ''), 'en', {
    sensitivity: 'base',
    numeric: true,
  });
  if (cityCompare !== 0) return cityCompare;
  const projectCompare = String(a.projectType || '').localeCompare(String(b.projectType || ''), 'en', {
    sensitivity: 'base',
  });
  if (projectCompare !== 0) return projectCompare;
  return String(a.id || '').localeCompare(String(b.id || ''));
}

export function sortLeadsByCity(items) {
  return [...items].sort(compareByCity);
}

export function listSoldLeadsForLobby() {
  const state = loadMarketplaceState();
  return sortLeadsByCity(
    state.leads
      .filter((lead) => lead.status === 'sold')
      .map((lead) => {
        const purchase = state.purchases.find((entry) => entry.leadId === lead.id);
        const buyerId = purchase?.contractorId || lead.buyerId;
        const buyer = state.users.find((user) => user.id === buyerId);
        return {
          id: lead.id,
          city: lead.city,
          projectType: lead.projectType,
          coinCost: purchase?.coinCost ?? lead.coinCost,
          purchasedAt: purchase?.purchasedAt || lead.createdAt,
          buyerName: buyer?.name || marketText('Contractor', '承包商'),
        };
      }),
  );
}

export function listPurchasesForContractor(contractorId) {
  const state = loadMarketplaceState();
  return state.purchases
    .filter((p) => p.contractorId === contractorId)
    .map((purchase) => ({
      ...purchase,
      lead: state.leads.find((lead) => lead.id === purchase.leadId) || null,
    }))
    .sort((a, b) => String(b.purchasedAt).localeCompare(String(a.purchasedAt)));
}

export function purchaseLead(contractorId, leadId) {
  const state = loadMarketplaceState();
  const lead = state.leads.find((item) => item.id === leadId);
  if (!lead) return { ok: false, error: marketText('Lead not found.', '没有找到这个 lead。') };

  const alreadyPurchased = state.purchases.some(
    (purchase) => purchase.contractorId === contractorId && purchase.leadId === leadId,
  );
  if (alreadyPurchased) {
    return { ok: false, error: marketText('You already purchased this lead.', '你已经购买过这个 lead。') };
  }

  if (lead.status === 'sold' && lead.buyerId && lead.buyerId !== contractorId) {
    return { ok: false, error: marketText('This lead has already been sold.', '这个 lead 已经被其他承包商购买。') };
  }

  const wallet = state.wallets[contractorId] || { userId: contractorId, balance: 0 };
  const cost = Number(lead.coinCost || 0);
  if (wallet.balance < cost) {
    return {
      ok: false,
      error: getInsufficientCoinsMessage(cost, wallet.balance),
      insufficientCoins: true,
    };
  }

  wallet.balance -= cost;
  state.wallets[contractorId] = wallet;
  recordWalletTransaction(state, {
    contractorId,
    delta: -cost,
    balanceAfter: wallet.balance,
    type: 'lead_purchase',
    note: `${lead.city} · ${lead.projectType}`,
    leadId: lead.id,
  });
  lead.status = 'sold';
  lead.buyerId = contractorId;
  state.purchases.unshift({
    id: makeId('purchase'),
    contractorId,
    leadId,
    coinCost: cost,
    purchasedAt: nowIso(),
  });
  saveMarketplaceState(state);

  return { ok: true, lead: clone(lead), balance: wallet.balance };
}

export function getAdminLeadRows() {
  const state = loadMarketplaceState();
  return state.leads.map((lead) => ({
    ...lead,
    buyer: state.users.find((user) => user.id === lead.buyerId) || null,
  }));
}

function findUserByLoginId(state, loginId, role = '') {
  return state.users.find((user) => {
    if (role && user.role !== role) return false;
    return userMatchesLogin(user, loginId);
  });
}

function validateNewPassword(newPassword, confirmPassword) {
  const next = String(newPassword || '');
  const confirm = String(confirmPassword || '');
  if (next.length < 6) {
    return {
      ok: false,
      error: marketText('Password must be at least 6 characters.', '密码至少 6 位。'),
    };
  }
  if (next !== confirm) {
    return { ok: false, error: marketText('Passwords do not match.', '两次密码不一致。') };
  }
  return { ok: true, password: next };
}

function loadResetEntry(userId) {
  if (!isBrowserStorageAvailable()) return null;
  const raw = window.localStorage.getItem(RESET_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed[userId] || null;
  } catch {
    return null;
  }
}

function saveResetEntry(userId, entry) {
  if (!isBrowserStorageAvailable()) return;
  const raw = window.localStorage.getItem(RESET_STORAGE_KEY);
  let parsed = {};
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    parsed = {};
  }
  parsed[userId] = entry;
  window.localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(parsed));
}

function clearResetEntry(userId) {
  if (!isBrowserStorageAvailable()) return;
  const raw = window.localStorage.getItem(RESET_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    delete parsed[userId];
    window.localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    window.localStorage.removeItem(RESET_STORAGE_KEY);
  }
}

export function changeMarketplacePassword(userId, currentPassword, newPassword, confirmPassword) {
  const state = loadMarketplaceState();
  const user = state.users.find((item) => item.id === userId);
  if (!user) {
    return { ok: false, error: marketText('Account not found.', '没有找到账号。') };
  }
  if (user.password !== currentPassword) {
    return { ok: false, error: marketText('Current password is incorrect.', '当前密码不正确。') };
  }
  const validated = validateNewPassword(newPassword, confirmPassword);
  if (!validated.ok) return validated;
  user.password = validated.password;
  saveMarketplaceState(state);
  return { ok: true };
}

export function createPasswordResetCode(loginId, options = {}) {
  const { role } = options;
  const state = loadMarketplaceState();
  const user = findUserByLoginId(state, loginId, role);
  if (!user) {
    return {
      ok: false,
      error: role === 'admin'
        ? marketText('No admin account found for that email.', '没有找到这个邮箱对应的管理员账号。')
        : role === 'contractor'
          ? marketText('No contractor account found for that email or phone.', '没有找到这个邮箱或手机号对应的承包商账号。')
          : marketText('No account found for that email or phone.', '没有找到这个邮箱或手机号对应的账号。'),
    };
  }
  if (!String(user.email || '').trim()) {
    return {
      ok: false,
      error: marketText(
        'This account has no email on file. Contact admin for help.',
        '这个账号没有绑定邮箱，请联系管理员。',
      ),
    };
  }
  const code = String(Math.floor(100000 + Math.random() * 900000));
  saveResetEntry(user.id, {
    code,
    expiresAt: Date.now() + 15 * 60 * 1000,
  });
  return {
    ok: true,
    user: clone({ id: user.id, name: user.name, email: user.email }),
    code,
  };
}

export function resetMarketplacePassword(loginId, code, newPassword, confirmPassword, options = {}) {
  const { role } = options;
  const state = loadMarketplaceState();
  const user = findUserByLoginId(state, loginId, role);
  if (!user) {
    return {
      ok: false,
      error: role === 'admin'
        ? marketText('No admin account found for that email.', '没有找到这个邮箱对应的管理员账号。')
        : role === 'contractor'
          ? marketText('No contractor account found for that email or phone.', '没有找到这个邮箱或手机号对应的承包商账号。')
          : marketText('No account found for that email or phone.', '没有找到这个邮箱或手机号对应的账号。'),
    };
  }
  const resetEntry = loadResetEntry(user.id);
  if (!resetEntry) {
    return {
      ok: false,
      error: marketText('Reset code expired or not requested yet.', '验证码已过期或尚未申请。'),
    };
  }
  if (Date.now() > Number(resetEntry.expiresAt || 0)) {
    clearResetEntry(user.id);
    return { ok: false, error: marketText('Reset code has expired.', '验证码已过期。') };
  }
  if (String(resetEntry.code) !== String(code || '').trim()) {
    return { ok: false, error: marketText('Reset code is incorrect.', '验证码不正确。') };
  }
  const validated = validateNewPassword(newPassword, confirmPassword);
  if (!validated.ok) return validated;
  user.password = validated.password;
  saveMarketplaceState(state);
  clearResetEntry(user.id);
  return { ok: true };
}
