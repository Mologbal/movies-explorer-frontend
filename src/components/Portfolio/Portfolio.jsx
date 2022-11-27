import './Portfolio.css';

export function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__name">Портфолио</h4>
      <div className="portfolio__list">
        <div className="portfolio__list-project">
          {/* TODO после ревью стоит добавить точечные ссылки на мои проекты заместо просто гита */}
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Статичный сайт</a>
        </div>
        <div className="portfolio__list-project">
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Адаптивный сайт</a>
        </div>
        <div className="portfolio__list-project">
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Одностраничное приложение</a>
        </div>
      </div>
    </div>
  );
};
