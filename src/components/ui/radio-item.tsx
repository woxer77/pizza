import React from 'react';

import { RadioGroupItem } from '@/ui/radio-group';

import type { ChoiceItemProps } from '@/types/common';
import { cn } from '@/lib/utils';

type RadioIdType = `radio-${string}`;

const RadioItem: React.FC<ChoiceItemProps> = ({ className, value, text }) => {
  const radioId: RadioIdType = `radio-${value}`;

  return (
    <div className={cn('flex w-fit cursor-pointer items-center gap-2', className)}>
      <RadioGroupItem value={value} id={radioId} className="cursor-pointer" />
      <label htmlFor={radioId} className="cursor-pointer select-none">
        {text}
      </label>
    </div>
  );
};

export default RadioItem;
