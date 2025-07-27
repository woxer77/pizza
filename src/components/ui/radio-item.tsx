import React from 'react';

import { RadioGroupItem } from '@/ui/radio-group';

import type { ChoiceItemProps } from '@/types/common';
import { cn } from '@/lib/utils';

const RadioItem: React.FC<ChoiceItemProps> = ({ className, id, value, text }) => {
  return (
    <div className={cn('flex w-fit cursor-pointer items-center gap-2', className)}>
      <RadioGroupItem value={value} id={id} className="cursor-pointer" />
      <label htmlFor={id} className="cursor-pointer select-none">
        {text}
      </label>
    </div>
  );
};

export default RadioItem;
