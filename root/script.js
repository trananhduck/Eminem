document.addEventListener('DOMContentLoaded', function () {
  const albumsList = document.getElementById('albums-list');
  const modal = document.getElementById('album-modal');
  const modalTitle = document.getElementById('modal-album-title');
  const modalDescription = document.getElementById('modal-album-description');
  const modalBanner = document.getElementById('modal-banner');
  const tracksList = document.getElementById('tracks');
  const songsList = document.getElementById('songs-list');
  const header = document.getElementById('header');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');
  const modalCloseBtn = document.querySelector('.modal-close');
  const headerHeight = header.clientHeight;

  // Function to load albums from JSON and create buttons
  function loadAlbums() {
    fetch('./albums.json')
      .then(response => response.json())
      .then(data => {
        data.albums.forEach((album) => {
          const button = document.createElement('button');
          button.classList.add('album-button');
          button.innerHTML = `
            <p class="album-name">${album.name}</p>
            <img src="${album.image}" alt="${album.name}" class="album-img">
            <p class="album-year">${album.year}</p>
          `;
          button.dataset.albumIndex = data.albums.indexOf(album); // Thêm dữ liệu index để dễ dàng truy cập
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

  // Function to close modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Load albums when DOM is ready
  loadAlbums();

  // Function to load songs from JSON and create song buttons
  function loadSongs() {
    fetch('./songs.json')
      .then(response => response.json())
      .then(data => {
        data.songs.forEach(song => {
          const button = document.createElement('button');
          button.classList.add('song-button');
          button.innerHTML = `
            <img src="${song.banner}" alt="${song.title}" class="song-img">
            <p class="song-name">${song.title}</p>
          `;
          button.dataset.songLink = song.youtubeLink; // Thêm dữ liệu link bài hát
          songsList.appendChild(button);
        });
      });
  }

  // Load songs when DOM is ready
  loadSongs();

  // Event delegation for album buttons
  albumsList.addEventListener('click', function (event) {
    const button = event.target.closest('.album-button');
    if (button) {
      const albumIndex = button.dataset.albumIndex;
      fetch('./albums.json')
        .then(response => response.json())
        .then(data => {
          const album = data.albums[albumIndex];
          showModal(album);
        });
    }
  });

  // Event delegation for song buttons
  songsList.addEventListener('click', function (event) {
    const button = event.target.closest('.song-button');
    if (button) {
      const youtubeLink = button.dataset.songLink;
      window.open(youtubeLink, '_blank');
    }
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal when clicking the close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Smooth scroll for menu links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Toggle mobile menu
  mobileMenu.addEventListener('click', function () {
    const isClosed = header.clientHeight === headerHeight;
    header.style.height = isClosed ? 'auto' : null;
  });

  // Auto-close menu when clicking a menu item
  nav.addEventListener('click', function (event) {
    if (event.target.matches('#nav li a[href*="#"]')) {
      header.style.height = null;
    }
  });
});
