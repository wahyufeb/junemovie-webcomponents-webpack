import './card-item';

class WrapperCard extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  set cardType(type) {
    this._type = type;
  }

  render() {
    this.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-card');
    wrapper.classList.add(
      this._type === 'search-results' ? 'list' : 'caraousel',
    );

    this._movies.map((movie) => {
      const cardItemComponent = document.createElement('card-item');
      cardItemComponent.item = movie;
      return wrapper.appendChild(cardItemComponent);
    });
    this.appendChild(wrapper);
  }

  renderError(message) {
    this.innerHTML = `
    <style>
      .placeholder {
        text-align: center;
        font-weight: lighter;
        color: rgba(0,0,0,0.5);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        }
    </style>`;
    this.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }
}

customElements.define('wrapper-card', WrapperCard);
