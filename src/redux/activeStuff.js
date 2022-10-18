import { saveToLocalStorage } from "./initialState";

const createActionName = actionName => `app/lists/${actionName}`;

const SET_CURRENCY = createActionName('SET_CURRENCY');
const SET_CATEGORY = createActionName('SET_CATEGORY');

export const setCurrency = payload => ({ type: SET_CURRENCY, payload });
export const setCategory = payload => ({ type: SET_CATEGORY, payload });

export const activeStuffReducer = (statePart = [], action) => {
    switch(action.type) {
      case SET_CURRENCY:
        const state = {
                          currency: action.payload,
                          category: statePart.category
                      }
        saveToLocalStorage('activeStuff',state)
        return state
      case SET_CATEGORY:
        return statePart = {
          currency: statePart.currency,
          category: action.payload
        }
      default:
        return statePart ;
    }
  }