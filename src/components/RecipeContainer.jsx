import { Component } from "react"
import './styles/RecipeContainer.css';
import RecipeCard from "./RecipeCard";
import { fetchRandomRecipeData, fetchFilteredRecipe, fetchSearchedRecipe } from "../utils/fetchData";
import FilterDropdown from "./FilteredDropdown";
import RecipeModal from "./RecipeModal";
import { addToLocalStorage, fetchFromLocalStorage, removeFromLocal } from "../utils/storage";
import FavCard from "./FavouriteCard";

export default class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            filter: '',
            lookup: 0,
            loading: true,
            favourites: [],
        }
    }
    // updateFavFlagOnRecipies = () => {
    //     const idOnFavList = this.state.favourites.map(a => a.id);
    //     const updatedList = this.state.recipes.map(a =>
    //         idOnFavList.some(ob => ob === a.idMeal) ? {...a, isFav: true} : a
    //     );

    //     console.log(updatedList);
    //     this.setState({ recipes: updatedList });
    // }

    updateFavListOnMount = (ex) => {
        this.setState({favourites: ex});
    }
    AddFavRecipe = (id, name, img) => {
        const favList = addToLocalStorage(id, name, img);
        this.setState({favourites: favList});
        // this.updateFavFlagOnRecipies();
    }

    removeFavRecipe = (id) => {
        const updateFav = removeFromLocal(id);
        this.setState({favourites: updateFav})
    }

    fetchRandomRecipe = async () => {
        try {
            // this.setState({filter: '',loading: true});
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
        this.fetchRandomRecipe();
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
        console.log('component did mount');
        this.fetchRandomRecipe();
        const existingFavList = fetchFromLocalStorage();
        this.updateFavListOnMount(existingFavList);

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchedRecipe && this.props.searchedRecipe !== prevProps.searchedRecipe) {
            console.log('changed')
            this.loadSearchedRecipe(this.props.searchedRecipe);
        }
        if (prevState.filter !== this.state.filter) this.loadRecipeAccordingToFilter();
    }

    render() {
        const {recipes, lookup, loading, favourites} = this.state;

        console.log(this.state.filter);
        
        return (
            <div id="recipe-container">
                <div className="fav-container">
                    {favourites?.map((e,i) => <FavCard key={i} removeFav={this.removeFavRecipe} {...e} />)}
                </div>
                <div id="filter-controls">
                    <FilterDropdown currFilter={this.state.filter} isLoading={loading} onFilterUpdate={this.updateFilter} />
                    <button id="load-rec-btn" onClick={this.loadNewRandomRecipes} disabled={loading} >Load New Recipes</button>
                    {/* <button onClick={this.loadRecipeAccordingToFilter}>Filter</button> */}
                </div>
                    {   
                    loading ? <div id="loading-div"><div className="spinner"></div> Loading....</div> 
                    : 
                    recipes ? 
                    <ul id="recipe-grid-container">
                        {recipes.map((recipe, index) => 
                        <RecipeCard 
                            isFav={favourites.some(a => a.id === recipe.idMeal)}
                            // id={recipe.idMeal}
                            handleModal={this.lookupForRecipe}
                            toggleFav={this.AddFavRecipe} 
                            key={index}
                            {...recipe}
                            // name={recipe.strMeal}
                            // imgLink={recipe.strMealThumb} 
                        />)}
                        {/* <hgdhgj></hgdhgj> */}
                    </ul>
                    :
                    <div id="not-found">No recipes found</div>
                    }

                <RecipeModal removeId={this.removeRecipeId} recipeId={lookup} />
            </div>
        )
    }
}