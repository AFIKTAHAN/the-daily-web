// public/js/common.js - קוד משותף לכל הדפים (Vanilla JS בלבד, ללא ספריות חיצוניות)
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // תאריך אמיתי של היום במסך העליון (masthead), כמו בעיתון מודפס
  var dateEl = document.getElementById('mastheadDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('he-IL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // מצב כהה/בהיר - האפליקציה עצמה (בניגוד לתצוגה המקדימה בצ'אט) רצה בדפדפן
  // הרגיל של המשתמש, כך שאפשר להשתמש ב-localStorage לזכירת ההעדפה בבטחה.
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('dailyweb_theme', next);
      } catch (e) {
        /* localStorage לא זמין - ההעדפה פשוט לא תישמר בין ביקורים */
      }
    });
  }
})();

// עזר קטן לכל שאר קבצי ה-JS: fetch עם JSON, וזריקת שגיאה קריאה אם הבקשה נכשלה
async function apiRequest(url, options) {
  var response = await fetch(url, Object.assign({ headers: { 'Content-Type': 'application/json' } }, options));
  var data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }
  if (!response.ok) {
    var message = (data && data.message) || 'אירעה שגיאה, נסו שוב';
    throw new Error(message);
  }
  return data;
}
