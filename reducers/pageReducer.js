const { useReducer } = require("react");

function pageReducers(){
    const [state,dispatch] = useReducer(reducer,{amount:0, pageNumber:1, episodes:[]})
    function reducer(state, action) {
        switch (action.type) {
            case 'setPageNumberAmount':
                return { ...state, amount:action.payload };
            case 'setPageNumber':
                return { ...state, pageNumber:action.payload};
            case 'setEpisodes':
                return { ...state, episodes:action.payload}
            default:
                throw Error('Unknown action.');
        }
    }
    return [state,dispatch];
}

export default pageReducers