interface DialCode {
  country: string;
  code: string;
  dial_code: string;
}

interface Wallet {
  _id: string;
  cardDetails: any[];  // Assuming cardDetails is an array, you may want to replace `any` with the appropriate type if you have a more detailed structure
  balance: string;
  revenue: any[];  // Assuming revenue is an array, you may want to replace `any` with the appropriate type if you have a more detailed structure
  profits: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  dialCode: DialCode;
  phone: string;
  referralCode: string;
  businessName: string;
  businessAddress: string;
  businessEmailNote: string;
  businessEmailVerify: string;
  description: string;
  VATNumber: string;
  companyNumber: string;
  image: any;
  landline: string;
  websites: string;
  companyName: string;
  createdAt: string;
  wallet: Wallet;
  country: string;
  city: string;
  address: string;
  region: string;
  postcode: string;
}
