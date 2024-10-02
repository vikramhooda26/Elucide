import React from 'react'
import { RangeSlider } from '../../ui/RangeSlider';
import CheckBoxFilter from './CheckBoxFilter';

type TDRange = {
    range1: number[],
    range2: number[],
}

type Props = {
    onValueChange: (value: { value1: number[]; value2: number[]; operationType: string; }) => void;

    className?: string;

    subTitle?: { title1: string; title2: string; }
    min: { min1: number; min2: number; };
    max: { max1: number; max2: number; };
    minStepsBetweenThumbs: number;
    steps: { step1: number; step2: number };
    formatLabel?: (value: number) => string;
    values?: { value1: number[] | readonly number[]; value2: number[] | readonly number[]; operationType: string; };
    isSingle?: boolean;
    isEdit?: boolean;
}

function DoubleRangeFilter({
    onValueChange,

    className,
    subTitle,
    min,
    max,
    steps,
    formatLabel,
    values,
    isSingle = false,
    isEdit = false,
}: Props) {

    const handleRangeChange = ({ range1, range2 }: TDRange) => {
        onValueChange({ value1: range1, value2: range2, operationType: values?.operationType || '' });
    }

    const handleOperationChange = (operationType: string) => {
        onValueChange({ value1: values?.value1 as number[], value2: values?.value2 as number[], operationType });
    }

    return (
        <div>
            <div className='flex items-center space-x-2'>
                <CheckBoxFilter
                    value={values?.operationType || ''}
                    options={[{ label: 'Greater', value: 'gt' }, { label: 'Lesser', value: 'lt' }] || []}
                    onChange={(value) => handleOperationChange(value || '')}
                    className={'flex items-center space-x-2 mx-4 mb-4'}
                />
                <CheckBoxFilter
                    value={values?.operationType || ''}
                    options={[{ label: 'Range', value: 'in' }] || []}
                    onChange={(value) => handleOperationChange(value || '')}
                    className={'flex items-center space-x-2 mx-4 mb-4'}
                />
            </div>
            <div className='my-1'>{subTitle?.title1}</div>
            <RangeSlider
                minStepsBetweenThumbs={1}
                min={min?.min1 || 0}
                max={max?.max1 || 100}
                step={steps?.step1}
                onValueChange={(value) => handleRangeChange({ range1: value, range2: values?.value2 as number[] })}
                className="w-full"
                isSingle={true}
                value={values?.value1}
            />
            <div className='my-1'>{subTitle?.title2}</div>
            <RangeSlider
                minStepsBetweenThumbs={1}
                min={min?.min2 || 0}
                max={max?.max2 || 100}
                step={steps?.step2}
                onValueChange={(value) => handleRangeChange({ range1: values?.value1 as number[], range2: value })}
                className="w-full"
                isSingle={true}
                value={values?.value2}
            />
        </div>
    )
}

export default DoubleRangeFilter;