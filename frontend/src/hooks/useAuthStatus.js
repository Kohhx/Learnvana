import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false)
  }, [user]);

  return [isLoggedIn, isLoading];
};

export default useAuthStatus;
