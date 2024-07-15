document.addEventListener('DOMContentLoaded', function () {
  const albumsList = document.getElementById('albums-list');
  const modal = document.getElementById('album-modal');
  const modalTitle = document.getElementById('modal-album-title');
  const modalDescription = document.getElementById('modal-album-description');
  const modalBanner = document.getElementById('modal-banner');
  const tracksList = document.getElementById('tracks');

  // Function to load albums from JSON and create buttons
  function loadAlbums() {
    fetch('./albums.json')
      .then(response => response.json())
      .then(data => {
        data.albums.forEach((album, index) => {
          const button = document.createElement('button');
          button.classList.add('album-button');
          button.innerHTML = `
            <p class="album-name">${album.name}</p>
            <img src="${album.image}" alt="${album.name}" class="album-img">
            <p class="album-year">${album.year}</p>
          `;
          button.addEventListener('click', () => {
            showModal(album);
          });
          albumsList.appendChild(button);
        });
      });
  }

  // Function to show modal with album details
  function showModal(album) {
    modalTitle.textContent = album.name;
    modalDescription.textContent = album.description;
    modalBanner.src = album.image;

    // Clear previous tracks
    tracksList.innerHTML = '';

    // Load tracks for the selected album
    album.tracks.forEach(track => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${track.link}" class="track-label" target="_blank">
          <div class="track-left">
            <h3 class="track-title">${track.title}</h3>
            <p class="track-description">${track.description}</p>
          </div>
          <div class="track-right">
            <img src="${track.banner}" alt="Song Banner" class="track-banner" />
          </div>
        </a>
      `;
      tracksList.appendChild(li);
    });

    // Show modal and center it
    modal.style.display = 'block';
    modal.style.top = `${Math.max((window.innerHeight - modal.offsetHeight) / 2, 0)}px`;
    modal.style.left = `${Math.max((window.innerWidth - modal.offsetWidth) / 2, 0)}px`;
  }

  // Close modal when clicking outside the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  // Function to close modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Close modal when clicking the close button
  const modalCloseBtn = document.querySelector('.modal-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Load albums when DOM is ready
  loadAlbums();
});
