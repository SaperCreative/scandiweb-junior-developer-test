import { saveToLocalStorage } from "./initialState";

const createActionName = actionName => `app/lists/${actionName}`;

const ADD_ITEM = createActionName('ADD_ITEM');
const SET_AMMOUNT = createActionName('SET_AMMOUNT');
const SET_ATTRIBUTE = createActionName('SET_ATTRIBUTE');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');

export const addItem = payload => ({ type: ADD_ITEM, payload });
export const setAmmount = payload => ({ type: SET_AMMOUNT, payload });
export const setAttribute = payload => ({ type: SET_ATTRIBUTE, payload });
export const removeItem = payload => ({ type: REMOVE_ITEM, payload });

export const cartReducer = (statePart = [], action) => {
  let state = null
    switch(action.type) {
      case ADD_ITEM:
        state = [...statePart, {
                  id: statePart[statePart.length-1]===undefined?
                  1:
                  statePart[statePart.length-1].id+1, 
                  ammount: 1,
                  attributes: action.payload[0],
                  attributesSelected: action.payload[1],
                  name: action.payload[2],
                  company: action.payload[3],
                  price: action.payload[4],
                  img: action.payload[5]
                }];
        saveToLocalStorage('cart',state);
        return state
      case SET_AMMOUNT:
        console.log(statePart,action.payload[0],action.payload[1])
        state = statePart.map(item => (item.id === action.payload[0]) ? {
                  ...item, ammount: action.payload[1] } :
                 {...item});
        saveToLocalStorage('cart',state);
        return state
      case SET_ATTRIBUTE:
        state = statePart.map(item => (item.id === action.payload[0]) ? {
                ...item, attributesSelected: action.payload[1] } : 
                {...item});
        saveToLocalStorage('cart',state);
        return state
      case REMOVE_ITEM:
          state = statePart.filter(item => (item.id !== action.payload))
          saveToLocalStorage('cart',state);
          return state
      default:
        return statePart;
    }
  }