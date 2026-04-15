const API_BASE_URL = 'http://localhost:3000';
const TOKEN_KEY = 'streamx_token';

const imgs = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=225&q=70&fit=crop',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=225&q=70&fit=crop'
];

const titles = [
  'Sombras do Passado', 'Neon City', 'O Ultimo Horizonte', 'Furia dos Mares',
  'A Chave Perdida', 'Detetive 404', 'Raizes do Caos', 'Era Glacial', 'Pulso',
  'Destino Vermelho', 'Eco Fatal', 'Luminar', 'Vento Norte', 'Portal X'
];

const progresses = [72, 35, 88, 15, 60, 44];

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function setStatus(message, level = 'warn') {
  const el = document.getElementById('api-status');
  if (!el) return;

  el.classList.remove('ok', 'warn', 'error');
  el.classList.add(level);
  el.textContent = message;
}

async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (options.withAuth !== false && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.message || 'Falha na requisicao da API');
    err.status = response.status;
    err.payload = data;
    throw err;
  }

  return data;
}

async function login(email, password) {
  const result = await apiRequest('/autenticacao/login', {
    method: 'POST',
    withAuth: false,
    body: { email, password }
  });

  const token = result.data;
  if (!token) {
    throw new Error('Token nao retornado no login');
  }

  setToken(token);
  return result;
}

async function getSinopses() {
  const result = await apiRequest('/sinopse');
  return Array.isArray(result.data) ? result.data : [];
}

function makeCard(name, imgUrl, progress) {
  const card = document.createElement('div');
  card.className = 'card' + (progress !== undefined ? ' progress-card' : '');
  card.innerHTML = `
    <img class="card-img" src="${imgUrl}" alt="${name}" loading="lazy">
    <div class="card-overlay">
      <div class="card-actions">
        <div class="card-btn play-btn"></div>
        <div class="card-btn add-btn"></div>
        <div class="card-btn like-btn"></div>
      </div>
      <div class="card-name">${name}</div>
    </div>
    ${progress !== undefined ? `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${progress}%"></div></div>` : ''}
  `;
  return card;
}

function makeTop10Card(num, name, imgUrl) {
  const card = document.createElement('div');
  card.className = 'top10-card';
  card.innerHTML = `
    <div class="top10-number">${num}</div>
    <div class="top10-img-wrap">
      <img src="${imgUrl}" alt="${name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
    </div>
  `;
  return card;
}

function fillFallbackContent() {
  const continueTrack = document.getElementById('track-continue');
  continueTrack.innerHTML = '';
  for (let i = 0; i < 6; i += 1) {
    continueTrack.appendChild(makeCard(titles[i], imgs[i], progresses[i]));
  }

  const top10Track = document.getElementById('track-top10');
  top10Track.innerHTML = '';
  for (let i = 1; i <= 10; i += 1) {
    top10Track.appendChild(makeTop10Card(i, titles[i - 1], imgs[(i - 1) % imgs.length]));
  }

  const cats = [
    { title: 'Populares Agora', offset: 0 },
    { title: 'Acao e Aventura', offset: 2 },
    { title: 'Series Premiadas', offset: 4 },
    { title: 'Suspense e Terror', offset: 6 },
    { title: 'Comedia', offset: 1 }
  ];

  const dynContainer = document.getElementById('dynamic-sections');
  dynContainer.innerHTML = '';

  cats.forEach((cat, ci) => {
    const section = document.createElement('div');
    section.className = 'section';
    const trackId = `track-cat-${ci}`;
    const wrapId = `cw-cat-${ci}`;

    section.innerHTML = `
      <div class="section-header">
        <div class="section-label">
          <div class="section-accent"></div>
          <div class="section-title">${cat.title}</div>
        </div>
        <a href="#" class="see-all">Ver tudo -></a>
      </div>
      <div class="carousel-wrapper" id="${wrapId}">
        <button class="arrow arrow-left" data-dir="-1" data-wrap="${wrapId}">‹</button>
        <div class="carousel-track" id="${trackId}"></div>
        <button class="arrow arrow-right" data-dir="1" data-wrap="${wrapId}">›</button>
      </div>
    `;

    dynContainer.appendChild(section);

    const track = section.querySelector(`#${trackId}`);
    for (let i = 0; i < 12; i += 1) {
      const idx = (i + cat.offset) % titles.length;
      const imgIdx = (i + cat.offset) % imgs.length;
      track.appendChild(makeCard(titles[idx], imgs[imgIdx]));
    }
  });

  bindDynamicArrows();
}

function bindDynamicArrows() {
  document.querySelectorAll('[data-wrap][data-dir]').forEach((btn) => {
    btn.addEventListener('click', () => {
      scrollCarousel(btn.getAttribute('data-wrap'), Number(btn.getAttribute('data-dir')));
    });
  });
}

function renderSinopses(sinopses) {
  const continueTrack = document.getElementById('track-continue');
  continueTrack.innerHTML = '';

  sinopses.slice(0, 8).forEach((sinopse, idx) => {
    const nome = sinopse.informacoes || `Sinopse ${idx + 1}`;
    const img = imgs[idx % imgs.length];
    continueTrack.appendChild(makeCard(nome, img, progresses[idx % progresses.length]));
  });
}

window.scrollCarousel = function scrollCarousel(wrapperId, dir) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  if (!track) return;

  track.scrollLeft += dir * (200 + 10) * 3;
};

window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 40);
});

document.getElementById('btn-login').addEventListener('click', async () => {
  const email = document.getElementById('api-email').value.trim();
  const password = document.getElementById('api-password').value;

  if (!email || !password) {
    setStatus('Preencha email e senha.', 'warn');
    return;
  }

  setStatus('Autenticando...', 'warn');

  try {
    await login(email, password);
    setStatus('Login realizado com sucesso. Token salvo.', 'ok');
  } catch (error) {
    clearToken();
    setStatus(`Erro no login: ${error.message}`, 'error');
  }
});

document.getElementById('btn-load-sinopses').addEventListener('click', async () => {
  setStatus('Buscando sinopses...', 'warn');

  try {
    const sinopses = await getSinopses();
    renderSinopses(sinopses);
    setStatus(`Sinopses carregadas: ${sinopses.length}`, 'ok');
  } catch (error) {
    if (error.status === 403 || error.status === 401) {
      setStatus('Sem autorizacao. Faca login antes de carregar.', 'error');
      return;
    }

    setStatus(`Erro ao carregar sinopses: ${error.message}`, 'error');
  }
});

fillFallbackContent();
if (getToken()) {
  setStatus('Token detectado. Pronto para consumir API.', 'ok');
}

window.streamxApi = {
  getToken,
  clearToken,
  login,
  getSinopses
};
