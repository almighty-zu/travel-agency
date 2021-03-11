/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// DONE - add other action types
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const CHANGE_TAG = createActionName('CHANGE_TAG');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// DONE - add other action creators
export const changeDuration = payload => ({ payload, type: CHANGE_DURATION });
export const changeTag = payload => ({ payload, type: CHANGE_TAG });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    // DONE - handle other action types
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          from: action.payload.type === 'from' && +action.payload.value <= +statePart.duration.to ? action.payload.value : statePart.duration.from,
          to: action.payload.type === 'to' && +action.payload.value >= +statePart.duration.from ? action.payload.value : statePart.duration.to,
        },
      };
    case CHANGE_TAG:
      return {
        ...statePart,
        tags: action.payload.checked ? [...statePart.tags, action.payload.tag] :
          statePart.tags.filter(tag => tag != action.payload.tag),
      };
    default:
      return statePart;
  }
}
