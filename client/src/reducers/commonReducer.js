import {
	FETCH_LOADING,
	LOADING_DONE,
	PAGE_SIZE,
	ACTIVE_PAGE,
	PAGES_COUNT
} from '../actions/commonActions';

const getInitialState = () => {
		return {
			activePage:1,
			pageSize:10,
			pagesCount:1,
			loading:false,
			error:""
		}
}

const initialState = getInitialState();

const commonReducer = (state=initialState, action) => {
	let tempState = {}
	switch(action.type) {
		case FETCH_LOADING:
			tempState = {
				...state,
				loading:true
			}
			return tempState;
			
		case LOADING_DONE:
			tempState = {
				...state,
				loading:false
			}
			return tempState;
		
		case PAGE_SIZE:
			tempState = {
				...state,
				pageSize:action.pageSize
			}
			return tempState;
		
		case ACTIVE_PAGE:
			tempState = {
				...state,
				activePage:action.activePage
			}
			return tempState;
		
		case PAGES_COUNT:
			tempState = {
				...state,
				pagesCount:action.pagesCount
			}
			return tempState;		
	
		default:
			return state;
	}
}

export default commonReducer;