import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  const setLocalStorage = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setLocalStorage];
};
