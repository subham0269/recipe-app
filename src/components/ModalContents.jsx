import { Component } from "react";

import close from '../assets/close.svg';

export default class ModalContents extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    getIngredients = () => {
        const obj = this.props;
        // console.log('hello', obj);
        let i = 1;

        const Ingredient = `strIngredient${i}`;

        const ingredList = [];

        do {
            console.log(obj[`strIngredient${i}`]);
            ingredList.push({ ingredient: obj[`strIngredient${i}`], measure: obj[`strMeasure${i}`] });
            ++i;
        }
        while(obj[`strIngredient${i}`] !== '')

        this.setState({ingredients: ingredList})
        
        // return ingredList;
    }

    componentDidMount() {
        this.getIngredients();
    }


    render () {

        const { strMeal, strArea, strCategory, strInstructions, strMealThumb, closeModal } = this.props;

        const ingredientsList = this.state.ingredients;
        console.log(ingredientsList);

        return (
            <div id="modal">
                <img onClick={closeModal} className="close-btn" src={close} alt="close-button" />
                <img id="meal-img" src={strMealThumb} alt="img"/>
                <h2>{strMeal}</h2>
                <span>{strCategory}</span>
                <span>{strArea}</span>
                {/* <p dangerouslySetInnerHTML={{__html: strInstructions}}></p> */}
                <p>{strInstructions}</p>

                <h3>Ingredients:</h3>
                <ul>
                    {ingredientsList.map((a,i) => <li key={i}>{`${a.ingredient} (${a.measure})`}</li>)}
                </ul>
            </div>
        )
    }
}