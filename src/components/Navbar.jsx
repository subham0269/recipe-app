import { Component } from "react";
import './styles/Navbar.css'

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {search: ''};
    }

    handleSearchSubmit = () => {
        console.log('child state',this.state.search);
        if (this.state.search !== '') {
            this.props.onSearchUpdate(this.state.search);
        }
    }

    handleInputChange = (e) => {
        // console.log(e.target.value);
        this.setState({search: e.target.value});
    }
    
    render () {
        return (
            <nav>
                <img src={null} alt="app-logo" loading="lazy" />
                <div>
                    <input type="text" value={this.state.search} onChange={this.handleInputChange} placeholder="Search recipe..." />
                    <button onClick={this.handleSearchSubmit}>Submit</button>
                </div>
            </nav>
        )
    }
}

// export default Navbar;