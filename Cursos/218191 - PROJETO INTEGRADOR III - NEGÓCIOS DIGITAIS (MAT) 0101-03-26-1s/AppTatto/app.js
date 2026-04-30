// ── Data ──
const artists = [
  {
    id: 1, name: "Rafael Mendes", location: "São Paulo, SP",
    avatar: "assets/images/artist-1.png", cover: "assets/images/work-4.png",
    styles: ["Realismo", "Black & Grey"], rating: 4.9, reviews: 127,
    price: "R$ 300/h", experience: "8 anos",
    bio: "Especialista em realismo e retratos em black & grey. Com mais de 8 anos de experiência, Rafael é reconhecido pela precisão e detalhamento de seus trabalhos. Já participou de convenções internacionais e foi premiado em diversas categorias.",
    portfolio: ["assets/images/work-4.png", "assets/images/work-2.png", "assets/images/work-6.png"],
    whatsapp: "5511999999999"
  },
  {
    id: 2, name: "Camila Torres", location: "Rio de Janeiro, RJ",
    avatar: "assets/images/artist-2.png", cover: "assets/images/work-1.png",
    styles: ["Aquarela", "Colorido"], rating: 4.8, reviews: 95,
    price: "R$ 280/h", experience: "6 anos",
    bio: "Apaixonada por cores vibrantes e técnicas de aquarela na pele. Camila transforma ideias em obras de arte únicas, combinando criatividade com técnica apurada. Seu trabalho é reconhecido pela suavidade das transições e originalidade.",
    portfolio: ["assets/images/work-1.png", "assets/images/work-5.png", "assets/images/work-3.png"],
    whatsapp: "5521999999999"
  },
  {
    id: 3, name: "Lucas Ferreira", location: "Curitiba, PR",
    avatar: "assets/images/artist-3.png", cover: "assets/images/work-2.png",
    styles: ["Geométrico", "Pontilhismo"], rating: 4.7, reviews: 83,
    price: "R$ 250/h", experience: "5 anos",
    bio: "Mestre em padrões geométricos e mandalas. Lucas combina precisão matemática com sensibilidade artística para criar tatuagens hipnotizantes. Cada trabalho é único e pensado para se harmonizar com a anatomia do cliente.",
    portfolio: ["assets/images/work-2.png", "assets/images/work-4.png", "assets/images/work-1.png"],
    whatsapp: "5541999999999"
  },
  {
    id: 4, name: "Ana Beatriz", location: "Belo Horizonte, MG",
    avatar: "assets/images/artist-4.png", cover: "assets/images/work-5.png",
    styles: ["Fine Line", "Minimalista"], rating: 4.9, reviews: 156,
    price: "R$ 320/h", experience: "7 anos",
    bio: "Referência em fine line e tatuagens minimalistas. Ana Beatriz é conhecida pela delicadeza dos seus traços e atenção aos detalhes microscópicos. Seu estúdio acolhedor em BH atrai clientes de todo o Brasil.",
    portfolio: ["assets/images/work-5.png", "assets/images/work-1.png", "assets/images/work-2.png"],
    whatsapp: "5531999999999"
  },
  {
    id: 5, name: "Diego Nakamura", location: "São Paulo, SP",
    avatar: "assets/images/artist-1.png", cover: "assets/images/work-3.png",
    styles: ["Oriental", "Japonês"], rating: 4.8, reviews: 112,
    price: "R$ 350/h", experience: "10 anos",
    bio: "Descendente de japoneses, Diego traz a tradição do Irezumi para o cenário brasileiro. Com uma década de dedicação, seus dragões, carpas koi e samurais são admirados pela riqueza de detalhes e respeito à tradição milenar.",
    portfolio: ["assets/images/work-3.png", "assets/images/work-6.png", "assets/images/work-4.png"],
    whatsapp: "5511988888888"
  },
  {
    id: 6, name: "Juliana Costa", location: "Florianópolis, SC",
    avatar: "assets/images/artist-2.png", cover: "assets/images/work-6.png",
    styles: ["Old School", "Tradicional"], rating: 4.6, reviews: 68,
    price: "R$ 220/h", experience: "4 anos",
    bio: "Fã de old school e neo-tradicional, Juliana traz energia vibrante para cada trabalho. Suas tatuagens com contornos bold e cores clássicas remetem à época de ouro da tatuagem, com um toque contemporâneo e autoral.",
    portfolio: ["assets/images/work-6.png", "assets/images/work-3.png", "assets/images/work-5.png"],
    whatsapp: "5548999999999"
  },
  {
    id: 7, name: "Bruno Carvalho", location: "Porto Alegre, RS",
    avatar: "assets/images/artist-3.png", cover: "assets/images/work-1.png",
    styles: ["Blackwork", "Geométrico"], rating: 4.8, reviews: 105,
    price: "R$ 260/h", experience: "5 anos",
    bio: "Especialista em blackwork de alto contraste e padrões geométricos complexos. Seu trabalho explora o espaço negativo para criar ilusões de ótica e profundidade na pele.",
    portfolio: ["assets/images/work-1.png", "assets/images/work-2.png", "assets/images/work-5.png"],
    whatsapp: "5551999999999"
  },
  {
    id: 8, name: "Mariana Alves", location: "Salvador, BA",
    avatar: "assets/images/artist-4.png", cover: "assets/images/work-4.png",
    styles: ["Aquarela", "Realismo"], rating: 4.9, reviews: 142,
    price: "R$ 290/h", experience: "7 anos",
    bio: "Mariana mistura a precisão do realismo com a fluidez da aquarela, criando retratos e composições únicas que parecem pinturas na pele.",
    portfolio: ["assets/images/work-4.png", "assets/images/work-3.png", "assets/images/work-6.png"],
    whatsapp: "5571999999999"
  },
  {
    id: 9, name: "Tiago Silva", location: "Recife, PE",
    avatar: "assets/images/artist-1.png", cover: "assets/images/work-2.png",
    styles: ["Old School", "Tradicional"], rating: 4.7, reviews: 88,
    price: "R$ 230/h", experience: "6 anos",
    bio: "Tiago respira a cultura da tatuagem clássica. Suas panteras, águias e âncoras são marcadas por traços firmes e cores sólidas que duram uma vida inteira.",
    portfolio: ["assets/images/work-2.png", "assets/images/work-6.png", "assets/images/work-1.png"],
    whatsapp: "5581999999999"
  },
  {
    id: 10, name: "Sofia Rodrigues", location: "Brasília, DF",
    avatar: "assets/images/artist-2.png", cover: "assets/images/work-5.png",
    styles: ["Fine Line", "Pontilhismo"], rating: 4.9, reviews: 175,
    price: "R$ 310/h", experience: "9 anos",
    bio: "Delicadeza e perfeccionismo definem o trabalho de Sofia. Suas tatuagens em fine line e pontilhismo são procuradas por quem busca elegância e discrição.",
    portfolio: ["assets/images/work-5.png", "assets/images/work-4.png", "assets/images/work-3.png"],
    whatsapp: "5561999999999"
  },
  {
    id: 11, name: "Pedro Marques", location: "Goiânia, GO",
    avatar: "assets/images/artist-3.png", cover: "assets/images/work-6.png",
    styles: ["Realismo", "Colorido"], rating: 4.8, reviews: 110,
    price: "R$ 330/h", experience: "8 anos",
    bio: "Especialista em realismo colorido, Pedro consegue capturar a essência da natureza e da vida selvagem em suas tatuagens com uma paleta de cores vibrante.",
    portfolio: ["assets/images/work-6.png", "assets/images/work-1.png", "assets/images/work-2.png"],
    whatsapp: "5562999999999"
  },
  {
    id: 12, name: "Laura Gomes", location: "Campinas, SP",
    avatar: "assets/images/artist-4.png", cover: "assets/images/work-3.png",
    styles: ["Oriental", "Neo Tradicional"], rating: 4.7, reviews: 92,
    price: "R$ 270/h", experience: "5 anos",
    bio: "Laura mistura referências orientais com a estética do neo tradicional, resultando em tatuagens com forte impacto visual e composição harmoniosa.",
    portfolio: ["assets/images/work-3.png", "assets/images/work-5.png", "assets/images/work-4.png"],
    whatsapp: "5519999999999"
  }
];

// ── Location Data (Extracted from artists) ──
const locationData = {};
artists.forEach(a => {
  const [city, state] = a.location.split(', ');
  if (!locationData[state]) locationData[state] = new Set();
  locationData[state].add(city);
});

const popularCities = [
  { city: "São Paulo", state: "SP", emoji: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22"></line><line x1="15" y1="22" x2="15" y2="22"></line><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="9.01" y2="18"></line><line x1="15" y1="18" x2="15.01" y2="18"></line></svg>` },
  { city: "Rio de Janeiro", state: "RJ", emoji: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>` },
  { city: "Belo Horizonte", state: "MG", emoji: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M8 3l4 8 5-5 5 15H2L8 3z"></path></svg>` },
  { city: "Curitiba", state: "PR", emoji: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M12 22v-4"></path><path d="M7 18h10"></path><path d="M12 18l-8-8h5l-4-5h14l-4 5h5z"></path></svg>` }
];

// ── DOM ──
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const artistsGrid = document.getElementById('artistsGrid');

const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');
const locationSearchBtn = document.getElementById('locationSearchBtn');
const popularCitiesGrid = document.getElementById('popularCitiesGrid');
const locationResults = document.getElementById('locationResults');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modalOverlay = document.getElementById('modalOverlay');
const filterBtns = document.querySelectorAll('.filter-btn');

// ── Navbar Scroll ──
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Toggle ──
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ── Theme Toggle removido ──

// ── Render Stars ──
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

// ── Render Location Section ──
function initLocationSearch() {
  // Populate States
  const states = Object.keys(locationData).sort();
  stateSelect.innerHTML = '<option value="">Selecione o estado</option>' + 
    states.map(s => `<option value="${s}">${s}</option>`).join('');

  stateSelect.addEventListener('change', () => {
    const state = stateSelect.value;
    if (state) {
      const cities = Array.from(locationData[state]).sort();
      citySelect.innerHTML = '<option value="">Selecione a cidade</option>' + 
        cities.map(c => `<option value="${c}">${c}</option>`).join('');
      citySelect.disabled = false;
    } else {
      citySelect.innerHTML = '<option value="">Selecione a cidade</option>';
      citySelect.disabled = true;
    }
  });



  locationSearchBtn.addEventListener('click', () => {
    searchByLocation(citySelect.value, stateSelect.value);
  });
}

function searchByLocation(city, state) {
  if (!state) return;
  
  let q = state;
  if (city) q = `${city}, ${state}`;

  const filtered = artists.filter(a => a.location.toLowerCase().includes(q.toLowerCase()));
  
  locationResults.innerHTML = `
    <div style="margin-top: 32px;">
      <h3 style="margin-bottom: 24px;">Resultados para ${q} (${filtered.length})</h3>
      <div class="artists-grid">
        ${renderArtistsHTML(filtered)}
      </div>
    </div>
  `;
  locationResults.classList.add('active');
  observeFadeIns();
  bindCardClicks(locationResults);
  
  locationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Helper to generate HTML for artist cards without updating artistsGrid
function renderArtistsHTML(list) {
  return list.map(a => `
    <div class="artist-card fade-in" data-id="${a.id}">
      <div class="artist-card-img">
        <img src="${a.cover}" alt="Trabalho de ${a.name}" loading="lazy">
        <span class="artist-badge-overlay">${a.experience}</span>
      </div>
      <div class="artist-card-body">
        <div class="artist-card-header">
          <img class="artist-avatar" src="${a.avatar}" alt="${a.name}">
          <div class="artist-card-name">
            <h3>${a.name}</h3>
            <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px; margin-top: -2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${a.location}</p>
          </div>
        </div>
        <div class="artist-card-tags">
          ${a.styles.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
        <div class="artist-card-footer">
          <span class="artist-rating">${renderStars(a.rating)} ${a.rating}</span>
          <span class="artist-price">${a.price}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Modify original renderArtists to use the new helper
function renderArtists(list) {
  artistsGrid.innerHTML = renderArtistsHTML(list);
  observeFadeIns();
  bindCardClicks(artistsGrid);
}

// ── Open Modal ──
function openModal(id) {
  const a = artists.find(x => x.id === id);
  if (!a) return;
  document.getElementById('modalContent').innerHTML = `
    <button class="modal-close" id="modalClose">✕</button>
    <div class="modal-hero">
      <img src="${a.cover}" alt="${a.name}">
      <div class="modal-hero-gradient"></div>
    </div>
    <div class="modal-body">
      <div class="modal-artist-info">
        <img class="modal-avatar" src="${a.avatar}" alt="${a.name}">
        <div>
          <h2>${a.name}</h2>
          <p class="modal-location"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px; margin-top: -2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>${a.location}</p>
        </div>
      </div>
      <div class="modal-stats">
        <div class="modal-stat"><h4>${a.rating}</h4><p>Avaliação</p></div>
        <div class="modal-stat"><h4>${a.reviews}</h4><p>Reviews</p></div>
        <div class="modal-stat"><h4>${a.experience}</h4><p>Experiência</p></div>
        <div class="modal-stat"><h4>${a.price}</h4><p>Valor/Hora</p></div>
      </div>
      <div class="modal-section">
        <h3>Sobre</h3>
        <p>${a.bio}</p>
      </div>
      <div class="modal-section">
        <h3>Estilos</h3>
        <div class="artist-card-tags">${a.styles.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      </div>
      <div class="modal-section">
        <h3>Portfólio</h3>
        <div class="modal-gallery">
          ${a.portfolio.map(p => `<img src="${p}" alt="Trabalho">`).join('')}
        </div>
      </div>
      <button class="modal-contact-btn" onclick="window.open('https://wa.me/${a.whatsapp}?text=Olá ${encodeURIComponent(a.name)}, vi seu perfil no InkSpot e gostaria de agendar uma sessão!', '_blank')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px; margin-top: -2px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Entrar em Contato via WhatsApp
      </button>
    </div>
  `;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').addEventListener('click', closeModal);
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Card Clicks ──
function bindCardClicks(container = document) {
  container.querySelectorAll('.artist-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

// ── Search ──
function handleSearch() {
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cepBtn = document.getElementById('cepInput');
  const cepQ = cepBtn ? cepBtn.value.toLowerCase().trim() : '';
  
  if (!artistsGrid) {
    const url = new URL('buscar.html', window.location.href);
    if (q) url.searchParams.set('q', q);
    if (cepQ) url.searchParams.set('cep', cepQ);
    window.location.href = url.toString();
    return;
  }
  
  if (!q && !cepQ) {
    renderArtists(artists);
    return;
  }
  
  const filtered = artists.filter(a => {
    const matchQ = !q || a.name.toLowerCase().includes(q) || a.styles.some(s => s.toLowerCase().includes(q));
    const matchCep = !cepQ || a.location.toLowerCase().includes(cepQ);
    return matchQ && matchCep;
  });
  renderArtists(filtered);
}
if (searchBtn) searchBtn.addEventListener('click', handleSearch);
if (searchInput) searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(); });

const cepInput = document.getElementById('cepInput');
if (cepInput) cepInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(); });

// ── Filters ──
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const style = btn.dataset.style;
    if (style === 'all') {
      renderArtists(artists);
    } else {
      renderArtists(artists.filter(a => a.styles.some(s => s.toLowerCase().includes(style.toLowerCase()))));
    }
  });
});

// ── Intersection Observer ──
function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

// ── Init ──
if (artistsGrid) {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const cep = params.get('cep');
  
  if (q || cep) {
    if (searchInput && q) searchInput.value = q;
    if (cepInput && cep) cepInput.value = cep;
    handleSearch();
  } else {
    renderArtists(artists);
  }
}

if (document.getElementById('stateSelect')) initLocationSearch();
observeFadeIns();
