class CardItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      .card {
        margin-bottom: 20px;
        position: relative;
        z-index: 1;
      }

      .card {
        margin-right: 30px;
      }

      .card img {
        border-radius: 10px;
        transition: .3s ease-in-out;
        object-fit: cover;
      }

      .card:hover img {
        margin-top: -20px;
        transform: scale(1.2);
        cursor: pointer;
      }
    </style>
    <div class="card">
      <div class="card__image">
        <img
          src="${this._item.poster_path ? `https://image.tmdb.org/t/p/w185/${this._item.poster_path}` : 'https://www.bigpharmacy.com.my/scripts/timthumb.php?src=https://www.bigpharmacy.com.my//site_media/img/105245EA.jpg&w=340&zc=1'}"
          alt="${this._item.original_title}"
          width="185px"
          height="${this._item.poster_path ? '100%' : '278px'}"
        />
      </div>
    </div>
    `;
  }
}

customElements.define('card-item', CardItem);
