import './AboutProject.css';
import {Heading} from '../Heading/Heading';

export const AboutProject = () => {
    return (
        <section className="aboutProject">
            <div className="aboutProject__box">
                <Heading secondClass="aboutProject__about-project">О проекте</Heading>
                <div className="aboutProject__info">
                    <div>
                        <h4 className="aboutProject__stages">Дипломный проект включал 5 этапов</h4>
                        <p className="aboutProject__plan">Составление плана, работу над бэкендом,
                            вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div>
                        <h4 className="aboutProject__stages">На выполнение диплома ушло 5 недель</h4>
                        <p className="aboutProject__plan">У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="aboutProject__timeline">
                    <div className="aboutProject__timeline-week">1 неделя</div>
                    <div className="aboutProject__timeline-weeks">4 недели</div>
                    <div className="aboutProject__timeline-techno">Back-end</div>
                    <div className="aboutProject__timeline-techno">Front-end</div>
                </div>
            </div>
        </section>
    );
};
