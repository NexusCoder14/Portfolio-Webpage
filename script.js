// ============================================
//   LOGIN SCRIPT
// ============================================

// ── Fill in your credentials here ───────────
const CORRECT_EMAIL    = "kushvin8@gmail.com";   // e.g. "you@example.com"
const CORRECT_PASSWORD = "KushMamania";   // e.g. "mypassword123"

// ── Fill in your redirect page link here ────
const REDIRECT_URL = "cake.html";       // e.g. "portfolio.html" or "https://yoursite.com"

// ════════════════════════════════════════════
//   DO NOT EDIT BELOW THIS LINE
// ════════════════════════════════════════════

const emailInput    = document.querySelector('#email input');
const passwordInput = document.querySelector('#password input');
const enterBtn      = document.querySelector('#buttons a:last-child button');

// ── Create message overlay ───────────────────
const message = document.createElement('div');
message.id = 'login-message';
document.body.appendChild(message);

// ── Inject message styles ────────────────────
const msgStyle = document.createElement('style');
msgStyle.textContent = `
  #login-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    z-index: 9999;
    padding: 28px 44px;
    border-radius: 16px;
    font-family: 'Oxanium', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  #login-message.show {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  #login-message.error {
    background: rgba(255, 40, 80, 0.15);
    border: 1px solid rgba(255, 40, 80, 0.45);
    color: #ff6090;
    box-shadow: 0 0 40px rgba(255, 40, 80, 0.2), 0 8px 32px rgba(0,0,0,0.5);
  }

  #login-message.success {
    background: rgba(0, 255, 200, 0.1);
    border: 1px solid rgba(0, 255, 200, 0.4);
    color: #00ffc8;
    box-shadow: 0 0 40px rgba(0, 255, 200, 0.2), 0 8px 32px rgba(0,0,0,0.5);
  }

  /* Shake animation for wrong login */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }

  .shake {
    animation: shake 0.45s ease;
  }
`;
document.head.appendChild(msgStyle);

// ── Show message helper ───────────────────────
function showMessage(text, type, duration = 2800) {
  message.textContent = text;
  message.className   = `show ${type}`;
  clearTimeout(message._timer);
  message._timer = setTimeout(() => {
    message.className = type; // fade out
  }, duration);
}

// ── Shake card helper ─────────────────────────
function shakeCard() {
  const sections = ['#login_button', '#email', '#password', '#buttons'];
  sections.forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.classList.remove('shake');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('shake');
    el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
  });
}

// ── Main login handler ────────────────────────
function handleLogin() {
  const enteredEmail    = emailInput?.value.trim()    || '';
  const enteredPassword = passwordInput?.value.trim() || '';

  // Empty fields check
  if (!enteredEmail || !enteredPassword) {
    showMessage('⚠  Please fill in all fields.', 'error');
    shakeCard();
    return;
  }

  // Correct credentials → redirect
  if (enteredEmail === CORRECT_EMAIL && enteredPassword === CORRECT_PASSWORD) {
    showMessage('✓  Access granted. Redirecting...', 'success', 1500);
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 1500);
    return;
  }

  // Wrong credentials → display message
  showMessage('Make your own portfolio', 'error');
  shakeCard();
}

// ── Event listeners ───────────────────────────
enterBtn.addEventListener('click', handleLogin);

// Allow pressing Enter key on keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});