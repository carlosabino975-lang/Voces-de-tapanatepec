/* ============================================
   VOCES DE TAPANATEPEC - Revista Digital
   JavaScript principal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ BARRA DE PROGRESO DE LECTURA ============
    const barraProgreso = document.getElementById('barraProgreso');
    const header = document.getElementById('header');
    const btnTop = document.getElementById('btnTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const altura = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = (scrollTop / altura) * 100;
        barraProgreso.style.width = progreso + '%';

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (scrollTop > 400) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    });

    // ============ BOTÓN VOLVER ARRIBA ============
    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ MENÚ MÓVIL ============
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('activo');
    });

    document.querySelectorAll('.nav a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            nav.classList.remove('activo');
        });
    });

    // ============ ANIMACIONES AL HACER SCROLL ============
    const elementosAnimados = document.querySelectorAll('.animar-scroll');

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const index = Array.from(elementosAnimados).indexOf(entrada.target);
                setTimeout(() => {
                    entrada.target.classList.add('visible');
                }, (index % 4) * 100);
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    elementosAnimados.forEach(el => observador.observe(el));

    // ============ PROBLEMÁTICAS: ABRIR / CERRAR DETALLES ============
    document.querySelectorAll('.prob-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const detalle = document.getElementById(targetId);
            const estaAbierto = detalle.classList.contains('abierto');

            document.querySelectorAll('.prob-detalle').forEach(d => d.classList.remove('abierto'));
            document.querySelectorAll('.prob-btn').forEach(b => {
                b.innerHTML = 'Leer hallazgos <span>→</span>';
            });

            if (!estaAbierto) {
                detalle.classList.add('abierto');
                btn.innerHTML = 'Cerrar <span>↑</span>';
                setTimeout(() => {
                    detalle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 250);
            }
        });
    });

    // ============ TABS DE CREACIONES ============
    const tabs = document.querySelectorAll('.tab');
    const contenidos = document.querySelectorAll('.tab-contenido');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const idTab = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('activo'));
            contenidos.forEach(c => c.classList.remove('activo'));

            tab.classList.add('activo');
            const contenidoActivo = document.getElementById(idTab);
            if (contenidoActivo) {
                contenidoActivo.classList.add('activo');
                contenidoActivo.querySelectorAll('.animar-scroll').forEach(el => {
                    el.classList.remove('visible');
                    setTimeout(() => el.classList.add('visible'), 50);
                });
            }
        });
    });

    // ============ SCROLL SUAVE PARA ENLACES INTERNOS ============
    document.querySelectorAll('a[href^="#"]').forEach(ancla => {
        ancla.addEventListener('click', function (e) {
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                const offsetTop = destino.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ============ EFECTO PARALLAX SUAVE EN HERO ============
    const heroFondo = document.querySelector('.hero-fondo');
    if (heroFondo) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            if (scroll < window.innerHeight) {
                heroFondo.style.transform = `translateY(${scroll * 0.3}px)`;
            }
        });
    }

    // ============ ANIMACIÓN DE CONTADORES EN HERO ============
    const datos = document.querySelectorAll('.dato strong');
    const animarContador = (el) => {
        const textoOriginal = el.textContent;
        const numero = parseInt(textoOriginal.replace(/\D/g, ''));
        if (isNaN(numero)) return;

        const prefijo = textoOriginal.match(/^[^\d]*/)[0];
        const sufijo = textoOriginal.match(/[^\d]*$/)[0];
        let actual = 0;
        const paso = Math.max(1, Math.ceil(numero / 30));

        const intervalo = setInterval(() => {
            actual += paso;
            if (actual >= numero) {
                actual = numero;
                clearInterval(intervalo);
            }
            el.textContent = prefijo + actual + sufijo;
        }, 40);
    };

    setTimeout(() => {
        datos.forEach(animarContador);
    }, 800);

    console.log('%c🌿 Voces de Tapanatepec', 'color: #1e7a5a; font-size: 20px; font-weight: bold;');
    console.log('%cRevista digital · E.S.T. N.º 13', 'color: #f2b807; font-size: 12px;');
});