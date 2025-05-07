export interface ShippingAddress {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateProvince: string;
    district: string;
    country: string;
    phoneNumber: string;
    isDefault: boolean;
  }