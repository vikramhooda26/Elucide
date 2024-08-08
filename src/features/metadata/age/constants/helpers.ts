export const getConvertedAgeRange = (ageRange: number[]) => {
    if (ageRange.length !== 2) {
        return null;
    }

    if (ageRange[0] > ageRange[1]) {
        return `${ageRange[1]}-${ageRange[0]}`;
    }

    return `${ageRange[0]}-${ageRange[1]}`;
};
