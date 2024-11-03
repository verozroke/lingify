import type { User } from "./user";

export type CardSet = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  cards: Card[];
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};

export type Card = {
  id: string;
  word: string;
  definition: string;
  cardSetId: string;
  cardSet: CardSet;
  createdAt: Date;
  updatedAt: Date;
};
