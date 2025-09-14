import React from 'react';

import { Button } from '@/ui/button';

import { cn } from '@/helpers/utils';
import type { ClassProps } from '@/types/common';
import type { ButtonStates, QuantityControlType } from '@/shared/types/cart.interface';

interface QuantityControlProps extends ClassProps {
  onClick?: (type: QuantityControlType) => void;
  disabled?: ButtonStates;
  quantity: number;
  loading?: boolean;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  className,
  onClick,
  disabled,
  quantity,
  loading = false
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        onClick={() => onClick?.('decrease')}
        disabled={disabled?.decrease}
        variant="outline"
        size="sm"
        className="text-xl font-bold">
        -
      </Button>
      <p className={cn('font-bold', loading && 'animate-pulse')}>{quantity}</p>
      <Button
        onClick={() => onClick?.('increase')}
        disabled={disabled?.increase}
        variant="outline"
        size="sm"
        className="text-xl font-bold">
        +
      </Button>
    </div>
  );
};

export default QuantityControl;
