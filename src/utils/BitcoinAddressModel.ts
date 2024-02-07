//Schemas for storing the btc address , //address as a parameter in the post request
//Schema for storing the list of transactions associated particular btc adress

export interface BitcoinAddress {
  address: string;
  status: string;
  createdAt: Date;
  pingedAt: number;
}


