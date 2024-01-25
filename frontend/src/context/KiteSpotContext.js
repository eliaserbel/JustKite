import { createContext, useReducer } from "react";

export const KiteSpotsContext = createContext();

export const kitespotsReducer = (state, action) => {
  switch (action.type) {
    case "SET_KITESPOT":
      return {
        kitespots: action.payload,
      };
    case "CREATE_KITESPOT":
      return {
        kitespots: [action.payload, ...state.kitespots],
      };
    case "DELETE_KITESPOT":
      return {
        kitespots: state.kitespots.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const KiteSpotsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(kitespotsReducer, {
    kitespots: null,
  });

  return (
    <KiteSpotsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </KiteSpotsContext.Provider>
  );
};
