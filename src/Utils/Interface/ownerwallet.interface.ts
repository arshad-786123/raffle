export interface IOwnerWallet {
    cardDetails: any[];
    balance: string;
    revenue: {
        time:string,
        amount:string
    };
    profits: string;
    ownerID: string;
}