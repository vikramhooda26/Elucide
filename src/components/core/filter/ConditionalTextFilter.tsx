import ToggleButton from '../../button/ToggleButton';
import { Input } from '../../ui/input';

export interface Option {
    value: string;
    label: string;
}

interface SearchFilterProps {
    values?: { value: string | undefined; isActive: boolean; };
    onChange: (values: { value: string | undefined; isActive: boolean; }) => void;
    placeholder?: string;
    inputPlaceholder?: string;
    emptyPlaceholder?: string;
    className?: string;
    subTitle?: { title1: string; title2?: string; title3?: string; }
}

function ConditionalTextFilter({
    inputPlaceholder,
    emptyPlaceholder,
    placeholder,
    className = "w-full",
    values,
    onChange,
    subTitle,
}: SearchFilterProps) {
    return (
        <div className="space-y-1 ms-1">
            <Input
                id={`${placeholder}...` || "search..."}
                placeholder={`${placeholder}...`  || 'search...'}
                value={values?.value}
                onChange={(e) => onChange({ value: e.target.value, isActive: values?.isActive ?? false })}
            />
            <div className='flex gap-4 items-center space-y-3 ' >
                <div className='mt-2'>{subTitle?.title1} : </div>
                <ToggleButton
                    isToggled={values?.isActive ?? false}
                    setToggle={(value) => onChange({ value: values?.value || '', isActive: value ?? false })}
                />
            </div>
        </div>
    )
}

export default ConditionalTextFilter;