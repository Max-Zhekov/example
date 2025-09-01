import { values } from "@/data/constants";
import { ICard } from "@/types/blackjack";
export function createDeck(): ICard[] {
  const deck: ICard[] = [];

  while (deck.length < 2) {
    const cardIndex = Math.floor(Math.random() * values.length);
    const card = values[cardIndex];
    deck.push(card);
  }
  console.log(deck);
  return deck;
}
