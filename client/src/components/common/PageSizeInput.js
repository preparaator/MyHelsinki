import React from 'react';
import {Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getPlaces} from '../../actions/placesActions';
import {setPageSize} from '../../actions/commonActions'

class PageSizeInput extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			pageSize:this.props.pageSize
		}
	}
 
	change = (e) => {
		let state = {};
        if(parseInt(e.target.value.length) > 2 || parseInt(e.target.value.length) < 1) state[e.target.name] = this.state.pageSize;
        else if(parseInt(e.target.value) < parseInt(e.target.min)) state[e.target.name] = parseInt(e.target.min);
        else if(parseInt(e.target.value) > parseInt(e.target.max)) state[e.target.name] = parseInt(e.target.max);
		else state[e.target.name] = parseInt(e.target.value);
		this.setState(state);
	}

	changePageSize = () => {
        if(this.state.pageSize !== this.props.pageSize){
            this.props.dispatch(setPageSize(this.state.pageSize))
            this.props.dispatch(getPlaces(this.props.activePage, this.state.pageSize, this.props.activeCategory));
        }
	}

    render() {
        return(
            <div id='pageSizeInput'>
                <label htmlFor="search">Set page size:</label>
                <span></span>
                <input type="number"
					name="pageSize"
                    min="1"
                    max="50"
					onChange={this.change}
					value={this.state.pageSize}
                />
			    <Button style={{marginLeft:10}} onClick={this.changePageSize}>Set</Button>
            </div>
        )
    }
}
    const mapStateToProps = (state) => {
        return {
            activeCategory: state.places.activeCategory,
            activePage: state.common.activePage,
            pageSize: state.common.pageSize
        }
    }
    
    export default connect(mapStateToProps)(PageSizeInput);