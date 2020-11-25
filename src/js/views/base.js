export const elements = {
  headerLoginBtn: document.querySelector('.header__login'),
  header: document.querySelector('header'),
  body: document.querySelector('body'),
  overview: document.querySelector('.overview'),
  card: document.querySelector('.side-nav-card'),
  deck: document.querySelector('.side-nav-deck'),
  classroom: document.querySelector('.side-nav-classroom'),
  settings: document.querySelector('.side-nav-settings'),
};

export const clearOverview = () => {
  const overview = elements.overview;
  if (overview.hasChildNodes) {
    overview.innerHTML = '';
  }
};
