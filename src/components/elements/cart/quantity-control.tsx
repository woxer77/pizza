import React from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/helpers/utils';
import type { ClassProps } from '@/types/common';
import type { ButtonStates, QuantityControlType } from '@/shared/types/cart.interface';

interface QuantityControlProps extends ClassProps {
  onClick?: (type: QuantityControlType) => void;
  disabled?: ButtonStates;
  quantity: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ className, onClick, disabled, quantity }) => {
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
      <p className="font-bold">{quantity}</p>
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
