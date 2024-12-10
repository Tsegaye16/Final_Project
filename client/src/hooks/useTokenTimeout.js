import { useEffect } from "react";

const useTokenTimeout = () => {
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        localStorage.removeItem("accessToken");
        window.location.reload();
      },
      60 * 60 * 1000
    ); // 1 hour

    return () => clearTimeout(timeout);
  }, []);
};

export default useTokenTimeout;
