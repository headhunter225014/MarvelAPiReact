import './singleComicLayout.scss';
import {Link} from "react-router-dom";

const SingleComicLayout = ({data}) => {

    const {title, description, pageCount, thumbnail, language, printPrice} = data

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{printPrice}</div>
            </div>
            <Link to="/comics" className="single-comic__back"></Link>
        </div>
    )
}

export default SingleComicLayout;