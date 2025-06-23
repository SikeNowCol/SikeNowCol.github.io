let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}
OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">About Me</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `

        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send</button>
         <div id="recaptcha-container"></div>

        </form>`
    ;
    if (window.grecaptcha) {
        grecaptcha.render('recaptcha-container', {
            sitekey: '6LcaS2srAAAAAC36mBDavftn7AW8kWbU2Gs2zGKq'
        });
    } else {
        console.error('reCAPTCHA script not loaded');
    }


    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}

function RenderGalleryPage() {
    const imageUrls = [
        'images/photo1.jpg',
        'images/photo2.jpg',
        'images/photo3.jpg',
        'images/photo4.jpg',
        'images/photo5.jpg',
        'images/photo6.jpg',
        'images/photo7.jpg',
        'images/photo8.jpg',
        'images/photo9.jpg'
    ];

    const main = document.querySelector('main');
    main.innerHTML = '<h1 class="title">Gallery</h1><div class="gallery" id="gallery"></div>';
    const gallery = document.getElementById('gallery');

    // Upewnij się, że DOM jest gotowy, zanim dodasz observera
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = document.createElement('img');
                    img.src = entry.target.dataset.src;
                    img.className = 'thumb';
                    img.alt = 'thumbnail';

                    img.addEventListener('click', () => {
                        const modal = document.getElementById('modal');
                        const modalImg = document.getElementById('modalImg');
                        if (modal && modalImg) {
                            modalImg.src = img.src;
                            modal.style.display = 'flex';
                        }
                    });

                    entry.target.replaceWith(img);
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        imageUrls.forEach(url => {
            const placeholder = document.createElement('div');
            placeholder.className = 'thumb';
            placeholder.dataset.src = url;
            gallery.appendChild(placeholder);
            observer.observe(placeholder);
        });
    });
}



function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) { RenderContactPage(); }
    else if (loc === pageUrls.about) { RenderAboutPage(); }
    else if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

window.onpopstate = popStateHandler;

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});