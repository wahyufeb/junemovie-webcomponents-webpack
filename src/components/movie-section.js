class MovieSection extends HTMLElement {
  set title(title) {
    this._title = title;
  }

  set tipe(tipe) {
    this._tipe = tipe;
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.classList.add(this._tipe);
    const title = document.createElement('h2');
    title.textContent = this._title;
    title.style.marginTop = '30px';

    const wrapperCard = document.createElement('wrapper-card');
    wrapperCard.cardType = this._tipe;
    wrapperCard.movies = this._movies;

    this.appendChild(title);
    this.appendChild(wrapperCard);
  }
}

customElements.define('movie-section', MovieSection);
