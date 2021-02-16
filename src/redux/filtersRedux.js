/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');

// action creators
export const changeSearchPhrase = searchPhrase => ({ payload: { searchPhrase }, type: CHANGE_PHRASE });
export const changeDuration = (type, value) => ({ payload: { [type]: value }, type: CHANGE_DURATION });
export const addTag = tag => ({ payload: { tag }, type: ADD_TAG });
export const removeTag = tag => ({ payload: { tag }, type: REMOVE_TAG });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload.searchPhrase,
      };
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          ...action.payload,
        },
      };
    case ADD_TAG:
      return {
        ...statePart,
        tags: [
          ...statePart.tags,
          action.payload.tag,
        ],
      };
    case REMOVE_TAG: {
      let newTags = statePart.tags.filter(tag => statePart.tags[statePart.tags.indexOf(tag)] !== action.payload.tag);
      return {
        ...statePart,
        tags: [...newTags],
      };
    }
    default:
      return statePart;
  }
}
