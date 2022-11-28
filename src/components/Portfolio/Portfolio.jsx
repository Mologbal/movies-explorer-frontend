import './Portfolio.css';

export function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__name">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-project">
          {/* TODO после ревью стоит добавить точечные ссылки на мои проекты заместо просто гита */}
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Статичный сайт <p className='portfolio__icon'>↗</p></a>
        </li>
        <li className="portfolio__list-project">
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Адаптивный сайт <p className='portfolio__icon'>↗</p></a>
        </li>
        <li className="portfolio__list-project">
          <a className='portfolio__git' href='https://github.com' target = 'blank'>Одностраничное приложение <p className='portfolio__icon'>↗</p></a>
        </li>
      </ul>
    </div>
  );
};
