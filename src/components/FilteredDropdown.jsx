import { Component } from "react";
import { fetchAllRecipeFilters } from "../utils/fetchData";

export default class FilterDropdown extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            filterList: [],
            filter: '',
            loading: true
        }
    }

    fetchRecipeFilters = async () => {
        try {
            this.setState({loading: true});
            const res = await fetchAllRecipeFilters();
            this.setState({filterList: res});
        } catch (err) {
            console.log('error fetching recipe filters', err);
        } finally {
            this.setState({loading: false});
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({filter: e.target.value});
        this.props.onFilterUpdate(e.target.value);
    }

    componentDidMount() {
        this.fetchRecipeFilters();
    }

    render() {

        const { filter, filterList, loading } = this.state;

        return (
            <select value={filter} onChange={this.handleChange} disabled={loading}>
                <option name="" selected>All Recipies</option>
                {filterList.map((name,i) => <option key={i} value={name.strArea}>{`${name.strArea} Recipes`}</option>)}
            </select>
        )
    }
}