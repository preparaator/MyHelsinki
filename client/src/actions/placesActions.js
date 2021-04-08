//ACTION CONSTANTS
 import {fetchLoading, loadingDone, setPage, setPagesCount} from './commonActions'

export const GET_PLACES_SUCCESS = "GET_PLACESLIST_SUCCESS"
export const GET_PLACES_FAILED = "GET_PLACESLIST_FAILED"
export const SET_ACTIVE_CATEGORY = 	"SET_ACTIVE_CATEGORY"

export const getPlaces = (page, pageSize, category) => {
	return dispatch => {
		dispatch(setActiveCategory(category));
		let url = "/places/?page=" + page + "&pageSize=" + pageSize;
		if(category) {
			url = url + "&tag="+ category;
		}
		dispatch(fetchLoading());
		fetch(url).then((response) => {
			dispatch(loadingDone());
			if(response.ok) {
				response.json().then((data) => {
					dispatch(setPage(data.activePage));
					dispatch(setPagesCount(data.pagesCount))
					dispatch(getPlacesSuccess(data));				
				}).catch((error) => {
					dispatch(getPlacesFailed("Failed to handle JSON:"+error))
				});
			} else {
				dispatch(getPlacesFailed("Server responded with: " + response.statusText))
			}
		}).catch((error) => {
			dispatch(getPlacesFailed("Server responded with an error:"+error));
		});		
	}
}

//ACTION CREATORS

const getPlacesSuccess = (data) => {
	return {
		type:GET_PLACES_SUCCESS,
		list:data.placesOnPage,
		categories:data.tags,
	}
}

const getPlacesFailed = (error) => {
	return {
		type:GET_PLACES_FAILED,
		error:error
	}
}

const setActiveCategory = (data) => {
	return {
		type:SET_ACTIVE_CATEGORY,
		activeCategory: data
	}
}