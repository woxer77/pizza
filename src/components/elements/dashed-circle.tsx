import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import { SIZES } from '@/constants/size.constants';
import type { SizeValues } from '@/shared/types/size.interface';

type DashedCircleVariant = 'outer' | 'inner';

interface DashedCircle extends ClassProps {
  size: number;
  variant: DashedCircleVariant;
  activeSize: SizeValues;
}

const DashedCircle: React.FC<DashedCircle> = ({ className, size, variant, activeSize }) => {
  const getVisibilityClass = (variant: DashedCircleVariant, activeSize: SizeValues) => {
    if (variant === 'outer') {
      switch (activeSize) {
        case SIZES.LARGE:
        case SIZES.EXTRA_LARGE:
          return 'invisible opacity-0';
        default:
          return 'visible opacity-100';
      }
    } else {
      switch (activeSize) {
        case SIZES.SMALL:
          return 'visible opacity-100';
        default:
          return 'invisible opacity-0';
      }
    }
  };

  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed transition-[opacity,visibility]',
        getVisibilityClass(variant, activeSize),
        className
      )}
      style={{ width: size, height: size }}
    />
  );
};

export default DashedCircle;
