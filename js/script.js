document.addEventListener("DOMContentLoaded", function() {

    async function loadComponent(elementId, componentPath) {
        const container = document.getElementById(elementId);
        if (container) {
            try {
                const response = await fetch(componentPath);
                if (response.ok) {
                    const htmlContent = await response.text();
                    container.innerHTML = htmlContent;
                } else {
                    container.innerHTML = "<p>Error cargando componente.</p>";
                }
            } catch (error) {
                container.innerHTML = "<p>Error de conexión.</p>";
            }
        }
    }

    loadComponent("main-header", "/components/header.html");
    loadComponent("main-footer", "/components/footer.html");
});