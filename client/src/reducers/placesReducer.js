import {
	GET_PLACES_SUCCESS,
	GET_PLACES_FAILED,
	SET_ACTIVE_CATEGORY
} from '../actions/placesActions';


const getInitialState = () => {
		return {
			placesList:[],
			categories:[],
			activeCategory:"",
			error:""
		}
}

const initialState = getInitialState();

const placesReducer = (state=initialState, action) => {
	let tempState = {}
	switch(action.type) {
		case GET_PLACES_SUCCESS:
			tempState = {
				...state,
				placesList:action.list,
				categories:action.categories,
				error:""				
			}
			return tempState;

		case GET_PLACES_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		
		case SET_ACTIVE_CATEGORY:
			tempState = {
				...state,
				activeCategory:action.activeCategory
			}
			return tempState;

		default:
			return state;
	}
}

export default placesReducer;