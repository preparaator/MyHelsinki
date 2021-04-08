// //ACTION CONSTANTS

export const FETCH_LOADING = "FETCH_LOADING"
export const LOADING_DONE = "LOADING_DONE"
export const PAGE_SIZE = "PAGE_SIZE"
export const ACTIVE_PAGE = "ACTIVE_PAGE"
export const PAGES_COUNT = "PAGES_COUNT"  


//ACTION CREATORS

export const fetchLoading = () => {
	return {
		type:FETCH_LOADING
	}
}

export const loadingDone = () => {
	return {
		type:LOADING_DONE
	}
}

export const setPage = (data) => {
	return {
		type:ACTIVE_PAGE,
		activePage:data
	}
}

export const setPageSize = (data) => {
	return {
		type:PAGE_SIZE,
		pageSize:data
	}
}

export const setPagesCount = (data) => {
	return {
		type:PAGES_COUNT,
		pagesCount:data
	}
}