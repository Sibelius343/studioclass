import { useState } from "react";

const useError = () => {
  const [error, setError] = useState(null);
  const [errorTimeoutID, setTimeoutID] = useState(null);

  /*  
    Keeps track of timeout id in case multiple errors happen within one
    timeout window (5 seconds). If new error happens, we want to clear
    existing timeout and refresh the time the error is shown
  */
  const setTimedError = (value) => {
    if (errorTimeoutID) {
      clearTimeout(errorTimeoutID);
    }

    setError(value);

    const newTimeoutID = setTimeout(() => {
      setError(null);
    }, 5000);
    setTimeoutID(newTimeoutID);
  }

  return [error, setTimedError];
}

export default useError;