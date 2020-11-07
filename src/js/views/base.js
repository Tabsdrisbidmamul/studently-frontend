export const elements = {
  headerLoginBtn: document.querySelector('.header__login'),
  header: document.querySelector('header'),
  overview: document.querySelector('.overview'),
  card: document.querySelector('.side-nav-card'),
};

export const clearOverview = () => {
  const overview = elements.overview;
  if (overview.hasChildNodes) {
    overview.innerHTML = '';
  }
};
