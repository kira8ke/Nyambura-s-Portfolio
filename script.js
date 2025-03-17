// Flowing-in effect on scroll
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Run once on page load

    // Project Card Flip Effect
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseover", () => {
            card.classList.add("flipped");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("flipped");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".scroll-effect");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});
