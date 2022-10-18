const  loadFromLocalStorage = (name) =>{
    try {
      const serialisedState = localStorage.getItem(name);
      console.log(JSON.parse(serialisedState),name)
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
}

const initialState = {
    cart:   loadFromLocalStorage('cart')===undefined?
            []:
            loadFromLocalStorage('cart'),
    activeStuff:    loadFromLocalStorage('activeStuff')===undefined?
                    {
                        currency: 0,
                        category: 0
                    }:
                    loadFromLocalStorage('activeStuff')
                               
}

export const saveToLocalStorage = (name,state) => {
    try {
      localStorage.setItem(name, JSON.stringify(state));
    } catch (e) {
      console.warn(e);
    }
}

export default initialState;