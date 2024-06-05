import './RangeSlider.scss';

import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  priceFilter: [number, number];
  setPriceFilter: (priceFilter: [number, number]) => void;
  setPage: (page: number) => void;
}

export function RangeSlider({ min, max, priceFilter, setPriceFilter, setPage }: RangeSliderProps): JSX.Element {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    setMinVal(priceFilter[0]);
    setMaxVal(priceFilter[1]);
    [minValRef.current, maxValRef.current] = priceFilter;
  }, [priceFilter]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        onMouseUp={(event: React.MouseEvent) => {
          if (event.target instanceof HTMLInputElement) {
            setPriceFilter([Math.min(Number(event.target.value), maxVal - 1), priceFilter[1]]);
            setPage(0);
          }
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? '5' : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        onMouseUp={(event: React.MouseEvent) => {
          if (event.target instanceof HTMLInputElement) {
            setPriceFilter([priceFilter[0], Math.max(Number(event.target.value), minVal + 1)]);
            setPage(0);
          }
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">${minVal}</div>
        <div className="slider__right-value">${maxVal}</div>
      </div>
    </div>
  );
}
