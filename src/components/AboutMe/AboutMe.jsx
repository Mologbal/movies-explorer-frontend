import './AboutMe.css';
import logo from '../../images/photo.svg';
import { Portfolio } from '../Portfolio/Portfolio';
import { Heading } from '../Heading/Heading';

export function AboutMe() {
    return (
        <section className="aboutMe">
            <div className="aboutMe__content">
                <Heading secondClass="aboutMe__student">Студент</Heading>
                <div className="aboutMe__profile">
                    <div className="aboutMe__info">
                        <h4 className="aboutMe__who">Виталий</h4>
                        <p className="aboutMe__job">Фронтенд-разработчик, 30 лет</p>
                        <p className="aboutMe__story">Я родился и живу в Саратове, закончил факультет
                            экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
                            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
                            того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
                            ушёл с постоянной работы.</p>
                        {/* В будущем сюда добавить ссылку на свой пользователя или свой */}
                        <a className="aboutMe__git" target="blank" href="https://github.com">Github</a>
                    </div>
                    <div>
                        <img src={logo} alt="Фото профиля" className="aboutMe__photo"/>
                    </div>
                </div>
                <Portfolio/>
            </div>
        </section>
    );
};
