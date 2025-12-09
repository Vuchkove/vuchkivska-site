const btn = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  if(theme === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

btn.addEventListener('click', () => {
  const current = body.classList.contains('dark') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if(saved) {
    applyTheme(saved);
  } else {
    // Якщо нема вибору, застосувати системну тему
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
});
