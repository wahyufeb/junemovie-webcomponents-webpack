import { popularMovie } from '../services/movies';

class PopularMovie extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    this.render();
  }

  set backpathImages(images) {
    this._backpathImages = images;
  }

  get backpathImages() {
    return this._backpathImages;
  }

  getBackpathImages() {
    if (this._backpathImages) {
      const randomNumber = Math.floor(
        Math.random() * Number(this._backpathImages.length - 1),
      );
      return this._backpathImages[randomNumber];
    }
    /* Default backdrop_path */
    return '/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg';
  }

  async render() {
    try {
      const wrapper = document.createElement('div');
      wrapper.classList.add('popular-indonesia');

      const { results } = await popularMovie();
      const wrapperCard = document.createElement('wrapper-card');
      wrapperCard.cardType = this._tipe;
      wrapperCard.movies = results;
      this.backpathImages = results.map((item) => item.backdrop_path);

      const popularLeftSide = document.createElement('div');
      popularLeftSide.classList.add('popular__leftside');

      const title = document.createElement('h3');
      title.textContent = 'Peringkat Teratas';
      const subtitle = document.createElement('h2');
      subtitle.textContent = 'Indonesia';
      popularLeftSide.appendChild(title);
      popularLeftSide.appendChild(subtitle);

      const popularRightSide = document.createElement('div');
      popularRightSide.classList.add('popular__rightside');
      popularRightSide.appendChild(wrapperCard);

      wrapper.appendChild(popularLeftSide);
      wrapper.appendChild(popularRightSide);

      this.shadowDOM.innerHTML = `
				<style>
					.popular-indonesia {
						display: flex;
						justify-content: space-around;
						align-items: center;
						padding: 30px;
						background-image: url('https://image.tmdb.org/t/p/w1280${this.getBackpathImages()}');
						background-repeat: no-repeat;
						background-position: center;
						background-size: cover;
						padding-bottom: 0;
						position: relative;
						z-index: 1;
					}

					.popular-indonesia::after {
						content: '';
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						background-color: rgba(0, 0, 0, 0.5);
						z-index: -1;
					}

					.popular__leftside {
						width: 30%;
						font-size: 32px;
						text-transform:  capitalize;
						font-weight: bold;
						color: var(--text-color);
					}

					.popular__rightside {
						width: 70%;
						overflow: auto;
					}

					.wrapper-card {
						margin-top: 20px;
					}

					.caraousel {
						overflow: auto;
						display: flex;
						padding: 50px 0;
						padding-left: 30px;
					}

					@media screen and (max-width: 780px) {
						.popular-indonesia {
							flex-direction: column;
							justify-content: flex-start;
							align-items: flex-start;
						}

						.popular__leftside, .popular__rightside {
							width: 100%;
						}
					}

					/* Scrollbar */
					::-webkit-scrollbar {
						width: 6px;
						height: 6px;
					}

					::-webkit-scrollbar-track {
						background: var(--primary-dark);
						border-radius: 10px;
					}

					::-webkit-scrollbar-thumb {
						background-color: #150638;
						border-radius: 10px;
					}
					/* End Scrollbar */
				</style>
			`;
      this.shadowDOM.append(wrapper);
    } catch (err) {
      console.error(err);
    }
  }
}

customElements.define('popular-movie', PopularMovie);
