/*[object Object]*/
// eslint-disable-next-line header/header
import {useEffect, useState} from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleChange({target}) {
    setValue(target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
