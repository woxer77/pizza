const useSegmentedControl = (
  parentElemRef: React.RefObject<HTMLDivElement | null>,
  moveableElemRef: React.RefObject<HTMLDivElement | null>
) => {
  const moveSegment = (target: EventTarget) => {
    if (parentElemRef.current && moveableElemRef.current) {
      const targetElem = target as HTMLDivElement;
      const targetRect = targetElem.getBoundingClientRect();
      const parentRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${targetRect.x - parentRect.x}px)`;
      moveableElemRef.current.style.width = `${targetRect.width}px`;
    }
  };

  return { moveSegment };
};

export default useSegmentedControl;
