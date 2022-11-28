import './MoviesCardList.css';
import demoImg from '../../images/test1.svg';
import secondDemoImg from '../../images/test2.svg';
import thirdDemoImg from '../../images/test3.svg';
import fourthDemoImg from '../../images/test4.svg';
import fifthDemoImg from '../../images/test5.svg';
import lastDemoImg from '../../images/test6.svg';
import {MoviesCard} from '../MoviesCard/MoviesCard';

//Временная затычка для проверок работы верстки, в будущем доработать с api
export function MoviesCardList({
    savedMovies = false
}) {
    const cardImgs = [demoImg, secondDemoImg, thirdDemoImg, fourthDemoImg, fifthDemoImg, lastDemoImg];
    const cardsTitles = ['Баския: Взрыв реальности', 'Бег это свобода', '33 слова о дизайне', 'В погоне за Бенкси', 'Когда я думаю о Германии ночью', 'Книготорговцы']
    const demoCard = [];

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    for (let i = 0; i < 12; i++) {
        demoCard.push({
            img: cardImgs[random(0, 5)],
            time: '1ч 47м',
            nameRUS: cardsTitles[random(0, 5)],
        });
    }
    return (
        <ul className="moviesСardList">
            {
                demoCard.map((cards, index) => {
                    return <MoviesCard
                        key={index}
                        card={cards}
                        savedMovies={savedMovies}
                        isSaved={Boolean(random(0, 2))}/>;
                })
            }
        </ul>
    );
};
