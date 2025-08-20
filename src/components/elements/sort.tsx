import React from 'react';

import Select from '@/ui/select';

import type { ClassProps, IOption } from '@/types/common';
import { cn } from '@/helpers/utils';

interface SortProps<T extends string> extends ClassProps {
  options: IOption<T>[];
  prefixContent?: React.ReactNode;
}

const Sort = <T extends string>({ className, options, prefixContent }: SortProps<T>) => {
  // TODO: add startAdornment to each option in select
  return (
    <div className={cn('', className)}>
      <Select<T>
        options={options}
        prefixContent={prefixContent}
        defaultOption={options[0]}
        className="flex-center gap-1 rounded-xl px-4 py-2"
        contentClassName="text-red-700"
      />
    </div>
  );
};

export default Sort;
