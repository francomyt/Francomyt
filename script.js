// Función para cargar los datos del archivo JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para actualizar el contenido de la página
function updateContent(data) {
    // Actualizar sección de bienvenida
    document.getElementById('name').textContent = data.name;
    document.getElementById('profile-image').src = data.profileImage;
    document.getElementById('short-bio').textContent = data.shortBio;

    // Actualizar sección de proyectos
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">Ver proyecto</a>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });

    // Actualizar sección "Sobre mí"
    document.getElementById('long-bio').textContent = data.longBio;

    // Actualizar enlaces de redes sociales
    const socialLinksContainer = document.getElementById('social-links');
    data.socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.target = '_blank';
        socialLink.textContent = link.name;
        socialLinksContainer.appendChild(socialLink);
    });

    // Actualizar año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('message-input').value;

    if (name && email && message) {
        console.log('Formulario enviado:', { name, email, message });
        alert('Mensaje enviado con éxito!');
        event.target.reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Cargar datos y actualizar contenido cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    if (data) {
        updateContent(data);
    }

    // Agregar evento de envío al formulario
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
});
