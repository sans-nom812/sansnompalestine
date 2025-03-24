document.addEventListener("DOMContentLoaded", () => {
    console.log("Script chargé !");

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

    const ctx = document.getElementById('revenusChart').getContext('2d');
    
    if (!ctx) {
        console.error("Le canvas #revenusChart n'a pas été trouvé !");
        return;
    }
    
    // Revenus par année (modifiable ici)
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

    // Fonction pour mettre à jour le graphique en fonction de l'année sélectionnée
    window.updateChart = function () {
        let selectedYear = yearSelect.value;
        revenusChart.data.datasets[0].data = revenusParAnnee[selectedYear] || Array(12).fill(0);
        revenusChart.update();
    };
});
function ouvrirPub() {
    window.open("https://www.google.com/adsense/start/", "_blank");
}
