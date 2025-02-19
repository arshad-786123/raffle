export interface UserRegister {
    email: string;
    role: string;
    password: string;
    firstname: string;
    lastname: string;
    dialCode: {
        code: string;
        dial_code: string;
        country: string;
    };
    businessName: string;
    businessAddress: string;
    city: string;
    postcode: string;
    country: string;
    businessEmailNote: string;
    businessEmailVerify: string;
    phone: string;
    referralCode?: string;
    opted: boolean;
}