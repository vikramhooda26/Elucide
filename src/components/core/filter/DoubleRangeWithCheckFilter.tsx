import React, { useState } from 'react'
import { RangeSlider } from '../../ui/RangeSlider';
import CheckBoxFilter from './CheckBoxFilter';
import { FilterOption } from './FilterModal';

const rangeInitialValue = { value1: [0, 0], value2: [0, 0], operationType: 'in', checkType: 'ott', };
const singleBoundInitialValue = { value1: [0], value2: [0], operationType: 'gt', checkType: 'ott', }

type TDRange = {
    range1: number[],
    range2: number[],
}

type Props = {
    onValueChange: (value: { value1: number[]; value2: number[]; operationType: string; checkType: string }) => void;

    className?: string;

    subTitle?: { title1: string; title2?: string; title3?: string; }
    min: { min1: number; min2: number; };
    max: { max1: number; max2: number; };
    minStepsBetweenThumbs: number;
    steps: { step1: number; step2: number };
    formatLabel?: (value: number) => string;
    values?: { value1: number[] | readonly number[]; value2: number[] | readonly number[]; operationType: string; checkType: string };
    isSingle?: boolean;
    isEdit?: boolean;
}

function DoubleRangeWithCheckFilter({
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
    const [rangeValue, setRangeValue] = useState(rangeInitialValue);
    const [singleBoundValue, setSingleBoundValue] = useState(singleBoundInitialValue);

    const handleRangeChange = ({ range1, range2 }: TDRange) => {
        const sliderValue = { value1: range1, value2: range2, operationType: values?.operationType || '', checkType: values?.checkType || '' };
        onValueChange(sliderValue);

        if (values?.operationType === 'in') {
            setRangeValue(sliderValue);
        } else {
            setSingleBoundValue(sliderValue);
        }
    }

    const handleOperationChange = (operationType: string) => {
        if (!operationType) {
            return;
        }
        if (operationType === 'in') {
            onValueChange(rangeValue);
        } else {
            onValueChange({ value1: singleBoundValue?.value1 as number[], value2: singleBoundValue?.value2 as number[], operationType, checkType: values?.checkType || '' });
        }
    }

    const handleCheckTypeChange = (checkType: string) => {
        if (!checkType) {
            return;
        }
        onValueChange({ value1: values?.value1 as number[], value2: values?.value2 as number[], operationType: values?.operationType || '', checkType });
    }

    return (
        <div>
            <div className='flex items-center space-x-2'>
                <CheckBoxFilter
                    value={values?.operationType || ''}
                    options={[{ label: 'Greater', value: 'gte' }, { label: 'Lesser', value: 'lte' }] || []}
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
                isSingle={values?.operationType !== 'in'}
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
                isSingle={values?.operationType !== 'in'}
                value={values?.value2}
            />
            <div className='my-1'>{subTitle?.title3}</div>
            <CheckBoxFilter
                value={values?.checkType || ''}
                options={[{ label: 'OTT', value: 'ott' }, { label: 'Broadcast', value: 'broadcast' }] || []}
                onChange={(value) => handleCheckTypeChange(value || '')}
                className={'flex items-center space-x-2 mx-4 mb-4'}
            />
        </div>
    )
}

export default DoubleRangeWithCheckFilter;