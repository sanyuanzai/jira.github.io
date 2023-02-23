import { useEffect, useState } from "react";

export const isFalsy = (value:unknown) => (value === 0 ? false : !value);
export const isVoid = (value:unknown) => value === '' || value === undefined ||value === null
export default function cleanObject(object:{[key:string]:unknown}) {
  const result= { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
}
export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export const useDebounce = function (value:any, delay?:number) {
  const [desboucedValue, setDesbounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDesbounceValue(value), delay);
    return ()=>clearTimeout(timeout);
  }, [value,delay]);
  return desboucedValue;
};
