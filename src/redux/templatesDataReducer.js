import { TEMPLATE_LOAD } from './templatesDataAC';

const initState = {
    templatesArr: [],
    imageUrl: null,
}

function templatesDataReducer(state = initState, action) {

    switch (action.type) {
        //load
        case TEMPLATE_LOAD: {
            let newState = {templatesArr:action.data.templates, imageUrl:action.data.image};
            return newState;
        }
        default:
            return state;
    }
}

export default templatesDataReducer;
