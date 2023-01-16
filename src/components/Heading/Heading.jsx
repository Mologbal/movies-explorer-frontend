import './Heading.css';

export function Heading({children, secondClass}) {
    return (<h4 className={`heading ${secondClass}`}>{children}</h4>);
};
