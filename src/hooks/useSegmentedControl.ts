import React from 'react';

const useSegmentedControl = () => {
  const parentElemRef = React.useRef<HTMLDivElement>(null);
  const firstElemRef = React.useRef<HTMLButtonElement>(null);
  const moveableElemRef = React.useRef<HTMLDivElement>(null);

  const moveSegment = (target: HTMLElement) => {
    if (parentElemRef.current && moveableElemRef.current && target) {
      const targetRect = target.getBoundingClientRect();
      const parentRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${targetRect.x - parentRect.x}px)`;
      moveableElemRef.current.style.width = `${targetRect.width}px`;
    }
  };

  React.useLayoutEffect(() => {
    if (moveableElemRef.current && firstElemRef.current && parentElemRef.current) {
      const firstElemRect = firstElemRef.current.getBoundingClientRect();
      const parentElemRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${firstElemRect.x - parentElemRect.x}px)`;
      moveableElemRef.current.style.width = `${firstElemRect.width}px`;
      moveableElemRef.current.style.height = `${firstElemRect.height}px`;
    }
  }, []);

  return {
    moveSegment,
    refs: {
      parent: parentElemRef,
      first: firstElemRef,
      moveable: moveableElemRef
    }
  };
};

export default useSegmentedControl;
