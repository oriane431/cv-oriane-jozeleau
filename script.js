document.addEventListener('DOMContentLoaded', function() {
    // Script pour le volet déroulant des expériences
    const experienceHeaders = document.querySelectorAll('.experience-header');
    
    experienceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Script pour l'animation des barres de progression
    const languageBars = document.querySelectorAll('.bar-inner');
    languageBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
});