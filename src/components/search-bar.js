class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    this.render();
  }

  set onSearchEvent(event) {
    this._searchEvent = event;
    this.render();
  }

  set onResetEvent(event) {
    this._resetEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchField').value;
  }

  set value(val) {
    this.shadowDOM.querySelector('#searchField').value = val;
  }

  get background() {
    return this._background;
  }

  set background(img) {
    this._background = img;
    this.render();
  }

  getRandomImg() {
    if (this._background) {
      const randomNumber = Math.floor(
        Math.random() * Number(this._background.length - 1),
      );
      return this._background[randomNumber];
    }
    /* Default backdrop_path */
    return '/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg';
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      .search {
        padding: 80px 30px;
        color: #F3F1F5;
        background: url('https://image.tmdb.org/t/p/w1280${this.getRandomImg()}');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center -50px;
        position: relative;
        z-index: 1;
        display: ${this._background ? 'block' : 'none'};
      }

      .search::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(1, 1, 80, 0.5);
        z-index: -1;
      }

      .search h1 {
        font-size: 36px;
      }

      .search h2 {
        font-size: 28px;
      }

      .search__field {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
      }

      .search__field input {
        width: 90%;
        height: 45px;
        border-radius: 10px;
        border: none;
        outline: none;
        padding: 0 10px;
      }

      .search__field .buttons {
        display: flex;
      }

      .search__field .buttons button {
        height:100%;
        padding: 5px 10px;
        border-radius: 10px;
        border: none;
        margin-left: 10px;
        background-color: #F43B86;
        color: #FFF;
      }

      .search__field .buttons button:first-child {
        background: #333;
      }

      button:hover {
        cursor: pointer;
      }
      @media screen and (max-width: 780px) {
        .search {
          background-position: center;
        }
      }
    </style>
    <div class="search">
      <h1>Welcome</h1>
      <h2>Nikmati berbagai film. Cek sekarang juga</h2>
      <div class="search__field">
        <input type="search" placeholder="Search for a movie" id="searchField" />
        <div class="buttons">
          <button id="resetMovies">Reset</button>
          <button id="searchMovies">Search</button>
        </div>
      </div>
    </div>
    `;
    this.shadowDOM
      .querySelector('#searchMovies')
      .addEventListener('click', this._searchEvent);
    this.shadowDOM
      .querySelector('#resetMovies')
      .addEventListener('click', this._resetEvent);
  }
}

customElements.define('search-bar', SearchBar);
