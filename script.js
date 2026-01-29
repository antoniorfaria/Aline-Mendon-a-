document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       Glow effect
    ============================ */
    const glowEffect = document.getElementById("glow-effect");
    if (glowEffect) {
        document.addEventListener("mousemove", (e) => {
            requestAnimationFrame(() => {
                glowEffect.style.left = e.clientX + "px";
                glowEffect.style.top = e.clientY + "px";
            });
        });
    }

    /* ============================
       Fade-in animation
    ============================ */
    const elements = document.querySelectorAll(".fade-in-up");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(el => observer.observe(el));
    } else {
        elements.forEach(el => el.classList.add("active"));
    }

    /* ============================
       Scroll suave
    ============================ */
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar nav");

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const offset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            if (navMenu && hamburger) {
                navMenu.classList.remove("open");
                hamburger.classList.remove("active");
            }
        });
    });

    /* ============================
       MENU HAMBURGUER
    ============================ */
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("open");
        });
    }

    /* ============================
       GALERIA PROJETOS 3D
    ============================ */
    const imagensProjeto = [
        "img/3D/projeto1.jpg",
        "img/3D/projeto2.jpg",
        "img/3D/projeto3.jpg"
    ];

    let indexAtual = 0;

    const imagemPrincipal = document.getElementById("projetoImagem");
    const btnPrev = document.getElementById("prevProjeto");
    const btnNext = document.getElementById("nextProjeto");
    const thumbs = document.querySelectorAll(".thumb");

    if (imagemPrincipal && btnPrev && btnNext && thumbs.length > 0) {

        function atualizarGaleria(index) {
            imagemPrincipal.src = imagensProjeto[index];

            thumbs.forEach((thumb, i) => {
                thumb.classList.remove("active");
                if (i === index) {
                    thumb.classList.add("active");
                }
            });
        }

        btnNext.addEventListener("click", () => {
            indexAtual++;
            if (indexAtual >= imagensProjeto.length) {
                indexAtual = 0;
            }
            atualizarGaleria(indexAtual);
        });

        btnPrev.addEventListener("click", () => {
            indexAtual--;
            if (indexAtual < 0) {
                indexAtual = imagensProjeto.length - 1;
            }
            atualizarGaleria(indexAtual);
        });

        thumbs.forEach((thumb, i) => {
            thumb.addEventListener("click", () => {
                indexAtual = i;
                atualizarGaleria(indexAtual);
            });
        });

        atualizarGaleria(indexAtual);
    }

    /* ============================
      CARROSSEL DE CERTIFICADOS
    ============================ */
    const certImages = document.querySelectorAll(".cert-img");
    let certIndex = 0;
    let isAnimating = false;

    if (certImages.length > 0) {

        function showCert(index) {
            if (isAnimating) return;
            isAnimating = true;

            certImages.forEach(img => {
                img.classList.remove("active");
            });

            certImages[index].classList.add("active");

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }

        window.nextCert = function () {
            certIndex++;
            if (certIndex >= certImages.length) {
                certIndex = 0;
            }
            showCert(certIndex);
        };

        window.prevCert = function () {
            certIndex--;
            if (certIndex < 0) {
                certIndex = certImages.length - 1;
            }
            showCert(certIndex);
        };

        showCert(certIndex);
    }

}); 
