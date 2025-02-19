
export interface IRaffle {
    raffle_name: string;
    raffle_description: string;
    websites: string;
    images: any[];
    email: string;
    existingImages: any[];
    videos: any[];
    category: string;
    isInstantPrize: boolean;
    instant_prizes: any[];
    main_prizes: any[];
    instant_prize_position: string;
    instant_prize: string;
    instant_value: string;
    main_prize_value: string;
    ticket_price: string;
    max_tickets_per_person: string;
    currency: string;
    raffle_type: 'REVENUE' | 'TICKET' | 'TIME';
    revenue_set_prize: string;
    ticket_set_prize: any;
    start_date: string;
    time_set_prize: string;
    owner: any;
    winners: any[];
    isDraft: boolean;
    cronTime: string;
    isApprovedByAdmin: Boolean;
    isAlive: Boolean;
    isSuspended: Boolean;
    tcApproved: Boolean;
    isEmailApproved: Boolean;
    purchases: Object[];
    totalPurchasedTicket: number;
    totalPurchasedTicketAmount: String;
    review: Object[];
    ratings: Object[];
    result: {
        businessName: string;
        image: string;
    };
    ownerDetails: {
        businessName: string;
        image: string;
    };
    raffle_status: number;
    _id: string;
    createdAt: string;
    question: string;
    correctAnswer: string;
    answers: any[];
    isFreeRaffle: any;
    selectedImage: number | null;
    bannerImage: string;
    raffleCategoryType: string
    associatedLogo: string
}