import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

interface SearchFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ value, onChange }) => {
    return (
        <div className="ms-1 space-y-1">
            <Input id="search" placeholder="Search ..." value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default SearchFilter;
