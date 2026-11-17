document.addEventListener('DOMContentLoaded', function() {
    const hoverSound = document.getElementById('hover-sound');
    const menuItems = document.querySelectorAll('.menu-item');

    // Handle active state on menu items
    menuItems.forEach(item => {
        const img = item.querySelector('.menu-image');
        const originalSrc = img.src; // Store the original image source
        const hoverSrc = originalSrc.replace('.png', '_on.png'); // Create the hover image source

        // Click to toggle submenu active state
        item.addEventListener('click', function(event) {
            // Prevent submenu from closing when clicking on submenu options (card1)
            if (event.target.closest('.submenu')) {
                return; // Stop propagation if the click is on a submenu item
            }

            // Toggle the 'active' class on the clicked menu item
            item.classList.toggle('active');
            const submenu = item.querySelector('.submenu');
            
            // Ensure the submenu visibility follows the active state
            if (item.classList.contains('active')) {
                submenu.style.display = 'flex'; // Show the submenu
                img.src = hoverSrc; // Change the image to hover effect
            } else {
                submenu.style.display = 'none'; // Hide the submenu
                img.src = originalSrc; // Revert the image to original
            }

            // Close other submenus and revert their images to default
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherImg = otherItem.querySelector('.menu-image');
                    const otherSubmenu = otherItem.querySelector('.submenu');
                    otherItem.classList.remove('active'); // Remove active class
                    otherSubmenu.style.display = 'none'; // Hide the other submenu
                    otherImg.src = otherImg.src.replace('_on.png', '.png'); // Revert the image to default
                }
            });
        });
    });

    // Handle hover effect on submenu items (cards)
    document.querySelectorAll(".card1").forEach((card1) => {
        const cardImg = card1.querySelector('img'); // Get the image inside card1
        const originalCardSrc = cardImg.src; // Store the original image source for cards
        const hoverCardSrc = originalCardSrc.replace('.png', '_on.png'); // Create the hover image source for cards

        // Change the image on hover for submenu items
        card1.addEventListener("mouseover", () => {
            cardImg.src = hoverCardSrc;
        });

        // Revert the image back on mouse out for submenu items
        card1.addEventListener("mouseout", () => {
            cardImg.src = originalCardSrc;
        });

        // Optional: add active state to submenu card on click
        card1.addEventListener("click", () => {
            card1.classList.add("active");
        });
    });
});
// Folder that holds the skill images (plain name = default, _on = active)
const SKILL_IMG_DIR = 'userSkills/';
const skillImg = (file) => SKILL_IMG_DIR + file;
const circleContent = [
 { id: 1, icon: 'TwoSwards.png', iconActive: 'TwoSwards_on.png', title: 'Search', description: "Description 1" },
 { id: 2, icon: 'TwoSwards.png', iconActive: 'TwoSwards_on.png', title: 'Herb', description: "Description 2" },
 { id: 3, icon: 'Tracking.png', iconActive: 'Tracking_on.png', title: 'Tracking', description: "Description 3" },
 { id: 4, icon: 'Persecution.png', iconActive: 'Persecution_on.png', title: 'Persecution', description: "Description 4" },
 { id: 5, icon: 'Sward.png', iconActive: 'Sward_on.png', title: 'One-handed straight sword', description: "Description 5" },
 { id: 6, icon: 'TwoSwards.png', iconActive: 'TwoSwards_on.png', title: 'Two Swords (Unique Skill)', description: "A skill that allows you to attack with two swords at the same time\nBonus to attack speed: 1.80\nBonus to protection against weapons\nCooldown bonus" },
 { id: 7, icon: 'Throwingasword.png', iconActive: 'Throwingasword_on.png', title: 'Throwing a sword', description: "Description 7" },
 { id: 8, icon: 'Protection.png', iconActive: 'Protection_on.png', title: 'Protection', description: "Description 8" },
 { id: 9, icon: 'MilitaryRecovery.png', iconActive: 'MilitaryRecovery_on.png', title: 'Military recovery', description: "Description 9" },
 { id: 10, icon: 'TwoSwards.png', iconActive: 'Protection_on.png', title: 'Combat medicine', description: "Description 10" },
 { id: 11, icon: 'TwoSwards.png', iconActive: 'Protection_on.png', title: 'Night vision', description: "Description 11" },
 { id: 12, icon: 'TwoSwards.png', iconActive: 'Protection_on.png', title: 'Disguise', description: "Description 12" },
];

const totalCircles = 12;
const radius = 130;
const angleIncrement = (2 * Math.PI) / totalCircles;

let selectedCircleId = 1;  // default selected circle ID
let userInteracted = false;
let isPlayingSound = false;
const audio = new Audio('Assets/SAO_Menu_SFX.mp3');

const circleItemsContainer = document.querySelector('.circle-items');
const selectedTitle = document.getElementById('selected-title');
const selectedDescription = document.getElementById('selected-description');
const iconElement = document.getElementById('icon');

// Handle circle click
const handleCircleClick = (circleId) => {
    if (selectedCircleId !== circleId) {
        selectedCircleId = circleId;

        if (userInteracted && !isPlayingSound) {
            isPlayingSound = true;
            audio.play();
            setTimeout(() => {
                isPlayingSound = false;
            }, 1000);
        }

        const selectedCircle = circleContent.find(circle => circle.id === selectedCircleId);
        updateSelectedCircle(selectedCircle);
        updateCircleSelection();  // Update circle colors on click
    }
};

// Update the description and icon of the selected circle
const updateSelectedCircle = (circle) => {
selectedTitle.textContent = circle.title;
selectedDescription.innerHTML = circle.description.split('\n').join('<br />');

// Show the image of the selected skill
iconElement.src = skillImg(circle.icon);
iconElement.alt = circle.title;
};

// Update the colors of all circles
const updateCircleSelection = () => {
    const circleDivs = document.querySelectorAll('.circle-one');
    circleDivs.forEach(circleDiv => {
        const circleIcon = circleDiv.querySelector('.circle-two');
        // Remove selected class from all circles
        circleDiv.classList.remove('selected');
        // Reset the color to default
        circleIcon.querySelector('svg path').setAttribute('fill', '#6a686a');
    });

   
    const selectedCircleDiv = document.querySelector(`.circle-one:nth-child(${selectedCircleId})`);
    const selectedIcon = selectedCircleDiv.querySelector('.circle-two svg path');
    selectedCircleDiv.classList.add('selected');
    selectedIcon.setAttribute('fill', '#eba601'); 
};


circleContent.forEach((circle, index) => {
    const angle = index * angleIncrement;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const circleDiv = document.createElement('div');
    circleDiv.classList.add('circle-one');
    circleDiv.style.top = `${50 + y}px`;
    circleDiv.style.left = `${50 + x}px`;
    circleDiv.addEventListener('click', () => handleCircleClick(circle.id));
    circleDiv.addEventListener('mouseenter', () => userInteracted = true);

    const circleIcon = document.createElement('div');
    circleIcon.classList.add('circle-two');


    circleIcon.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle css-8zjzib" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>`;

    circleDiv.appendChild(circleIcon);
    circleItemsContainer.appendChild(circleDiv);
});

// Initial update for the selected circle
const initialCircle = circleContent.find(circle => circle.id === selectedCircleId);
updateSelectedCircle(initialCircle);
updateCircleSelection();  // Ensure initial circle selection is reflected visually
