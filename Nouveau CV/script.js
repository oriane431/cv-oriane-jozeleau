// --- SCRIPT POUR LES NOTIFICATIONS ---
const webhookUrl = 'https://script.google.com/macros/s/AKfycbwQQHRPLHyu8WQtTpT_hjgzKmMaNysPvBTid0_Whi_dVFnItP1wYn2irUMwZ5F6lwTNxg/exec';

function sendNotification(eventTitle, userAgent, ipAddress) {
    if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
        console.log(`Notification non envoyée (en mode local) : ${eventTitle}`);
        return;
    }

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event: eventTitle,
            userAgent: userAgent,
            ipAddress: ipAddress
        })
    }).then(response => {
        console.log(`Notification envoyée: ${eventTitle}`);
    }).catch(error => {
        console.error('Erreur lors de l\'envoi de la notification', error);
    });
}

function getIP(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => callback(data.ip))
        .catch(() => callback('Inconnue'));
}

// --- SCRIPT PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {

    // Événement pour le bouton "Afficher les coordonnées"
    const showContactBtn = document.getElementById('show-contact');
    if (showContactBtn) {
        showContactBtn.addEventListener('click', () => {
            getIP(ip => {
                sendNotification('Coordonnées affichées', navigator.userAgent, ip);
            });
        });
    }

    // Événement pour le lien de téléchargement du CV
    const downloadCvLink = document.getElementById('download-cv');
    if (downloadCvLink) {
        downloadCvLink.addEventListener('click', () => {
            getIP(ip => {
                sendNotification('CV téléchargé', navigator.userAgent, ip);
            });
        });
    }

    // --- SCRIPT POUR LES CLICS D'EXPÉRIENCE ---
    const experienceItems = document.querySelectorAll('.experience-card');

    experienceItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-expanded');

            const header = item.querySelector('.experience-header');
            if (header) {
                header.classList.toggle('active');
            }
        });
    });

    // --- SCRIPT POUR LES BARRES DE LANGUE (AJOUTÉ) ---
    const languageBars = document.querySelectorAll('.bar-inner');
    languageBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });

});