class NavBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      header {
        background-color: var(--primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
      }

      .header__logo {
        color: var(--text-color);
      }

      .header__menu {
        display: flex;
      }

      .header__menu li {
        list-style: none;
        padding: 0 20px;
      }

      .header__menu li:last-child {
        padding-right: 0;
      }
    </style>
    <header>
      <div class="header__logo"><b>JUNE</b>MOVIE</div>
    </header>
    `;
  }
}

customElements.define('nav-bar', NavBar);
