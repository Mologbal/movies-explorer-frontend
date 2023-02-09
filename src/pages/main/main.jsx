import './main.css';
import React from 'react';
import { Header } from '../../components/Header/Header';
import { Promo } from '../../components/Promo/Promo';
import { AboutProject } from '../../components/AboutProject/AboutProject';
import { Techs } from '../../components/Techs/Techs';
import { AboutMe } from '../../components/AboutMe/AboutMe';
import { Footer } from '../../components/Footer/Footer';

export function Main() {
    return (
        <div className="main">
            <Header></Header>
            <main>
                <Promo></Promo>
                <AboutProject></AboutProject>
                <Techs></Techs>
                <AboutMe></AboutMe>
            </main>
            <Footer></Footer>
        </div>
    );
}
