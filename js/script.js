// Basic interactive behaviors used across pages
document.addEventListener('DOMContentLoaded', function () {
  // Update year in footer
  const years = ['year','year2','year3','year4','year5','year6','year7'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // Hamburger menu toggle: show/hide sidebar only + ARIA state
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  toggle && toggle.addEventListener('click', function () {
    if (!sidebar) return;
    const isActive = sidebar.classList.toggle('active');
    this.setAttribute('aria-expanded', String(isActive));
  });

  // Close sidebar when clicking outside of it
  document.addEventListener('click', function(e) {
    if (sidebar && toggle && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Simple smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({behavior:'smooth'});
    });
  });

  // Modal logic (Home page)
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const btnResume = document.getElementById('btnResume');
  const btnContact = document.getElementById('btnContact');
  function openModal(title, html) {
    if (!modal || !modalBody || !modalTitle) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  document.querySelectorAll('[data-close]')?.forEach(el=> el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeModal(); });
  // Close sidebar on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')){
      sidebar.classList.remove('active');
      toggle && toggle.setAttribute('aria-expanded', 'false');
    }
  });
  // Open a sample resume website instead of showing a modal
  btnResume && btnResume.addEventListener('click', ()=>{
    const resumeUrl = 'https://flowcv.com/resume/norsdg4d6p7l';
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  });
  btnContact && btnContact.addEventListener('click', ()=>{
    openModal('Contact Me', '<ul style="list-style:none; padding-left:0; margin:0; display:grid; gap:.5rem;">\
      <li><strong>Email:</strong> johnjuliusdavid.business@gmail.com</li>\
      <li><strong>Phone:</strong> 09457592677</li>\
      <li><strong>Location:</strong> Pampanga</li>\
    </ul>');
  });

  // Open certificate PDF when a cert card is clicked
  const certCards = document.querySelectorAll('.cert-card[data-pdf]');
  if (certCards.length) {
    certCards.forEach(card => {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => {
        const pdf = card.getAttribute('data-pdf');
        if (pdf) window.open(pdf, '_blank', 'noopener');
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const pdf = card.getAttribute('data-pdf');
          if (pdf) window.open(pdf, '_blank', 'noopener');
        }
      });
    });
  }
});
