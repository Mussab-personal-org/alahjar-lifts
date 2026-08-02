// ===== Alahjar Lifts — interactions =====

// Sticky nav
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Language toggle (AR default / EN)
const langToggle = document.getElementById('langToggle');
const selectOptions = {
  ar: ['طلب عرض سعر', 'عقد صيانة', 'قطع غيار', 'استفسار آخر'],
  en: ['Request a quote', 'Maintenance contract', 'Spare parts', 'Other enquiry'],
};
function setLang(lang) {
  const en = lang === 'en';
  document.body.classList.toggle('en', en);
  document.documentElement.lang = en ? 'en' : 'ar';
  document.documentElement.dir = en ? 'ltr' : 'rtl';
  langToggle.textContent = en ? 'ع' : 'EN';
  document.querySelectorAll('[data-ph-ar]').forEach(el => {
    el.placeholder = en ? el.dataset.phEn : el.dataset.phAr;
  });
  document.querySelectorAll('.contact-form select option').forEach((opt, i) => {
    opt.textContent = selectOptions[en ? 'en' : 'ar'][i];
  });
  localStorage.setItem('alahjar-lang', lang);
}
langToggle.addEventListener('click', () =>
  setLang(document.body.classList.contains('en') ? 'ar' : 'en')
);
setLang(localStorage.getItem('alahjar-lang') || 'ar');

// Reveal on scroll
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form → WhatsApp
const WA_NUMBER = '218914500013';
document.getElementById('waForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const en = document.body.classList.contains('en');
  const subject = f.subject.options[f.subject.selectedIndex].textContent;
  const msg = en
    ? `Hello Alahjar Lifts,\nName: ${f.name.value}\nPhone: ${f.phone.value}\nSubject: ${subject}\n\n${f.body.value}`
    : `مرحباً شركة الأحجار للمصاعد،\nالاسم: ${f.name.value}\nالهاتف: ${f.phone.value}\nالموضوع: ${subject}\n\n${f.body.value}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// Footer year
const y = String(new Date().getFullYear());
document.getElementById('year').textContent = y;
document.getElementById('year2').textContent = y;
