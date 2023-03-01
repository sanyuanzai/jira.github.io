import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: null | Error;
  data: D | null;
  status: "idle" | "loadding" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  status: "idle",
};
const defaultConfig = {
  throwOnError: false,
};
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        status: "error",
        error,
      }),
    [safeDispatch]
  );
  const [retry, setRetry] = useState(() => () => {});
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      safeDispatch({ status: "loadding" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.status === "idle",
    isLoadding: state.status === "loadding",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    retry,
    run,
    setData,
    setError,
    ...state,
  };
};
