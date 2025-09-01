import { ICard } from "@/types/blackjack";
import { values } from "@/data/constants";

export const addCard = (
  currentDeck: ICard[]
): { newDeck: ICard[]; sum: number } => {
  const newDeck = currentDeck ? [...currentDeck] : [];
  const cardIndex = Math.floor(Math.random() * values.length);
  const newCard = values[cardIndex];

  newDeck.push(newCard);

  let sum = 0;
  for (let i = 0; i < newDeck.length; i++) {
    sum += newDeck[i].value;
  }

  console.log("New Deck ", newDeck);
  console.log("Sum: ", sum);

  if (sum > 21) console.log("You lose, more than 21");

  return { newDeck, sum };
};
