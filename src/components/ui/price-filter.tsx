'use client';

import React from 'react';

import { SliderRange } from '@/ui/slider-range';
import { Input } from '@/ui/input';

import type { ClassProps, PriceRange } from '@/types/common';
import { cn } from '@/helpers/utils';

const InputType = {
  MIN: 'min',
  MAX: 'max'
} as const;

type InputTypeValue = (typeof InputType)[keyof typeof InputType];

interface PriceFilterProps extends ClassProps {
  min?: number;
  max: number;
  step: number;
  onChange?: (range: PriceRange<number>) => void;
  defaultValue?: PriceRange<number>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ className, step, min = 0, max, onChange, defaultValue }) => {
  const [priceRange, setPriceRange] = React.useState<PriceRange<number>>(defaultValue || { from: min, to: max });
  const [inputValues, setInputValues] = React.useState<PriceRange<string>>(
    defaultValue
      ? {
          from: defaultValue.from.toString(),
          to: defaultValue.to.toString()
        }
      : {
          from: min.toString(),
          to: max.toString()
        }
  );
  // TODO: fix slider bug in query url
  const onSliderChange = (value: [number, number]) => {
    setPriceRange({ from: value[0], to: value[1] });
    setInputValues({ from: value[0].toString(), to: value[1].toString() });
  };

  const onInputChange = (value: string, type: InputTypeValue) => {
    if (type === InputType.MIN) {
      setInputValues({ from: value, to: inputValues.to });
    } else {
      setInputValues({ from: inputValues.from, to: value });
    }
  };

  const onInputBlur = (value: string, type: InputTypeValue) => {
    const number = parseInt(value, 10);

    if (!isFinite(number)) {
      setInputValues({ from: priceRange.from.toString(), to: priceRange.to.toString() });
      return;
    }

    switch (type) {
      case InputType.MIN:
        if (number > priceRange.to - minStepsBetweenThumbs) {
          const newMin = priceRange.to - minStepsBetweenThumbs;
          setPriceRange({ from: newMin, to: priceRange.to });
          setInputValues({ from: newMin.toString(), to: inputValues.to });
          break;
        }
        if (number < min) {
          setPriceRange({ from: min, to: priceRange.to });
          setInputValues({ from: min.toString(), to: inputValues.to });
          break;
        }
        setPriceRange({ from: number, to: priceRange.to });
        setInputValues({ from: number.toString(), to: inputValues.to });
        break;
      case InputType.MAX:
        if (number < priceRange.from + minStepsBetweenThumbs) {
          const newMax = priceRange.from + minStepsBetweenThumbs;
          setPriceRange({ from: priceRange.from, to: newMax });
          setInputValues({ from: inputValues.from, to: newMax.toString() });
          break;
        }
        if (number > max) {
          setPriceRange({ from: priceRange.from, to: max });
          setInputValues({ from: inputValues.from, to: max.toString() });
          break;
        }
        setPriceRange({ from: priceRange.from, to: number });
        setInputValues({ from: inputValues.from, to: number.toString() });
        break;
      default:
        const exhaustiveCheck: never = type;
        return exhaustiveCheck;
    }
  };

  const minStepsBetweenThumbs = max / 10;

  React.useEffect(() => {
    if (priceRange.from === min && priceRange.to === max) return;

    onChange?.(priceRange);
  }, [priceRange, min, max, onChange]);

  return (
    <div className={cn('', className)}>
      <div className="flex-space-between mb-4 flex gap-5">
        <Input
          min={min}
          max={priceRange.to - minStepsBetweenThumbs}
          value={inputValues.from}
          placeholder={String(min)}
          onChange={(e) => onInputChange(e.currentTarget.value, InputType.MIN)}
          onBlur={(e) => onInputBlur(e.currentTarget.value, InputType.MIN)}
        />
        -
        <Input
          min={priceRange.from + minStepsBetweenThumbs}
          max={max}
          value={inputValues.to}
          placeholder={String(max)}
          onChange={(e) => onInputChange(e.currentTarget.value, InputType.MAX)}
          onBlur={(e) => onInputBlur(e.currentTarget.value, InputType.MAX)}
        />
      </div>
      <SliderRange
        value={[priceRange.from, priceRange.to]}
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
