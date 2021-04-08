import React from 'react';
import {Pagination} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {getPlaces} from '../../actions/placesActions'

class Pages extends React.Component {

    constructor(props) {
		super(props);
        this.state = {
            activePage: this.props.activePage,
            boundaryRange: 1,
            siblingRange: 1,
            showEllipsis: true,
            showFirstAndLastNav: true,
            showPreviousAndNextNav: true,
          }
	}
 
	selectPage = (event, {activePage}) => {
		this.props.dispatch(getPlaces(activePage, this.props.pageSize, this.props.activeCategory ));
	}

    render() {
        return(
            <Pagination
            activePage={this.props.activePage}
            onPageChange={this.selectPage}
            size='mini'
            totalPages={this.props.pagesCount}
            // if you want to hide one of them, just pass `null` as value
            ellipsisItem={this.state.showEllipsis ? undefined : null}
            firstItem={this.stateshowFirstAndLastNav ? undefined : null}
            lastItem={this.state.showFirstAndLastNav ? undefined : null}
            prevItem={this.state.showPreviousAndNextNav ? undefined : null}
            nextItem={this.state.showPreviousAndNextNav ? undefined : null}
          />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        activePage:state.common.activePage,
        pagesCount: state.common.pagesCount,
        pageSize: state.common.pageSize,
        activeCategory: state.places.activeCategory
    }
}

export default connect(mapStateToProps)(Pages);