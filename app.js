// ===== Struts2 Reference - App JS =====

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initSearch();
  initCopyButtons();
  initScrollSpy();
  initBackToTop();
});

// ===== Sidebar Toggle (Mobile) =====
function initSidebar() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Close sidebar on nav click (mobile)
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      }
    });
  });
}

// ===== Search =====
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const headerSearch = document.querySelector('.header-search');

  // Mobile search toggle
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
      headerSearch.classList.toggle('mobile-show');
      if (headerSearch.classList.contains('mobile-show')) {
        searchInput.focus();
      }
    });
  }

  const sections = document.querySelectorAll('.section');
  const searchData = [];

  sections.forEach(section => {
    const id = section.id;
    const h2 = section.querySelector('h2');
    const title = h2 ? h2.textContent : '';
    const cards = section.querySelectorAll('.card h3');
    const subItems = [];
    cards.forEach(card => subItems.push(card.textContent));
    searchData.push({ id, title, subItems });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        return;
      }

      const results = [];
      searchData.forEach(item => {
        if (item.title.toLowerCase().includes(query)) {
          results.push({ text: item.title, id: item.id });
        }
        item.subItems.forEach(sub => {
          if (sub.toLowerCase().includes(query)) {
            results.push({ text: sub + ' — ' + item.title, id: item.id });
          }
        });
      });

      if (results.length > 0) {
        searchResults.innerHTML = results.slice(0, 8).map(r =>
          `<div class="search-result-item" data-id="${r.id}">${r.text}</div>`
        ).join('');
        searchResults.classList.add('active');

        searchResults.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const target = document.getElementById(item.dataset.id);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            searchResults.classList.remove('active');
            searchInput.value = '';
            headerSearch.classList.remove('mobile-show');
          });
        });
      } else {
        searchResults.innerHTML = '<div class="search-result-item">ไม่พบผลลัพธ์</div>';
        searchResults.classList.add('active');
      }
    });

    // Close search results on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search')) {
        searchResults.classList.remove('active');
      }
    });
  }
}

// ===== Copy Code Buttons =====
function initCopyButtons() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

// ===== Scroll Spy =====
function initScrollSpy() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
        if (activeNav) activeNav.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
