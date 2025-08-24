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
  if (variant === 'outer') {
    return (
      <div
        className={cn(
          `absolute top-1/2 left-1/2 size-[${size}px] -translate-1/2 rounded-[50%] border-2 border-dashed transition-[opacity,visibility]`,
          (activeSize === SIZES.LARGE && 'invisible opacity-0') ||
            (activeSize === SIZES.EXTRA_LARGE && 'invisible opacity-0'),
          className
        )}
      />
    );
  } else {
    return (
      <div
        className={cn(
          `absolute top-1/2 left-1/2 size-[${size}px] -translate-1/2 rounded-[50%] border-2 border-dashed transition-[opacity,visibility]`,
          (activeSize === SIZES.MEDIUM && 'invisible opacity-0') ||
            (activeSize === SIZES.LARGE && 'invisible opacity-0') ||
            (activeSize === SIZES.EXTRA_LARGE && 'invisible opacity-0')
        )}
      />
    );
  }
};

export default DashedCircle;
