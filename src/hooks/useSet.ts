import React from 'react';

const useSet = <T>(initialSet: Set<T> = new Set<T>()) => {
  const [values, setValues] = React.useState<Set<T>>(initialSet);

  const toggle = React.useCallback((id: T) => {
    setValues((prev) => {
      const newValue = new Set(prev);

      if (prev.has(id)) {
        newValue.delete(id);
      } else {
        newValue.add(id);
      }

      return newValue;
    });
  }, []);

  return React.useMemo(() => ({ toggle, values }), [toggle, values]);
};

export default useSet;
