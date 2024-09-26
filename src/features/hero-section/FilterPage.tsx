// MainPage.tsx
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { filterState } from '../../store/atoms/filterAtom';
import FilterModal from '../../components/core/filter/FilterModal';
import { Button } from '../../components/ui/button';

const FilterPage = () => {
    const pageKey = 'page1';
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filterValues, setFilterValues] = useRecoilState(filterState);

    const filterConfig = [
        {
            displayName: 'Search Brand',
            key: 'search',
            type: 'text',
            value: filterValues[pageKey]?.search?.value || '',
            isMandatory: true,
        },
        {
            displayName: 'Category',
            key: 'category',
            type: 'select',
            value: filterValues[pageKey]?.category?.value || '',
            options: [
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
                { label: 'Books', value: 'books' },
            ],
            isMandatory: true,
        },
        {
            displayName: 'Category',
            key: 'category',
            type: 'select',
            value: filterValues[pageKey]?.category?.value || '',
            options: [
                { label: 'Electronics', value: 'electronics' },
                { label: 'Clothing', value: 'clothing' },
                { label: 'Books', value: 'books' },
            ],
            isMultiple: true,
            isMandatory: true,
        },
        {
            displayName: 'Date Filter',
            key: 'dateAdded',
            type: 'dateRange',
            value: filterValues[pageKey]?.dateAdded?.value || { start: '', end: '' },
            range: { start: '2024-01-01', end: '2024-12-31' },
            isMandatory: true,
        },
        {
            displayName: 'Age Range',
            key: 'ageRange',
            type: 'range',
            value: filterValues[pageKey]?.price?.value || [0, 1000],
            range: { min: 0, max: 1000 },
            isMandatory: true,
        },
        {
            displayName: 'Target Gender',
            key: 'gender',
            type: 'check',
            value: filterValues[pageKey]?.gender?.value || false,
            options: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Transgender', value: 'Transgender' },
            ],
            isMandatory: true,
        },
        {
            displayName: 'NCCS',
            key: 'nccs',
            type: 'multicheck',
            value: filterValues[pageKey]?.nccs?.value || [],
            options: [
                { label: 'NCCS A', value: 'nccs_a' },
                { label: 'NCCS B', value: 'nccs_b' },
                { label: 'NCCS C', value: 'nccs_c' },
            ],
            isMandatory: true,
        },
        {
            displayName: 'Enable Feature',
            key: 'featureToggle',
            type: 'toggle',
            value: filterValues[pageKey]?.featureToggle?.value || false,
            isMandatory: true,
        },
    ];

    const handleApplyFilters = () => {
        console.log('Filters applied successfully.');
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6"> Filter Page</h1>
            <FilterModal
                isOpen={isFilterModalOpen}
                filters={filterConfig}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
                pageKey={pageKey}
            />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Applied Filters:</h2>
                <ul className="list-disc pl-5">
                    {Object.entries(filterValues[pageKey] || {}).map(([key, filter]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {JSON.stringify(filter.value)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterPage;
