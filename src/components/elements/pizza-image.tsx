import React from 'react';

import Image from 'next/image';
import DashedCircle from './dashed-circle';

import { cn } from '@/helpers/utils';
import { SIZES } from '@/constants/size.constants';

import type { ClassProps } from '@/types/common';
import type { SizeValues } from '@/shared/types/size.interface';

interface PizzaImageProps extends ClassProps {
  src: string;
  alt: string;
  size: number;
  activeSize: SizeValues;
}

const PizzaImage: React.FC<PizzaImageProps> = ({ className, src, alt, size, activeSize }) => {
  const SCALE_CLASSES: Record<SizeValues, string> = {
    [SIZES.SMALL]: 'scale-[0.54]',
    [SIZES.MEDIUM]: 'scale-[0.7]',
    [SIZES.LARGE]: 'scale-[0.85]',
    [SIZES.EXTRA_LARGE]: 'scale-100'
  };

  return (
    <div className={cn('relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(
          `absolute top-1/2 left-1/2 mt-[1%] ml-[1%] -translate-1/2 transition-transform`,
          SCALE_CLASSES[activeSize]
        )}
      />
      <DashedCircle variant="outer" size={size * 0.78} activeSize={activeSize} />
      <DashedCircle variant="inner" size={size * 0.64} activeSize={activeSize} />
    </div>
  );
};

export default PizzaImage;
