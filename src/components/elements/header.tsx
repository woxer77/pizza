import React from 'react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';

const Header: React.FC<ClassProps> = ({ className }) => {
  return <header className={cn('', className)}></header>;
};

export default Header;
