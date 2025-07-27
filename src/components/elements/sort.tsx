import React from 'react';

import { ArrowDownUp } from 'lucide-react';
import Select from '@/ui/select';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';
import { productSortOptions } from '@/constants/common';

const prefixSortNode = (
  <div className="flex-center flex shrink-0 gap-1">
    <ArrowDownUp size={16} />
    <p>Sort by: </p>
  </div>
);

const Sort: React.FC<ClassProps> = ({ className }) => {
  return (
    <div className={cn('rounded-xl bg-neutral-100 p-1.5', className)}>
      <Select
        options={productSortOptions}
        prefixContent={prefixSortNode}
        className="flex-center gap-1 rounded-xl px-4 py-2"
        contentClassName="text-red-700"
      />
    </div>
  );
};

export default React.memo(Sort);
