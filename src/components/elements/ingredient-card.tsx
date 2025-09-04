import React from 'react';

import Image from 'next/image';
import { Button } from '@/ui/button';
import { CircleCheck } from 'lucide-react';

import type { ClassProps } from '@/types/common';
import { cn } from '@/helpers/utils';
import type { Ingredient } from '@/shared/types/ingredient.interface';

interface IngredientCardProps extends ClassProps {
  ingredient: Ingredient;
  onClick?: () => void;
  isActive?: boolean;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ className, ingredient, onClick, isActive }) => {
  return (
    <Button
      className={cn(
        'bg-background border-background relative flex min-h-[166px] min-w-[106px] cursor-pointer flex-col items-center rounded-2xl border-2 px-2.5 py-3 shadow-lg transition-[border-color,box-shadow] hover:shadow-sm',
        isActive && 'border-foreground',
        className
      )}
      noStyles
      onClick={onClick}>
      <Image src={ingredient.image} alt={ingredient.name} width={100} height={100} className="mb-1" />
      <p className="min-h-8 text-xs">{ingredient.name}</p>
      <p className="text-sm font-bold">${ingredient.price}</p>
      <CircleCheck
        size={24}
        className={cn(
          'invisible absolute top-2 right-2 opacity-0 transition-[opacity,visibility]',
          isActive && 'visible opacity-100'
        )}
      />
    </Button>
  );
};

export default IngredientCard;
