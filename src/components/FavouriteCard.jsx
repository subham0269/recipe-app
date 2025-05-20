import { Component } from "react";
import './styles/FavouriteCard.css';

export default class FavCard extends Component {
    render() {

        const { id, name, img, removeFav } = this.props;
        
        return (
            <li className="fav-card">
                <img src={img} alt="img" loading="lazy" />
                <span>{name}</span>
                <button onClick={() => removeFav(id)}>remove</button>
            </li>
        )
    }
}