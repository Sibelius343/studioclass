import { useContext } from "react";
import ErrorContext from "../contexts/ErrorContext";

const useErrorContext = () => {
  return useContext(ErrorContext);
}

export default useErrorContext;