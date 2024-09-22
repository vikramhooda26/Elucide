import React from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';

interface SearchFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ value, onChange }) => {
    return (
        <div className="space-y-1">
            <Input
                id="search"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchFilter;
