import React from 'react';

import type { ChoiceItemProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';

type CheckboxIdType = `checkbox-${string}`;

const CheckboxItem: React.FC<ChoiceItemProps> = ({ className, value, text, checked, onCheckedChange }) => {
  const checkboxId: CheckboxIdType = `checkbox-${value}`;

  return (
    <div className={cn('flex w-fit cursor-pointer items-center gap-2', className)}>
      <Checkbox
        id={checkboxId}
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
