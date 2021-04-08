import React from 'react';
import {connect} from 'react-redux';



class EventsList extends React.Component {

	render() {

			return(
				<div className='container'>
					Coming soon....
				</div>					
				)
		 }
	}


const mapStateToProps = (state) => {
	return {
	}
}

export default connect(mapStateToProps)(EventsList);