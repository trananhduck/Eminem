document.addEventListener('DOMContentLoaded', function () {
    fetch('tracks.json')
        .then(response => response.json())
        .then(data => {
            const tracksList = document.getElementById('tracks');
            data.tracks.forEach(track => {
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
        });
});
