// Header
function setActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || link.getAttribute('href') === currentPath + 'index.html') {
            link.classList.add('active');
        }
    });
}
setActiveLink();



// Carasousel 
$(document).ready(function() {
    $('.carousel').carousel({
      interval: 6000
    })
});


//Menu Toggle
function toggleMenu() {
    const flyoutMenu = document.getElementById('flyoutMenu');
    flyoutMenu.classList.toggle('active'); // Toggle active class
}


//toggle tabs
function toggleTabsMenu() {
    const flyoutMenu = document.getElementById('flyoutMenuTabs');
    flyoutMenu.classList.toggle('open');
}

