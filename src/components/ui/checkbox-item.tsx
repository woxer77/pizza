import React from 'react';

import type { ChoiceItemProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';

const CheckboxItem: React.FC<ChoiceItemProps> = ({ className, id, value, text }) => {
  return (
    <div className={cn('flex w-fit cursor-pointer items-center gap-2', className)}>
      <Checkbox id={id} value={value} className="cursor-pointer" />
      {text && (
        <label htmlFor={id} className="cursor-pointer select-none">
          {text}
        </label>
      )}
    </div>
  );
};

export default CheckboxItem;
