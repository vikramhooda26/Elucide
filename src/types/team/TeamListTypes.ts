export type team = {
    id: string;
    teamName: string;
    createdDate: string;
    modifiedDate: string | null;
    createdBy: {
        userId: string;
        email: string;
    };
    modifiedBy: {
        userId: string;
        email: string;
    };
};
