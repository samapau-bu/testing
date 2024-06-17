document.addEventListener('DOMContentLoaded', () => {
  fetch("https://raw.githubusercontent.com/samapau-bu/asynchronous-web-development/main/item.json")
    .then(response => response.json())
    .then(data => {
      const fruitZone = document.getElementById('topic-zone');
      const vegetableZone = document.getElementById('preference-zone');

      data.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('draggable');
        itemElement.textContent = item.name;
        itemElement.setAttribute('draggable', true);
        itemElement.dataset.id = item.id;
        itemElement.dataset.category = item.category;

        itemElement.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', item.id);
        });

        if (item.category === 'topic') {
          fruitZone.appendChild(itemElement);
        } else if (item.category === 'preference') {
          vegetableZone.appendChild(itemElement);
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  const dropZones = document.querySelectorAll('.dropzone');

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggedElement = document.querySelector(`.draggable[data-id='${id}']`);
      const newCategory = zone.id.includes('topic') ? 'topic' : 'preference';
      draggedElement.dataset.category = newCategory;

      if ((zone.id === 'topic-zone' && draggedElement.dataset.category === 'topic') ||
        (zone.id === 'preference-zone' && draggedElement.dataset.category === 'preference')) {
        zone.appendChild(draggedElement);
      }
    });
  });
});
