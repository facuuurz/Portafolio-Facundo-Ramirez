const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const navLinks = menu.querySelectorAll('a');

    function openMenu() {
        menu.classList.remove('hidden');
        void menu.offsetWidth; // fuerza reflujo para animación
        menu.classList.add(
            'flex', 'flex-col', 'fixed', 'top-0', 'left-0',
            'w-full', 'h-screen', 'bg-[#0D0D0D]', 'z-50',
            'opacity-100', 'translate-y-0'
        );
        menu.classList.remove('opacity-0', '-translate-y-5');
    }

    function closeMenu() {
        menu.classList.add('opacity-0', '-translate-y-5');
        menu.classList.remove('opacity-100', 'translate-y-0');

        setTimeout(() => {
            menu.classList.add('hidden');
            menu.classList.remove(
                'flex', 'flex-col', 'fixed', 'top-0', 'left-0',
                'w-full', 'h-screen', 'bg-[#0D0D0D]', 'z-50'
            );
        }, 300);
    }

    // Toggle con el botón
    menuBtn.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Ajustar visibilidad al cambiar tamaño
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // Escritorio: mostrar menú normal
            menu.classList.remove('hidden', 'flex-col', 'fixed', 'top-0', 'left-0', 'w-full', 'h-screen', 'bg-[#0D0D0D]', 'opacity-0', '-translate-y-5', 'z-50');
            menu.classList.add('flex', 'md:flex', 'opacity-100', 'translate-y-0');
        } else {
            // Móvil: ocultar menú normal
            menu.classList.add('hidden');
            menu.classList.remove('flex', 'opacity-100', 'translate-y-0');
        }
    });