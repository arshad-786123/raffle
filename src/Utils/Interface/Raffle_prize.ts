interface Prize {
  _id: string;
  ticketID: string;
  userId: string;
}

interface InstantPrize extends Prize {
  instant_position: string;
  instant_prize: string;
  instant_value: string;
}

interface MainPrize extends Prize {
  ticket_position: string;
  prize_value: string;
  prize_name: string;
}

interface Raffle {
  _id: string;
  raffle_name: string;
  raffle_description: string;
  websites: string;
  images: string[];
  instant_prize?: InstantPrize;
  main_prize?: MainPrize;
}

interface RafflesResponse {
  instant_prizes: Raffle[];
  main_prizes: Raffle[];
}