import { Component } from "react"
import './styles/RecipeContainer.css';
import RecipeCard from "./RecipeCard";
import { fetchRandomRecipeData, fetchFilteredRecipe, fetchSearchedRecipe } from "../utils/fetchData";
import FilterDropdown from "./FilteredDropdown";
import RecipeModal from "./RecipeModal";
import FavCard from "./FavouriteCard";
import { connect } from "react-redux";
import { addToFavAction, RemoveFromFavAction } from "../actions/actions";
import { fetchMeals } from "../actions/mealAction";


const mapStateToProps = state => {
    return {
        favList: state.favList,
        meals: state.meals
    }
}

const mapDispatchToProps = {
    fetchMeals,
    addToFavAction,
    RemoveFromFavAction
}

class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            filter: '',
            lookup: 0,
            loading: true,
        }
    }

    AddFavRecipe = (id, name, img) => {
        this.props.addToFavAction({id, name, img});
    }

    removeFavRecipe = (id) => {
        this.props.RemoveFromFavAction(id);
    }

    fetchRandomRecipe = async () => {
        try {
            this.setState({filter: '',loading: true});
            const randomRecipes = await fetchRandomRecipeData();
            this.setState({recipes: randomRecipes});
        } catch (err) {
            console.log('error fetching requests in container', err)
        } finally {
            this.setState({loading: false})
        }
    }

    loadSearchedRecipe = async (query) => {
        try {
            this.setState({loading: true});
            const res = await fetchSearchedRecipe(query);
            this.setState({recipes: res});
        } catch (err) {
            console.log('error fetching filtered list', err);
        } finally {
            this.setState({loading: false})
        }
    }

    lookupForRecipe = (id) => {
        this.setState({lookup: id});
    }

    loadNewRandomRecipes = () => {
        // this.fetchRandomRecipe();
        // console.log(this.props.meals)
        this.props.fetchMeals();
        // console.log(this.props.meals)
    }

    loadRecipeAccordingToFilter = async () => {
        try {
            this.setState({loading: true});
            // console.log('changed')
            const res = await fetchFilteredRecipe(this.state.filter);
            this.setState({recipes: res.meals}, this.updateFavFlagOnRecipies);
        } catch (err) {
            console.log('error fetching filtered list', err);
        } finally {
            this.setState({loading: false})
        }
    }

    removeRecipeId = () => {
        this.setState({lookup: 0});
    }
    
    updateFilter = (str) => {
        this.setState({filter: str});
    }

    componentDidMount() {
        // console.log('component did mount');
        // this.fetchRandomRecipe();
        this.props.fetchMeals();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchedRecipe && this.props.searchedRecipe !== prevProps.searchedRecipe) {
            console.log('changed')
            this.loadSearchedRecipe(this.props.searchedRecipe);
        }
        if (prevState.filter !== this.state.filter) this.loadRecipeAccordingToFilter();
        // if (this.props.meals.length !== 0) this.setState({loading: false});
    }

    render() {
        const { lookup, loading } = this.state;
        const { favList, meals } = this.props;
        console.log(meals)

        // console.log(this.state.filter);
        
        return (
            <div id="recipe-container">
                <div className="fav-container">
                    {favList?.map((e,i) => <FavCard key={i} removeFav={this.removeFavRecipe} {...e} />)}
                </div>
                <div id="filter-controls">
                    <FilterDropdown currFilter={this.state.filter} isLoading={loading} onFilterUpdate={this.updateFilter} />
                    <button id="load-rec-btn" onClick={this.loadNewRandomRecipes} >Load New Recipes</button>
                </div>
                    {   
                    // loading ? <div id="loading-div"><div className="spinner"></div> Loading....</div> 
                    // : 
                    meals.meals.length!== 0 ? 
                    <ul id="recipe-grid-container">
                        {meals.meals.map( recipe => 
                        <RecipeCard 
                            isFav={favList.some(a => a.id === recipe.idMeal)}
                            handleModal={this.lookupForRecipe}
                            toggleFav={this.AddFavRecipe} 
                            key={recipe.idMeal}
                            {...recipe}
                        />)}
                    </ul>
                    // recipes ? 
                    // <ul id="recipe-grid-container">
                    //     {recipes.map((recipe, index) => 
                    //     <RecipeCard 
                    //         isFav={favList.some(a => a.id === recipe.idMeal)}
                    //         handleModal={this.lookupForRecipe}
                    //         toggleFav={this.AddFavRecipe} 
                    //         key={index}
                    //         {...recipe}
                    //     />)}
                    // </ul>
                    :
                    <div id="not-found">No recipes found</div>
                    }

                <RecipeModal removeId={this.removeRecipeId} recipeId={lookup} />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer);