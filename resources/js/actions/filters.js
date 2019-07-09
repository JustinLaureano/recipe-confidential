export const changeTablePage = (pageNumber, model) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        const user_id = getState().user.id;
        let url = '';

        const request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        switch (model) {
            case 'recipe':
                url = '/api/recipes/'+ user_id +'?page=' + pageNumber;
        }

		fetch(url, request)
			.then(resp => resp.json())
			.then((data) => {
                console.log(data)
                switch (model) {
                    case 'recipe':
                        dispatch({
                        	type: 'SET_RECIPES',
                        	recipes: data.recipes
                        });
                        break;
                }
			})
			.catch(err => console.log(err))
	}
};