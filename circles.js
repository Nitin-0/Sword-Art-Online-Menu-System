const circleContent = [
    { id: 1, icon: 'TwoSwardsGray.png', iconActive: 'TwoSwards.png', title: 'Search', description: "Description 1" },
    { id: 2, icon: 'TwoSwardsGray.png', iconActive: 'TwoSwards.png', title: 'Herb', description: "Description 2" },
    { id: 3, icon: 'TrackingGray.png', iconActive: 'Tracking.png', title: 'Tracking', description: "Description 3" },
    { id: 4, icon: 'PersecutionGray.png', iconActive: 'Persecution.png', title: 'Persecution', description: "Description 4" },
    { id: 5, icon: 'SwardGray.png', iconActive: 'Sward.png', title: 'One-handed straight sword', description: "Description 5" },
    { id: 6, icon: 'TwoSwardsGray.png', iconActive: 'TwoSwards.png', title: 'Two Swords (Unique Skill)', description: "A skill that allows you to attack with two swords at the same time\nBonus to attack speed: 1.80\nBonus to protection against weapons\nCooldown bonus" },
    { id: 7, icon: 'ThrowingaswordGray.png', iconActive: 'Throwingasword.png', title: 'Throwing a sword', description: "Description 7" },
    { id: 8, icon: 'ProtectionGray.png', iconActive: 'Protection.png', title: 'Protection', description: "Description 8" },
    { id: 9, icon: 'MilitaryRecoveryGray.png', iconActive: 'MilitaryRecovery.png', title: 'Military recovery', description: "Description 9" },
    { id: 10, icon: 'TwoSwardsGray.png', iconActive: 'Protection.png', title: 'Combat medicine', description: "Description 10" },
    { id: 11, icon: 'TwoSwardsGray.png', iconActive: 'Protection.png', title: 'Night vision', description: "Description 11" },
    { id: 12, icon: 'TwoSwardsGray.png', iconActive: 'Protection.png', title: 'Disguise', description: "Description 12" },
];

const totalCircles = 12;
const radius = 135;
const angleIncrement = (2 * Math.PI) / totalCircles;

let selectedCircleId = 1;  // default selected circle ID
let userInteracted = false;
let isPlayingSound = false;
// const audio = new Audio('Assets/SAO_Menu_SFX.mp3');

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
    
    // Set the icon with the SVG (you can use a static or dynamic SVG based on the content)
    iconElement.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle css-8zjzib" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>`;
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

    // Apply selected class and color to the clicked circle
    const selectedCircleDiv = document.querySelector(`.circle-one:nth-child(${selectedCircleId})`);
    const selectedIcon = selectedCircleDiv.querySelector('.circle-two svg path');
    selectedCircleDiv.classList.add('selected');
    selectedIcon.setAttribute('fill', '#eba601');  // Highlight the icon for the selected circle
};

// Create the circles dynamically
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

    // Add the SVG icon to each circle
    circleIcon.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle css-8zjzib" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path></svg>`;

    circleDiv.appendChild(circleIcon);
    circleItemsContainer.appendChild(circleDiv);
});

// Initial update for the selected circle
const initialCircle = circleContent.find(circle => circle.id === selectedCircleId);
updateSelectedCircle(initialCircle);
updateCircleSelection();  // Ensure initial circle selection is reflected visually
