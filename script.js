/**
 * Manasu Art Studio - Web Interactivity & Form Processing
 */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Scroll-Based Header Transitions ──
    const header = document.getElementById('main-header');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check immediately on load


    // ── 2. Mobile Menu Toggle ──
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        navContainer.classList.toggle('active');
    });

    // Close mobile menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
        });
    });


    // ── 3. Services Modal Data & Interactive Window ──
    const servicesData = {
        tanjore: {
            title: "Custom Thanjavur Paintings",
            price: "Pricing: From SGD 250 (Varies by size and design)",
            image: "assets/hero_art.png",
            text: "Our signature offering. We create traditional Thanjavur (Tanjore) paintings featuring Hindu deities and auspicious symbols. Handcrafted with genuine 22-carat gold foil relief work and embedded high-quality Jaipur semi-precious gemstones. Each painting is created on a seasoned wooden board using natural adhesives, framed in elegant traditional teak wood, and tailored to your space requirements. Perfect for home altars (pooja rooms), housewarming gifts, and office lobbies."
        },
        portraits: {
            title: "Custom Pencil & Charcoal Portraits",
            price: "Pricing: From SGD 120 (A4/A3 single & family portraits)",
            image: "assets/gallery/gallery_2.jpg",
            text: "Transform your favorite memories and family photos into realistic hand-drawn portraits. Our artist specializes in highly detailed pencil, charcoal, and graphite sketches. From single headshots to large family portraits and pet drawings, each sketch is drawn on acid-free archival drawing paper to prevent yellowing over time. Framed in elegant minimal frames to highlight the artwork."
        },
        canvas: {
            title: "Pre-Drawn Canvas Outlines",
            price: "Pricing: From SGD 45 (Canvas size 8\"x10\" to 16\"x20\")",
            image: "assets/gallery/gallery_5.jpg",
            text: "Designed for art enthusiasts, students, and hobbyists. We provide pre-drawn pencil and blue pen sketches on canvas panels, featuring deity outlines, intricate mandalas, and traditional motifs. These canvases are ready for you to color, paint, or add embellishments. We use high-quality cotton canvas with pre-primed gesso, making them compatible with acrylics, water-based paints, and gold foil application."
        },
        workshops: {
            title: "Tanjore Painting Workshops",
            price: "Pricing: SGD 80 per session (All materials provided)",
            image: "assets/about_studio.png",
            text: "Learn the ancient, sacred art of Thanjavur painting in our boutique studio in Singapore. We offer weekend sessions covering relief work board preparation, gemstone setting, and gold leaf foil handling. Perfect for beginners and art hobbyists. All materials—including boards, gems, paints, and genuine gold foil—are included in the package. Private group and corporate team-building bookings available."
        }
    };

    const modalOverlay = document.getElementById('service-modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalText = document.getElementById('modal-text');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCtaBtn = document.getElementById('modal-cta-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    function openModal(serviceKey) {
        const data = servicesData[serviceKey];
        if (!data) return;

        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalPrice.textContent = data.price;
        modalText.textContent = data.text;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scroll
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scroll
    }

    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Open modal on card click
            if (e.target.closest('.service-learn-more') || e.target.closest('.service-card')) {
                const serviceKey = card.getAttribute('data-service');
                openModal(serviceKey);
            }
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    modalCtaBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


    // ── 4. Form Processing & Validation ──
    const inquiryForm = document.getElementById('studio-inquiry-form');
    const formToast = document.getElementById('form-toast');
    const toastMessage = document.getElementById('toast-message');
    const requiredDateInput = document.getElementById('required-date');

    // Set minimum date in form to today
    if (requiredDateInput) {
        const today = new Date().toISOString().split('T')[0];
        requiredDateInput.min = today;
    }

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extra Validation: Check if selected date is in the future
        const selectedDate = new Date(requiredDateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        if (selectedDate < currentDate) {
            alert('Please select a valid future date for your delivery/completion.');
            return;
        }

        // Collect Form Data
        const formData = new FormData(inquiryForm);
        const submission = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            artCategory: formData.get('artCategory'),
            requiredDate: formData.get('requiredDate'),
            budgetRange: formData.get('budgetRange'),
            message: formData.get('message')
        };

        // Log submission simulation
        console.log('Inquiry form submission received:', submission);

        // Map category ID to readable text
        const categoryMap = {
            tanjore: "Thanjavur Painting",
            portrait: "Custom Sketch Portrait",
            canvas: "Pre-Drawn Canvas Outline",
            workshop: "Studio Art Workshop",
            other: "Custom Commission"
        };
        const categoryLabel = categoryMap[submission.artCategory] || "Art Project";

        // Show Success Toast
        showToast(`Thank you, ${submission.name}! Your inquiry for a ${categoryLabel} has been sent successfully.`);

        // Reset Form
        inquiryForm.reset();
    });

    function showToast(message) {
        toastMessage.textContent = message;
        formToast.classList.add('active');
        
        setTimeout(() => {
            formToast.classList.remove('active');
        }, 5000);
    }

    // ── 5. Gallery Lightbox Modal ──
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryModal = document.createElement('div');
    galleryModal.id = 'gallery-modal-overlay';
    galleryModal.className = 'modal-overlay';
    galleryModal.innerHTML = `
        <div class="gallery-modal-container">
            <button class="modal-close" id="gallery-modal-close-btn" aria-label="Close Gallery Modal">&times;</button>
            
            <button class="gallery-nav-btn prev-btn" id="gallery-prev-btn" aria-label="Previous Image">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            
            <img id="gallery-modal-img" src="" alt="Full size gallery image">
            
            <button class="gallery-nav-btn next-btn" id="gallery-next-btn" aria-label="Next Image">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            
            <div class="gallery-modal-info">
                <span id="gallery-modal-tag"></span>
                <h4 id="gallery-modal-title"></h4>
            </div>
        </div>
    `;
    document.body.appendChild(galleryModal);

    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalTag = document.getElementById('gallery-modal-tag');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const galleryModalClose = document.getElementById('gallery-modal-close-btn');
    const galleryPrevBtn = document.getElementById('gallery-prev-btn');
    const galleryNextBtn = document.getElementById('gallery-next-btn');

    let currentGalleryIndex = 0;
    const galleryItems = Array.from(galleryCards).map(card => {
        return {
            src: card.querySelector('img').src,
            alt: card.querySelector('img').alt,
            tag: card.querySelector('.gallery-tag').textContent,
            title: card.querySelector('.gallery-title').textContent
        };
    });

    function updateGalleryModal(index) {
        const item = galleryItems[index];
        if (item) {
            galleryModalImg.src = item.src;
            galleryModalImg.alt = item.alt;
            galleryModalTag.textContent = item.tag;
            galleryModalTitle.textContent = item.title;
            currentGalleryIndex = index;
        }
    }

    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateGalleryModal(index);
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeGalleryModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let prevIndex = currentGalleryIndex - 1;
        if (prevIndex < 0) prevIndex = galleryItems.length - 1;
        updateGalleryModal(prevIndex);
    });

    galleryNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let nextIndex = currentGalleryIndex + 1;
        if (nextIndex >= galleryItems.length) nextIndex = 0;
        updateGalleryModal(nextIndex);
    });

    galleryModalClose.addEventListener('click', closeGalleryModal);
    
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                let prevIndex = currentGalleryIndex - 1;
                if (prevIndex < 0) prevIndex = galleryItems.length - 1;
                updateGalleryModal(prevIndex);
            } else if (e.key === 'ArrowRight') {
                let nextIndex = currentGalleryIndex + 1;
                if (nextIndex >= galleryItems.length) nextIndex = 0;
                updateGalleryModal(nextIndex);
            }
        }
    });
});
