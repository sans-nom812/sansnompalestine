document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé !");

    // Effet de fondu
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Vérifier si le canvas existe avant d'initialiser le graphique
    const canvas = document.getElementById('revenusChart');
    if (!canvas) {
        console.error("Le canvas #revenusChart n'a pas été trouvé !");
        return;
    }
    
    const ctx = canvas.getContext('2d');

    // Revenus par année
    const revenusParAnnee = {
        2025: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
        2026: [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
        2027: [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850],
        2028: [400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950]
    };

    let yearSelect = document.getElementById("year");

    let revenusChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [{
                label: 'Revenus (€)',
                data: revenusParAnnee[2025] || Array(12).fill(0),
                backgroundColor: ['#008000', '#D30000', '#1B1B1B', '#008000', '#D30000', '#1B1B1B', '#008000', '#D30000', '#1B1B1B', '#008000', '#D30000', '#1B1B1B'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Mettre à jour le graphique lorsqu'on change d'année
    window.updateChart = function () {
        let selectedYear = yearSelect.value;
        revenusChart.data.datasets[0].data = revenusParAnnee[selectedYear] || Array(12).fill(0);
        revenusChart.update();
    };

    // Détection AdBlock
    function detecterAdBlock() {
        let adTest = document.createElement("div");
        adTest.innerHTML = "&nbsp;";
        adTest.className = "adsbygoogle";  // Classe bloquée par AdBlock
        adTest.style.position = "absolute";
        adTest.style.left = "-9999px";
        document.body.appendChild(adTest);

        setTimeout(() => {
            if (adTest.offsetHeight === 0) {
                afficherMessageAdBlock();
            }
            document.body.removeChild(adTest);
        }, 100);
    }

    function afficherMessageAdBlock() {
        let overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.8)";
        overlay.style.color = "white";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.textAlign = "center";
        overlay.style.padding = "20px";
        overlay.style.zIndex = "10000";

        overlay.innerHTML = `
            <div>
                <h2>😢 AdBlock détecté !</h2>
                <p>Merci de désactiver AdBlock pour soutenir notre cause.</p>
                <button onclick="fermerMessageAdBlock()" style="padding: 10px; background: red; color: white; border: none; cursor: pointer;">
                    J'ai désactivé AdBlock
                </button>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    function fermerMessageAdBlock() {
        document.body.removeChild(document.body.lastChild);
    }

    // Afficher la publicité vidéo
    function ouvrirPub() {
        document.getElementById('videoAdContainer').style.display = 'block';
    }

    // Charger une publicité ExoClick
    function chargerPubExoClick() {
        let pubExoclick = document.createElement('script');
        pubExoclick.src = "https://s.magsrv.com/v1/vast.php?idzone=5569642";
        document.body.appendChild(pubExoclick);
    }

    // Afficher le footer uniquement en bas de page
    window.onscroll = function() {
        let footer = document.getElementById("footer");
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            footer.style.display = "block";
        } else {
            footer.style.display = "none";
        }
    };

    // Lancer la détection AdBlock après le chargement complet
    setTimeout(detecterAdBlock, 500);
});
function ouvrirPub() {
    let adContainer = document.getElementById("videoAdContainer");
    if (adContainer.classList.contains("show")) {
        adContainer.classList.remove("show");
        setTimeout(() => adContainer.classList.add("hidden"), 400); // Attends l'animation avant de cacher
    } else {
        adContainer.classList.remove("hidden");
        setTimeout(() => adContainer.classList.add("show"), 10); // Délai pour lancer l'animation
    }
}
// Détecter si les actualités sont visibles pour déclencher l'animation
document.addEventListener("DOMContentLoaded", () => {
    const newsItems = document.querySelectorAll(".news-item");

    function checkVisibility() {
        newsItems.forEach((item) => {
            if (item.getBoundingClientRect().top < window.innerHeight - 50) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});

