import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';

class NavBar extends React.Component {

	render() {
			return(
				<div className='navBar'>
					<Header>MyHelsinki</Header>
					<List>
						<List.Item><Link to="/places">Show Places</Link></List.Item>
						<List.Item><Link to="/events">Show Events</Link></List.Item>
					</List>
				</div>			
			)
		}
	}

export default NavBar;