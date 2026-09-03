// ── Auth System ──
const Auth = (() => {
  const USERS_KEY = 'inkspot-users';
  const SESSION_KEY = 'inkspot-session';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }
  function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function register(data) {
    const users = getUsers();
    if (users.find(u => u.email === data.email)) {
      return { ok: false, msg: 'Este e-mail já está cadastrado.' };
    }
    const user = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type, // 'client' or 'artist'
      phone: data.phone || '',
      city: data.city || '',
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);
    const session = { ...user };
    delete session.password;
    saveSession(session);
    return { ok: true, user: session };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, msg: 'E-mail ou senha incorretos.' };
    const session = { ...user };
    delete session.password;
    saveSession(session);
    return { ok: true, user: session };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    return getSession();
  }

  return { register, login, logout, currentUser };
})();

// ── Auth UI ──
const authOverlay = document.getElementById('authOverlay');
const authModal = document.getElementById('authModal');
const navAuthArea = document.getElementById('navAuthArea');

function openAuth(mode = 'login') {
  renderAuthForm(mode);
  authOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  authOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

authOverlay.addEventListener('click', e => { if (e.target === authOverlay) closeAuth(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && authOverlay.classList.contains('active')) closeAuth();
});

function renderAuthForm(mode) {
  const isLogin = mode === 'login';
  authModal.innerHTML = `
    <button class="modal-close" onclick="closeAuth()">✕</button>
    <div class="auth-header">
      <div class="auth-logo">Ink<span>Spot</span></div>
      <h2>${isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
      <p>${isLogin ? 'Entre para acessar sua conta' : 'Junte-se à maior comunidade de tatuagem do Brasil'}</p>
    </div>
    <div class="auth-tabs">
      <button class="auth-tab ${isLogin ? 'active' : ''}" onclick="renderAuthForm('login')">Entrar</button>
      <button class="auth-tab ${!isLogin ? 'active' : ''}" onclick="renderAuthForm('register')">Cadastrar</button>
    </div>
    <form class="auth-form" id="authForm" onsubmit="handleAuthSubmit(event, '${mode}')">
      <div id="authError" class="auth-error" style="display:none"></div>
      ${!isLogin ? `
        <div class="auth-field">
          <label for="authName">Nome completo</label>
          <input type="text" id="authName" placeholder="Seu nome" required>
        </div>
        <div class="auth-type-selector">
          <label>Eu sou:</label>
          <div class="auth-type-options">
            <label class="auth-type-option">
              <input type="radio" name="userType" value="client" checked>
              <div class="auth-type-card">
                <span class="auth-type-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                <span class="auth-type-label">Cliente</span>
                <span class="auth-type-desc">Quero encontrar tatuadores</span>
              </div>
            </label>
            <label class="auth-type-option">
              <input type="radio" name="userType" value="artist">
              <div class="auth-type-card">
                <span class="auth-type-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg></span>
                <span class="auth-type-label">Tatuador</span>
                <span class="auth-type-desc">Quero divulgar meu trabalho</span>
              </div>
            </label>
          </div>
        </div>
      ` : ''}
      <div class="auth-field">
        <label for="authEmail">E-mail</label>
        <input type="email" id="authEmail" placeholder="seu@email.com" required>
      </div>
      <div class="auth-field">
        <label for="authPassword">Senha</label>
        <div class="auth-password-wrap">
          <input type="password" id="authPassword" placeholder="${isLogin ? 'Sua senha' : 'Mínimo 6 caracteres'}" required minlength="6">
          <button type="button" class="auth-eye" onclick="togglePasswordVisibility()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
        </div>
      </div>
      ${!isLogin ? `
        <div class="auth-field">
          <label for="authCity">Cidade</label>
          <input type="text" id="authCity" placeholder="Ex: São Paulo, SP">
        </div>
      ` : ''}
      <button type="submit" class="auth-submit">${isLogin ? 'Entrar' : 'Criar Conta'}</button>
      ${isLogin ? `<p class="auth-switch">Não tem conta? <a href="#" onclick="event.preventDefault();renderAuthForm('register')">Cadastre-se grátis</a></p>` : `<p class="auth-switch">Já tem conta? <a href="#" onclick="event.preventDefault();renderAuthForm('login')">Faça login</a></p>`}
    </form>
  `;
}

function togglePasswordVisibility() {
  const pw = document.getElementById('authPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

function showAuthError(msg) {
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.style.display = 'block';
  el.classList.add('shake');
  setTimeout(() => el.classList.remove('shake'), 500);
}

function handleAuthSubmit(e, mode) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;

  if (mode === 'login') {
    const res = Auth.login(email, password);
    if (!res.ok) return showAuthError(res.msg);
    closeAuth();
    updateNavAuth();
    showToast(`Olá, ${res.user.name}!`);
  } else {
    const name = document.getElementById('authName').value.trim();
    const type = document.querySelector('input[name="userType"]:checked').value;
    const city = document.getElementById('authCity')?.value.trim() || '';
    if (password.length < 6) return showAuthError('A senha deve ter pelo menos 6 caracteres.');
    const res = Auth.register({ name, email, password, type, city });
    if (!res.ok) return showAuthError(res.msg);
    closeAuth();
    updateNavAuth();
    showToast(`Conta criada com sucesso! Bem-vindo, ${res.user.name}!`);
  }
}

function updateNavAuth() {
  const user = Auth.currentUser();
  if (user) {
    const initial = user.name.charAt(0).toUpperCase();
    const typeLabel = user.type === 'artist' 
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;margin-top:-2px"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg> Artista' 
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;margin-top:-2px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Cliente';
    navAuthArea.innerHTML = `
      <div class="nav-user" id="navUser">
        <div class="nav-user-avatar">${initial}</div>
        <span class="nav-user-name">${user.name.split(' ')[0]}</span>
        <div class="nav-user-dropdown" id="userDropdown">
          <div class="dropdown-header">
            <div class="dropdown-avatar">${initial}</div>
            <div>
              <p class="dropdown-name">${user.name}</p>
              <p class="dropdown-type">${typeLabel}</p>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" onclick="event.preventDefault()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Configurações</a>
          <a class="dropdown-item" href="#" onclick="event.preventDefault()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> Favoritos</a>
          ${user.type === 'artist' ? '<a class="dropdown-item" href="#" onclick="event.preventDefault()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> Meu Painel</a>' : ''}
          <div class="dropdown-divider"></div>
          <a class="dropdown-item dropdown-logout" href="#" onclick="event.preventDefault();handleLogout()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Sair</a>
        </div>
      </div>
    `;
    document.getElementById('navUser').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown').classList.toggle('show');
    });
    document.addEventListener('click', () => {
      const dd = document.getElementById('userDropdown');
      if (dd) dd.classList.remove('show');
    });
  } else {
    navAuthArea.innerHTML = `
      <button class="nav-login-btn" onclick="openAuth('login')">Entrar</button>
      <button class="nav-cta" onclick="openAuth('register')">Cadastrar</button>
    `;
  }
}

function handleLogout() {
  Auth.logout();
  updateNavAuth();
  showToast('Você saiu da sua conta.');
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Init auth UI
updateNavAuth();
