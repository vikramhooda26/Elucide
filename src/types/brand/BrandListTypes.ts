export type brand = {
  id: string;
  brandName: string;
  createdDate: string;
  modifiedDate: string | null;
  createdBy: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  modifiedBy: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
  };
};
