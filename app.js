// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => {
                console.log('Service Worker registered! Scope:', reg.scope);
            })
            .catch((err) => {
                console.error('Service Worker registration failed:', err);
            });
    });
}

// 2. Handle "Add to Home Screen" (A2HS)
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

if (installBtn) installBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'block';
    console.log('PWA Install Prompt intercepted');
});

async function installPWA() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    if (installBtn) installBtn.style.display = 'none';
}

// 3. Handle Shortcuts
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('action')) {
    const action = urlParams.get('action');
    console.log('Launched via Shortcut with action:', action);
    if (action === 'create') {
        alert('Shortcut used: Create New Item');
    }
}
