//light e dark mode
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const navWrapper = document.querySelector('.nav-wrapper');
    const themeIcon = document.getElementById('theme-icon');
    
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeIcon.textContent = 'brightness_6';
            navWrapper.classList.remove('blue'); // Remove a classe blue quando o tema escuro é ativado
            navWrapper.classList.add('darkblue'); // Adiciona a classe darkblue quando o tema escuro é ativado
        }
    } else {
        body.classList.add('light-mode');
    }
  });
  
  function toggleDarkMode() {
    const body = document.body;
    const navWrapper = document.querySelector('.nav-wrapper');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = 'brightness_6';
        themeIconMobile.textContent = 'brightness_6';
        navWrapper.classList.remove('blue'); // Remove a classe blue quando o modo escuro é ativado
        navWrapper.classList.add('darkblue'); // Adiciona a classe darkblue quando o modo escuro é ativado
        themeIconMobile.nextSibling.textContent = ' Modo Claro';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        themeIcon.textContent = 'brightness_2';
        themeIconMobile.textContent = 'brightness_2';
        navWrapper.classList.remove('darkblue'); // Remove a classe darkblue quando o modo claro é ativado
        navWrapper.classList.add('blue'); // Adiciona a classe blue quando o modo claro é ativado
        themeIconMobile.nextSibling.textContent = ' Modo Noturno';
        localStorage.setItem('theme', 'light-mode');
    }
  }