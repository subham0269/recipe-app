import { Component } from "react";
import './styles/RecipeCard.css'

export default class RecipeCard extends Component {
    
    constructor(props) {
        super();
        this.state = {
            name: props.strMeal,
            img: props.strMealThumb,
            // ingredients: [],
            favourite: props.isFav,
        }
        // console.log(props);
    }
    
    handleModalOpen = () => {
        // console.log(this.props.handleModal, this.props.id);
        // this.getIngredients();
        this.props.handleModal(this.props.idMeal);
    }

    toggleFav = () => {
        const {idMeal, strMeal, strMealThumb} = this.props
        this.setState({favourite: !this.state.favourite});
        this.props.toggleFav(idMeal, strMeal, strMealThumb);
    }


    render() {
        const {name, img, favourite} = this.state;

        // console.log(ingredients);
        
        return (
            <li className="recipe-card">
                <div className="img-container">
                    <img src={img} alt={`${name}-image`} loading="lazy" />
                </div>
                <div className="card-info-container">
                    <div className="card-info">
                        <h2>{name}</h2>
                        <button onClick={this.toggleFav} className="fav-btn">
                            <svg className="fav-logo" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill={`${favourite ? '#ff0062' : 'none' }`}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ff0062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <button onClick={this.handleModalOpen} className="recipe-detail-btn">Show Recipe Details</button>
                </div>
            </li>
        )
    }
}