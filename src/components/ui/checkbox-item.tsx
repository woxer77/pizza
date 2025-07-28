import React from 'react';

import type { ChoiceItemProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';

const CheckboxItem: React.FC<ChoiceItemProps> = ({ className, value, text, checked, onCheckedChange }) => {
  return (
    <div className={cn('flex w-fit cursor-pointer items-center gap-2', className)}>
      <Checkbox
        id={`checkbox-${value}`}
        value={value}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
      {text && (
        <label htmlFor={`checkbox-${value}`} className="cursor-pointer select-none">
          {text}
        </label>
      )}
    </div>
  );
};

export default CheckboxItem;
