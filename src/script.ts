document.addEventListener('DOMContentLoaded', () => {
    // Load photos
    const photoContainer = document.getElementById('photos');
    const photos: string[] = ['images/web.jpg', 'images/background.jpg', 'images/app.png']; // Ensure paths are correct
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo;
        // @ts-ignore
        photoContainer.appendChild(img);
    });

    // Contact form submission
    const form = document.getElementById('contact-form') as HTMLFormElement;
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const formData = new FormData(form);
        // Send form data to server using fetch or any other method
        console.log('Form submitted:', formData);
        form.reset();
    });
});
