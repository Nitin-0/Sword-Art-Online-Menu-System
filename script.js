document.addEventListener('DOMContentLoaded', function() {
    alert("Drag Down mouse to open menu")
    console.log("Rin Tohsaka")
    var modalOpen = false;

    Array.from(document.getElementsByTagName('button')).forEach(function(button) {
        const img = button.querySelector('.button-image');
        const originalSrc = img.src; // Store original image source
        const hoverSrc = originalSrc.replace('.png', '_on.png'); // Create hover image source

        button.addEventListener('mouseenter', () => {
            img.src = hoverSrc; // Change to hover image
        });

        button.addEventListener('mouseleave', () => {
            img.src = originalSrc; // Change back to original image
        });

        button.addEventListener('click', function() {
            if (modalOpen) return;
            modalOpen = true;

            var article = document.createElement('article');
            article.id = 'sao-ui-modal';

            var header = document.createElement('header');
            var h3 = document.createElement('h3');
            h3.textContent = button.dataset.heading;
            header.appendChild(h3);
            article.appendChild(header);

            var section = document.createElement('section');
            var message = button.dataset.message ? button.dataset.message.split('\\r\\n') : ["No message available."];
            message.forEach(function(msg) {
                var p = document.createElement('p');
                p.textContent = msg;
                section.appendChild(p);
            });
            article.appendChild(section);

            var footer = document.createElement('footer');
            var accept = document.createElement('button');
            accept.id = 'sao-ui-accept';
            accept.title = 'Press here to accept.';
            accept.textContent = '';
            footer.appendChild(accept);

            var decline = document.createElement('button');
            decline.id = 'sao-ui-decline';
            decline.title = 'Press here to decline.';
            decline.textContent = 'X';
            footer.appendChild(decline);

            article.appendChild(footer);
            document.body.appendChild(article);

            function closeModal() {
                section.innerHTML = '';
                article.classList.add('sao-ui-fade-out');
                setTimeout(function() {
                    article.remove();
                    modalOpen = false;
                }, 250);
            }

            // Load the audio elements
            const acceptSound = document.getElementById("acceptSound");
            const declineSound = document.getElementById("declineSound");

            // Play accept sound and close modal
            accept.addEventListener('click', () => {
                acceptSound.play();
                closeModal();
            });

            // Play decline sound and close modal
            decline.addEventListener('click', () => {
                declineSound.play();
                closeModal();
            });
        });
    });
    var modalOpen = false;
    var navOpen = false; // Track whether 'sao-ui' is open
    var startY, endY;
    var nav = document.getElementById('sao-ui'); // Using 'sao-ui' as navigation panel
    const slideDownSound = document.getElementById("slideDownSound");

    // Swipe detection for opening and closing 'sao-ui'
    document.body.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    document.body.addEventListener('touchmove', function(e) {
        endY = e.touches[0].clientY;
    });

    document.body.addEventListener('touchend', function(e) {
        var swipeDistance = Math.abs(endY - startY);
        var swipeDirection = endY > startY ? 'down' : 'up';
        if (swipeDistance > 50) handleSwipe(swipeDirection);
    });

    document.body.addEventListener('mousedown', function(e) {
        startY = e.clientY;
    });

    document.body.addEventListener('mousemove', function(e) {
        endY = e.clientY;
    });

    document.body.addEventListener('mouseup', function(e) {
        var swipeDistance = Math.abs(endY - startY);
        var swipeDirection = endY > startY ? 'down' : 'up';
        if (swipeDistance > 50) handleSwipe(swipeDirection);
    });

    function handleSwipe(direction) {
        if (modalOpen) return; // Exit if modal is open

        if (navOpen && direction === 'up') {
            navOpen = false;
            nav.classList.remove('open'); // Close 'sao-ui'
        } else if (!navOpen && direction === 'down') {
            navOpen = true;
            nav.classList.add('open'); // Open 'sao-ui'
            slideDownSound.play(); // Play the sound effect when opening
        }
    }
});
