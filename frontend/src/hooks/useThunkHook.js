import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const useThunkHook = (thunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (...args) => {
      setIsLoading(true);
      dispatch(thunk(...args))
        .unwrap()
        .then(() => setIsSuccess(true))
        .catch((err) => {
          setError(err);
          setIsSuccess(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },

    [dispatch, thunk]
  );

  // // Console log all the state
  // console.log("Thunk Function :", runThunk);
  // console.log("isLoading :", isLoading);
  // console.log("isSuccess :", isSuccess);
  // console.log("error :", error);

  return [runThunk, isLoading, isSuccess, error];
};

// const useThunkHook = (thunk) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const dispatch = useDispatch();

//   const runThunk = useCallback(
//     async (...args) => {
//       setIsLoading(true);
//       try {
//         await dispatch(thunk(...args));
//         setIsSuccess(true);
//       } catch (error) {
//         console.log("thunk Error: ",error)
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [dispatch, thunk]
//   );

//   return [runThunk, isLoading, isSuccess, error];
// };

export default useThunkHook;
