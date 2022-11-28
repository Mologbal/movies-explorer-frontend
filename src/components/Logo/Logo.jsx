import './Logo.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
    return (<Link to={'/'} title="Logotype" className={`logo ${ ' '}`}/>);
};

export default Logo;
