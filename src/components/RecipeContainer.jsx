import { Component } from "react"
import './styles/RecipeContainer.css';
import RecipeCard from "./RecipeCard";
import { fetchRandomRecipeData, fetchFilteredRecipe, fetchSearchedRecipe } from "../utils/fetchData";
import FilterDropdown from "./FilteredDropdown";

export default class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            filter: '',
            loading: true
        }
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

    loadNewRandomRecipes = () => {
        this.fetchRandomRecipe();
    }

    loadRecipeAccordingToFilter = async () => {
        try {
            this.setState({loading: true});
            // console.log('changed')
            const res = await fetchFilteredRecipe(this.state.filter);
            this.setState({recipes: res.meals});
        } catch (err) {
            console.log('error fetching filtered list', err);
        } finally {
            this.setState({loading: false})
        }
    }
    
    updateFilter = (str) => {
        this.setState({filter: str});
    }

    componentDidMount() {
        console.log('component did mount');
        this.fetchRandomRecipe();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.searchedRecipe && this.props.searchedRecipe !== prevProps.searchedRecipe) {
            console.log('changed')
            this.loadSearchedRecipe(this.props.searchedRecipe);
        }
        if (prevState.filter !== this.state.filter) this.loadRecipeAccordingToFilter()
    }

    render() {
        const {recipes, loading} = this.state;

        return (
            <div id="recipe-container">
                <div id="filter-controls">
                    <FilterDropdown isLoading={loading} onFilterUpdate={this.updateFilter} />
                    <button id="load-rec-btn" onClick={this.loadNewRandomRecipes} disabled={loading} >Load New Recipes</button>
                    {/* <button onClick={this.loadRecipeAccordingToFilter}>Filter</button> */}
                </div>
                    {   
                    loading ? <div id="loading-div"><div className="spinner"></div> Loading....</div> 
                    : 
                    recipes ? 
                    <ul id="recipe-grid-container">
                    {recipes.map((recipe, index) => <RecipeCard key={index} name={recipe.strMeal} imgLink={recipe.strMealThumb} />)}
                    </ul>
                    :
                    <div>No recipes found</div>
                    }
            </div>
        )
    }
}