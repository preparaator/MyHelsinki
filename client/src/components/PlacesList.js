import React from 'react';
import {Table} from 'semantic-ui-react';
import Row from './PlacesRow';
import CategoryDropdown from './common/CategoryDropdown';
import {connect} from 'react-redux';
import Pages from './common/Pages';
import PageSizeInput from './common/PageSizeInput'
import Loading from './common/Loading'


class PlacesList extends React.Component {

	render() {
		let items = this.props.placesList.map((place,index) => {
			return <Row key={index} item={place}/>		
		})

		if(this.props.loading){
			return(
				<Loading/>
			)
		}
		if(this.props.error) {
			return(
				<div>Something went wrong when trying to get data from server :( - {this.props.error}</div>
			)
		}
		else{
			return(
				<div className='container'>
					<CategoryDropdown/>
					<PageSizeInput/>
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Address</Table.HeaderCell>
								<Table.HeaderCell>Currently</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
						{items}
						</Table.Body>
					</Table>
					<Pages/>
				</div>					
				)
		 }
	}
}

const mapStateToProps = (state) => {
	return {
		placesList:state.places.placesList,
		loading:state.common.loading,
		error:state.places.error
	}
}

export default connect(mapStateToProps)(PlacesList);