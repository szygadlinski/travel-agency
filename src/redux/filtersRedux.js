import shortid from 'shortid';

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
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDuration = payload => ({ ...payload, type: CHANGE_DURATION });
export const addTag = payload => ({ payload: { payload, id: shortid.generate() }, type: ADD_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION: {
      /*const {type, value} = action.payload;  //taki miałem pomysł, ale się wysypuje
      if (type == 'from') {
        return {
          ...statePart,
          duration: {
            from: value,
          },
        };
      } else {
        return {
          ...statePart,
          duration: {
            to: value,
          },
        };
      }*/
      return {
        ...statePart,              //a w takim przynajmniej stan się zmienia, ale czy dobrze?
        duration: {
          from: action.payload,
          to: action.payload,
        },
      };
    }
    case ADD_TAG:
      return [statePart, action.payload];
    case REMOVE_TAG: {
      const targetTag = statePart.filter(tag => tag == action.payload)[0];
      return statePart.map(tags => tags.splice(tags.indexOf(targetTag), 1));
    }
    default:
      return statePart;
  }
}
