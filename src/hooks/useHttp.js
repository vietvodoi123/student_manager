import { useState, useCallback } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const sendRequest = useCallback(async (send, transform) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const respone = await fetch(`${send.url}`, {
        method: send.method ? send.method : "GET",
        headers: send.headers ? send.headers : {},
        mode: send.mode ? send.mode : "cors",
        body: send.body ? send.body : null,
      });
      if (!respone.ok) {
        throw new Error("co loi xay ra!");
      }
      const data = await respone.json();
      transform(data);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    isError,
    sendRequest,
  };
}

export default useHttp;
