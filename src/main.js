// Yappi AI Interactive Frontend Logic (Safe DOM Manipulation & Calculations)

document.addEventListener('DOMContentLoaded', () => {
  initChatDemo();
  initRoiCalculator();
  initFaqAccordion();
  initHeaderScroll();
});

/* ==========================================================================
   Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.background = 'rgba(10, 13, 20, 0.95)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
    } else {
      header.style.background = 'rgba(10, 13, 20, 0.85)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });
}

/* ==========================================================================
   Interactive Chat Simulation Demo
   ========================================================================== */
const SCENARIOS = {
  faq: [
    { sender: 'user', text: 'Do you ship to Canada and how long does it take?' },
    { sender: 'bot', text: 'Yes! 🇨🇦 We ship to Canada via Express Shipping (3–5 business days). Orders over $75 USD also qualify for free standard shipping.' },
    { sender: 'user', text: 'What is your return policy if it doesn’t fit?' },
    { sender: 'bot', text: 'We offer hassle-free 30-day returns on all apparel with prepaid return labels. Would you like me to recommend your exact size?' }
  ],
  cart: [
    { sender: 'user', text: 'I am looking at the Leather Weekend Duffle, but it is a bit out of my budget.' },
    { sender: 'bot', text: 'I understand! That duffle is our #1 bestseller crafted from full-grain Italian leather. 🎒' },
    { sender: 'bot', text: 'Since you’re ordering today, I can unlock an exclusive 15% instant checkout code: VIP15. Would you like me to apply it to your cart?' },
    { sender: 'user', text: 'Yes please! That works.' },
    { sender: 'bot', text: 'Done! Discount VIP15 applied. Total updated from $220 ➔ $187. Ready for checkout!' }
  ],
  tracking: [
    { sender: 'user', text: 'Where is my order #YP-9482?' },
    { sender: 'bot', text: 'Checking Shopify tracking... 🔍 Your package was dispatched yesterday via DHL Express (Tracking: #DHL-8839201).' },
    { sender: 'bot', text: '📍 Status: Out for delivery today by 4:00 PM. Would you like SMS updates sent to your phone?' }
  ]
};

function initChatDemo() {
  const chatFeed = document.getElementById('chat-feed');
  const scenarioButtons = document.querySelectorAll('.scenario-btn');
  if (!chatFeed || scenarioButtons.length === 0) return;

  function renderScenario(scenarioKey) {
    chatFeed.replaceChildren(); // Safe DOM clear
    const messages = SCENARIOS[scenarioKey] || SCENARIOS.faq;

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${msg.sender === 'user' ? 'user' : 'bot'}`;

        const avatar = document.createElement('div');
        avatar.className = `msg-avatar ${msg.sender === 'bot' ? 'ai' : ''}`;
        avatar.textContent = msg.sender === 'user' ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = msg.text;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatFeed.appendChild(msgDiv);

        chatFeed.scrollTop = chatFeed.scrollHeight;
      }, idx * 450);
    });
  }

  scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      scenarioButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenario = btn.getAttribute('data-scenario');
      renderScenario(scenario);
    });
  });

  // Initial load
  renderScenario('faq');
}

/* ==========================================================================
   ROI / Revenue Uplift Calculator
   ========================================================================== */
function initRoiCalculator() {
  const visitorsSlider = document.getElementById('slider-visitors');
  const aovSlider = document.getElementById('slider-aov');
  const visitorsVal = document.getElementById('val-visitors');
  const aovVal = document.getElementById('val-aov');
  const roiHighlight = document.getElementById('roi-revenue-num');

  if (!visitorsSlider || !aovSlider || !roiHighlight) return;

  function calculateUplift() {
    const monthlyVisitors = parseInt(visitorsSlider.value, 10);
    const avgOrderValue = parseInt(aovSlider.value, 10);

    // Update labels safely
    if (visitorsVal) visitorsVal.textContent = Number(monthlyVisitors).toLocaleString() + ' / mo';
    if (aovVal) aovVal.textContent = '$' + avgOrderValue;

    // Math: Average Shopify store conversion rate is ~1.8%.
    // Yappi increases sales conversion by ~18% through proactive chat & recovery.
    // Estimated additional orders = monthlyVisitors * 0.018 * 0.18
    const baseOrders = monthlyVisitors * 0.018;
    const additionalOrders = baseOrders * 0.18;
    const estimatedExtraRevenue = Math.round(additionalOrders * avgOrderValue);

    roiHighlight.textContent = '+$' + Number(estimatedExtraRevenue).toLocaleString();
  }

  visitorsSlider.addEventListener('input', calculateUplift);
  aovSlider.addEventListener('input', calculateUplift);
  calculateUplift();
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
