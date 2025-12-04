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
