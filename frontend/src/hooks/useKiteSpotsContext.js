import { KiteSpotsContext } from "../context/KiteSpotContext";
import { useContext } from "react";

export const useKiteSpotsContext = () => {
  const context = useContext(KiteSpotsContext);

  if (!context) {
    throw Error(
      "useKiteSpotssContext must be used inside an KiteSpotsContextProvider"
    );
  }

  return context;
};
