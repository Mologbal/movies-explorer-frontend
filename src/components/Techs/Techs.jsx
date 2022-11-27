import './Techs.css';
import { Heading } from '../Heading/Heading';

export function Techs() {
  return (
    <div className="techs">
      <div className="techs__box">
        <Heading secondClass="techs__techs">Технологии</Heading>
        <h4 className="techs__all">7 технологий</h4>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__all-items">
          <div className="techs__all-item">
            HTML
          </div>
          <div className="techs__all-item">
            CSS
          </div>
          <div className="techs__all-item">
            JS
          </div>
          <div className="techs__all-item">
            React
          </div>
          <div className="techs__all-item">
            Git
          </div>
          <div className="techs__all-item">
            Express.js
          </div>
          <div className="techs__all-item">
            mongoDB
          </div>
        </div>
      </div>
    </div>
  );
};
