import { Component } from "react";
import './styles/RecipeModal.css';
import { fetchLookupRecipe } from "../utils/fetchData";
import ModalContents from "./ModalContents";

export default class RecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            show: false,
            loading: false,
            recipeDetails: null
        }
    }   

    fetchLookup = async (id) => {
        console.log('id to fetch: ', id);
        try {
            this.setState({loading: true});
            const response = await fetchLookupRecipe(id);
            this.setState({recipeDetails: response})
        } catch (err) {
            console.log('error fetching recipe details', err);
        } finally {
            this.setState({loading: false})
        }
    }


    closeModal = () => {
        this.props.removeId();
    }

    componentDidUpdate(prevProps) {

        if (this.props.recipeId === 0 && this.state.show) {
            this.setState({
                show: false,
                id: 0,
                recipeDetails: null
            });
            document.body.style.overflow = 'auto';
            return;
        }
        
        if (prevProps.recipeId !== this.props.recipeId) {
            this.setState({
                id: this.props.recipeId,
                show: true,
                loading: false
            }, () => this.fetchLookup(this.state.id));
            document.body.style.overflow = 'hidden';
        }
    }

    render() {
        const { recipeDetails } = this.state;
        // console.log('modal render', this.state);
        return (
            <div id="modal-container" className={`${this.state.show ? 'active' : ''}`}>
                {
                    recipeDetails ? <ModalContents {...recipeDetails} closeModal={this.closeModal} />
                    :
                    <div className="loading">Loading....</div>
                }
            </div>
        )
    }
}