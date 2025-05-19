import { Component } from "react";
import '../pages/styles.css';
import Navbar from "../components/Navbar";
import RecipeContainer from "../components/RecipeContainer";

export class RecipeApp extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
        }
        this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
    }

    handleSearchUpdate(searchString) {
        this.setState({search: searchString});
    }
    
    render() {
        console.log('render parent');
        console.log('parent state', this.state.search);
        return (
            <main>
                <Navbar onSearchUpdate = {this.handleSearchUpdate} />
                {/* <p>{this.state.search}</p> */}
                <RecipeContainer searchedRecipe={this.state.search} />
            </main>
        )
    }
}