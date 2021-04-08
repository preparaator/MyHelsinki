import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getPlaces} from '../../actions/placesActions';

class CategoryDropdown extends React.Component {
 
	searchByCategory = (e, data) => {
		this.props.dispatch(getPlaces(1, this.props.pageSize, data.value));
	}

    render() {
        let categoryOptions = this.props.categories.map((category, index) => {
            const text = Object.values(category)
            const value = Object.keys(category)

            return 	{ key: index,
                      text: text[0],
                      value: value[0], 
                    }
        })

        //sorting categories by text
        categoryOptions.sort((a,b) => {
            const first = a.text.toUpperCase();
            const second = b.text.toUpperCase();
          
            let comparison = 0;
            if (first > second) {
              comparison = 1;
            } else if (first < second) {
              comparison = -1;
            }
            return comparison;
        })

        return(
            <div>
                <label htmlFor="category">Filter By Category  </label>
                <span>  </span>
                <Dropdown
                    placeholder='Select Category'
                    compact
                    scrolling
                    labeled
                    onChange= {this.searchByCategory}
                    options = {categoryOptions}
                    defaultValue = {this.props.activeCategory}
                />
            </div>
        )
    }
}
    const mapStateToProps = (state) => {
        return {
            categories: state.places.categories,
            pageSize: state.common.pageSize,
            activeCategory: state.places.activeCategory
        }
    }
    
    export default connect(mapStateToProps)(CategoryDropdown);

