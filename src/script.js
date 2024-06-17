document.addEventListener('DOMContentLoaded', function () {
    // Load photos
    const photoContainer = document.getElementById('photos');
    const photos = ['img/web.jpg','img/background.jpg', 'img/app.png', 'img/design.png']; // Ensure paths are correct
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo;
        photoContainer.appendChild(img);
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        // Send form data to server using fetch or any other method
        console.log('Form submitted:', formData);
        form.reset();
    });
});

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const category = document.getElementById('category');
    const result = document.getElementById('result');

    const showError = (element, message) => {
        const errorElement = document.getElementById(element.id + 'Error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    const hideError = (element) => {
        const errorElement = document.getElementById(element.id + 'Error');
        errorElement.style.display = 'none';
    };

    const validateFirstName = () => {
        const value = firstName.value.trim();
        if (value.length < 2 || !/^[a-zA-Z]+$/.test(value)) {
            showError(firstName, 'First Name must be at least 2 characters and only letters.');
            return false;
        }
        hideError(firstName);
        return true;
    };

    const validateLastName = () => {
        const value = lastName.value.trim();
        if (value.length < 2 || !/^[a-zA-Z]+$/.test(value)) {
            showError(lastName, 'Last Name must be at least 2 characters and only letters.');
            return false;
        }
        hideError(lastName);
        return true;
    };

    const validateEmail = () => {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            showError(email, 'Please enter a valid email address.');
            return false;
        }
        hideError(email);
        return true;
    };

    const validateCategory = () => {
        if (category.value === '') {
            showError(category, 'Please select a category.');
            return false;
        }
        hideError(category);
        return true;
    };

    const validateForm = () => {
        const validations = [
            validateFirstName,
            validateLastName,
            validateEmail,
            validateCategory
        ];
        return validations.map(validation => validation()).every(result => result === true);
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            const summary = `Thank you, ${firstName.value} ${lastName.value}, for contacting us! A member of staff will be in touch!`;
            result.textContent = summary;
            result.classList.remove('hidden');
            form.style.display = 'none';
        }
    });

    [firstName, lastName, email, category].forEach(input => {
        input.addEventListener('input', () => {
            validateForm();
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://raw.githubusercontent.com/samapau-bu/asynchronous-web-development/main/item.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.topics || !data.preferences) {
                throw new Error('Invalid JSON structure');
            }

            data.topics.forEach(topic => {
                createDraggableItem(topic, "topics");
            });
            data.preferences.forEach(preference => {
                createDraggableItem(preference, "preferences");
            });
        })
        .catch(error => console.error('Error fetching JSON: ', error));

    function createDraggableItem(item, category) {
        const container = document.getElementById(category);
        if (!container) {
            console.error(`Container with id ${category} not found`);
            return;
        }

        const draggableElement = document.createElement("div");
        draggableElement.classList.add("draggable");
        draggableElement.textContent = item.name;
        draggableElement.setAttribute("draggable", true);
        draggableElement.dataset.id = item.id;
        draggableElement.dataset.category = category;

        draggableElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", draggableElement.dataset.id);
            event.dataTransfer.setData("category", draggableElement.dataset.category);
        });

        container.appendChild(draggableElement);
    }

    const dropzones = document.querySelectorAll(".dropzone");

    dropzones.forEach(dropzone => {
        dropzone.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        dropzone.addEventListener("drop", (event) => {
            event.preventDefault();
            const id = event.dataTransfer.getData("text/plain");
            const category = event.dataTransfer.getData("category");

            if (dropzone.id !== category) {
                const draggableElement = document.querySelector(`[data-id="${id}"]`);
                if (draggableElement) {
                    dropzone.appendChild(draggableElement);
                }
            }
        });
    });
});



