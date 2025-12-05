// Smooth link handling (works across pages)
document.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  const href = a.getAttribute('href') || '';
  if(href.startsWith('#')){
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth'});
  }
});

// Contact form demo (used on contact.html)
function sendMessage(e){
  if(e) e.preventDefault();
  const name = document.getElementById('name')?.value?.trim();
  const email = document.getElementById('email')?.value?.trim();
  const message = document.getElementById('message')?.value?.trim();
  if(!name || !email || !message){
    alert('Please fill all fields.');
    return;
  }
  alert('Thanks, ' + name + '! I will reply to ' + email + ' shortly.');
  if(document.getElementById('name')) document.getElementById('name').value='';
  if(document.getElementById('email')) document.getElementById('email').value='';
  if(document.getElementById('message')) document.getElementById('message').value='';
}

// Set footer year (all pages)
document.addEventListener('DOMContentLoaded', ()=> {
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
});

// MOBILE NAV TOGGLE (append at bottom of script.js)
(function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');

  if(!toggle || !nav) return;

  toggle.addEventListener('click', function() {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    // lock body scroll when open (mobile)
    if(isOpen) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = '';
  });

  // close when clicking a link (mobile)
  nav.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    if(window.innerWidth <= 780) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
    }
  });

  // close on resize > mobile
  window.addEventListener('resize', () => {
    if(window.innerWidth > 780 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow = '';
    }
  });
})();


// script.js — robust EmailJS loader + form handler
(function () {
  const PUBLIC_KEY = "EGj3Dnu_YzM2n2epL";
  const SERVICE_ID = "service_fcu4tck";
  const TEMPLATE_ID = "template_18qdyfj";

  // load EmailJS SDK dynamically if it's not present
  function loadEmailJSSDK() {
    return new Promise((resolve, reject) => {
      if (window.emailjs) {
        return resolve(window.emailjs);
      }
      const s = document.createElement("script");
      s.src = "https://cdn.emailjs.com/sdk/3.2.0/email.min.js";
      s.async = true;
      s.onload = () => {
        if (window.emailjs) resolve(window.emailjs);
        else reject(new Error("EmailJS loaded but window.emailjs missing"));
      };
      s.onerror = () => reject(new Error("Failed to load EmailJS SDK"));
      document.head.appendChild(s);
    });
  }

  async function ensureEmailJS() {
    try {
      await loadEmailJSSDK();
      // init if not already
      if (!window.emailjs || !window.emailjs.init) {
        throw new Error("EmailJS object missing after load");
      }
      try {
        emailjs.init(PUBLIC_KEY);
        console.log("EmailJS initialized with public key.");
      } catch (e) {
        // sometimes init may already have been called in <head>, ignore
        console.warn("emailjs.init() warning:", e);
      }
      return true;
    } catch (err) {
      console.error("EmailJS availability error:", err);
      return false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("statusMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "Sending message...";
    status.style.color = "#9bbcff";

    emailjs.sendForm("service_fcu4tck", "template_18qdyfj", this)
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.style.color = "#4effa1";
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        status.textContent = "Failed to send message. Try again!";
        status.style.color = "#ff4e4e";
      });
  });
});

        });
    });
  });
})();
