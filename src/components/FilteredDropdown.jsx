import { Component } from "react";
import { fetchAllRecipeFilters } from "../utils/fetchData";

export default class FilterDropdown extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            filterList: [],
            filter: props.currFilter,
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

    shouldComponentUpdate() {
        // console.log(nextProps.currFilter, this.state.filter);
        return true;
    }

    render() {

        const { filter, filterList, loading } = this.state;

        return (
            <select value={filter} defaultValue={'all'} onChange={this.handleChange} disabled={loading}>
                <option name="all">All Recipies</option>
                {filterList.map((name,i) => <option key={i} value={name.strArea}>{`${name.strArea} Recipes`}</option>)}
            </select>
        )
    }
}