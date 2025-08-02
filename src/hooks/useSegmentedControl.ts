const useSegmentedControl = (
  parentElemRef: React.RefObject<HTMLDivElement | null>,
  moveableElemRef: React.RefObject<HTMLDivElement | null>
) => {
  const moveSegment = (target: HTMLElement) => {
    if (parentElemRef.current && moveableElemRef.current) {
      const targetRect = target.getBoundingClientRect();
      const parentRect = parentElemRef.current.getBoundingClientRect();

      moveableElemRef.current.style.transform = `translateX(${targetRect.x - parentRect.x}px)`;
      moveableElemRef.current.style.width = `${targetRect.width}px`;
    }
  };

  return { moveSegment };
};

export default useSegmentedControl;
