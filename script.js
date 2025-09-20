// --- SCRIPT POUR LES NOTIFICATIONS ---
// REMPLACER LE LIEN CI-DESSOUS PAR VOTRE PROPRE LIEN GOOGLE APPS SCRIPT
const webhookUrl = 'https://script.google.com/macros/s/AKfycbwQQHRPLHyu8WQtTpT_hjgzKmMaNysPvBTid0_Whi_dVFnItP1wYn2irUMwZ5F6lwTNxg/exec';

// Fonction pour envoyer une notification via le webhook
function sendNotification(eventTitle, userAgent, ipAddress) {
    // Si la page est en local, on n'envoie pas de notification
    if (window.location.hostname === 'localhost' || window.location.protocol === 'file:') {
        console.log(`Notification non envoyée (en mode local) : ${eventTitle}`);
        return;
    }

    // On utilise fetch pour faire une requête en arrière-plan
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

// Fonction pour obtenir l'adresse IP de l'utilisateur (méthode non fiable à 100%)
function getIP(callback) {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => callback(data.ip))
        .catch(() => callback('Inconnue'));
}

// 1. Événement pour le bouton "Afficher les coordonnées"
const showContactBtn = document.getElementById('show-contact');
if (showContactBtn) {
    showContactBtn.addEventListener('click', () => {
        getIP(ip => {
            sendNotification('Coordonnées affichées', navigator.userAgent, ip);
        });
    });
}

// 2. Événement pour le lien de téléchargement du CV
const downloadCvLink = document.getElementById('download-cv');
if (downloadCvLink) {
    downloadCvLink.addEventListener('click', () => {
        getIP(ip => {
            sendNotification('CV téléchargé', navigator.userAgent, ip);
        });
    });
}