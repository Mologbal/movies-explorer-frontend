import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__box">
                <p className="footer__from">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__group">
                    <p className="footer__copyright-year">&copy; 2023</p>
                    <div className="footer__links">
                        <div>
                            <a href="practicum.yandex.ru" className="footer__link" target="blank">Яндекс.Практикум</a>
                        </div>
                        <div>
                            <a href="https://github.com/Mologbal" className="footer__link" target="blank">Github</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
