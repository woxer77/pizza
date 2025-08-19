import React from 'react';

import { cn } from '@/lib/utils';
import { Checkbox } from '@/ui/checkbox';
import type { ClassProps } from '@/shared/types/common';

type CheckboxIdType = `checkbox-${string}-${string}`;

interface CheckboxItemProps extends ClassProps {
  value: string;
  text: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ className, value, text, checked, onCheckedChange, name }) => {
  const checkboxId: CheckboxIdType = `checkbox-${name}-${value}`;

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
        <label htmlFor={checkboxId} className="cursor-pointer select-none">
          {text}
        </label>
      )}
    </div>
  );
};

export default React.memo(CheckboxItem);
