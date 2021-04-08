import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from './components/common/NavBar';
import PlacesList from './components/PlacesList';
import EventsList from './components/EventsList';
import {getPlaces} from './actions/placesActions';
import './App.css';

class App extends React.Component {
	
	componentDidMount() {
		this.props.dispatch(getPlaces(this.props.page, this.props.pageSize, this.props.category));
	}
	
	render() {
		return (
			<div className="App">
				<NavBar/>
				<Switch>
					<Route exact path="/" render= {	() => (<Redirect to="/places"/>) }/>
					<Route path="/places" render= {	() => (<PlacesList />) }/>
					<Route path="/events" render= {	() => (<EventsList />) }/>
				</Switch>
			</div>
			)
		}
}

const mapStateToProps = (state) => {
	return {
		page:state.common.activePage,
		pageSize:state.common.pageSize,
		category:state.places.activeCategory

	}
}

export default connect(mapStateToProps)(App);