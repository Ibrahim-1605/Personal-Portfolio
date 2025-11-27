const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking any link (mobile UX)
document.querySelectorAll('.nav a').forEach(link =>
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    })
);

function sendemail(){

	var email=document.getElementById("email").value;
	var name =document.getElementById("name").value;
    var subject= document.getElementById("subject").value;
	var message=document.getElementById("message").value;

	var templateParams = {
        email: email,
        name : name,
        subject : subject,
		message: message
      };

      emailjs.send('service_iakc12m', 'template_wb1paww', templateParams)
  .then(function(response) {
     console.log('SUCCESS!', response.status, response.text);
     window.alert("Sent successfully!");
     
  })

     
}

// Form Submission Handler
function validation(event) {
    event.preventDefault(); // stop form submit

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let subjectError = document.getElementById("subjectError");
    let messageError = document.getElementById("messageError");

    let isValid = true;

    // NAME VALIDATION
    if (name === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }
    else if (!/^[A-Za-z\s]+$/.test(name)) {
        nameError.textContent = "Only letters and spaces allowed.";
        isValid = false;
    }
    else if (name.length < 3 || name.length > 20) {
        nameError.textContent = "Name must be 3–20 characters.";
        isValid = false;
    }
    else {
        nameError.textContent = "";
    }

    // EMAIL VALIDATION
    if (!findValidEmail(email)) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }
    else {
        emailError.textContent = "";
    }

    // SUBJECT VALIDATION
    if (subject === "") {
        subjectError.textContent = "Please enter a subject.";
        isValid = false;
    }
    else {
        subjectError.textContent = "";
    }

    // MESSAGE VALIDATION
    if (message === "") {
        messageError.textContent = "Please enter a message.";
        isValid = false;
    }
    else {
        messageError.textContent = "";
    }

    // If all valid, allow submit
    if (isValid) {
        sendemail()
        return true;
    }

    return false;
}

// EMAIL REGEX VALIDATION
function findValidEmail(email) {
    const specialCharacter = email.indexOf('@');
    if (specialCharacter === -1) {
        return false;
    }
    let front = email.slice(0, specialCharacter);
    let back = email.slice(specialCharacter + 4);
    if (!front || !back) {
        return false;
    }
    if (back.indexOf('.') === -1) {
        return false;
    }
    const validity = /^[a-zA-Z0-9._-]+$/;
    return validity.test(front) && validity.test(back);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            closeMobileMenu();
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(47, 44, 84, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(47, 44, 84, 0.83)';
    }
});

// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const width = bar.style.width;
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = width;
            }, 100);
        }
    });
}

// Animate skill cards when they come into view
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.engSkillsItem, .lifeSkillsItem');

    skillCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// Scroll event listener for animations
window.addEventListener('scroll', function () {
    animateProgressBars();
    animateSkillCards();
});

// Initial check for animations
document.addEventListener('DOMContentLoaded', function () {
    animateProgressBars();
    animateSkillCards();
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(event.target) &&
        !menuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Update mobile menu toggle to handle body scroll
const originalToggleMobileMenu = toggleMobileMenu;
toggleMobileMenu = function () {
    const mobileMenu = document.getElementById('mobileMenu');
    const isActive = mobileMenu.classList.contains('active');

    originalToggleMobileMenu();
    toggleBodyScroll(!isActive);
};

const originalCloseMobileMenu = closeMobileMenu;
closeMobileMenu = function () {
    originalCloseMobileMenu();
    toggleBodyScroll(false);
};

