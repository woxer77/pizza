'use client';

import React from 'react';

import { SliderRange } from '@/ui/slider-range';
import { Input } from '@/ui/input';

import type { ClassProps } from '@/types/common';
import { cn } from '@/lib/utils';

const InputType = {
  MIN: 'min',
  MAX: 'max'
} as const;

type InputTypeValue = (typeof InputType)[keyof typeof InputType];

interface PriceFilterProps extends ClassProps {
  min?: number;
  max: number;
  step: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ className, step, min = 0, max }) => {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([min, max]);
  const [inputValues, setInputValues] = React.useState<[string, string]>([min.toString(), max.toString()]);

  const onSliderChange = (range: [number, number]) => {
    setPriceRange(range);
    setInputValues([range[0].toString(), range[1].toString()]);
  };

  const onInputChange = (value: string, type: InputTypeValue) => {
    if (type === InputType.MIN) {
      setInputValues([value, inputValues[1]]);
    } else {
      setInputValues([inputValues[0], value]);
    }
  };

  const onInputBlur = (value: string, type: InputTypeValue) => {
    const number = parseInt(value, 10);

    if (!isFinite(number)) {
      setInputValues([priceRange[0].toString(), priceRange[1].toString()]);
      return;
    }

    switch (type) {
      case InputType.MIN:
        if (number > priceRange[1] - minStepsBetweenThumbs) {
          const newMin = priceRange[1] - minStepsBetweenThumbs;
          setPriceRange([newMin, priceRange[1]]);
          setInputValues([newMin.toString(), inputValues[1]]);
          break;
        }
        if (number < min) {
          setPriceRange([min, priceRange[1]]);
          setInputValues([min.toString(), inputValues[1]]);
          break;
        }
        setPriceRange([number, priceRange[1]]);
        setInputValues([number.toString(), inputValues[1]]);
        break;
      case InputType.MAX:
        if (number < priceRange[0] + minStepsBetweenThumbs) {
          const newMax = priceRange[0] + minStepsBetweenThumbs;
          setPriceRange([priceRange[0], newMax]);
          setInputValues([inputValues[0], newMax.toString()]);
          break;
        }
        if (number > max) {
          setPriceRange([priceRange[0], max]);
          setInputValues([inputValues[0], max.toString()]);
          break;
        }
        setPriceRange([priceRange[0], number]);
        setInputValues([inputValues[0], number.toString()]);
        break;
      default:
        const exhaustiveCheck: never = type;
        return exhaustiveCheck;
    }
  };

  const minStepsBetweenThumbs = max / 10;

  return (
    <div className={cn('', className)}>
      <div className="flex-space-between mb-4 flex gap-5">
        <Input
          min={min}
          max={priceRange[1] - minStepsBetweenThumbs}
          value={inputValues[0]}
          placeholder="0"
          onChange={(e) => onInputChange(e.currentTarget.value, InputType.MIN)}
          onBlur={(e) => onInputBlur(e.currentTarget.value, InputType.MIN)}
        />
        -
        <Input
          min={priceRange[0] + minStepsBetweenThumbs}
          max={max}
          value={inputValues[1]}
          placeholder="100"
          onChange={(e) => onInputChange(e.currentTarget.value, InputType.MAX)}
          onBlur={(e) => onInputBlur(e.currentTarget.value, InputType.MAX)}
        />
      </div>
      <SliderRange
        value={priceRange}
        minStepsBetweenThumbs={minStepsBetweenThumbs / step}
        step={step}
        min={min}
        max={max}
        onValueChange={onSliderChange}
      />
    </div>
  );
};

export default PriceFilter;
