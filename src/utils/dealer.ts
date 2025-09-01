import { ICard } from "@/types/blackjack";
import { values } from "@/data/constants";

export const dealerPlay = (
  dealerHand: ICard[]
): { finalHand: ICard[]; finalSum: number } => {
  const currentHand = [...dealerHand];
  let currentSum = currentHand.reduce((sum, card) => (sum += card.value), 0);

  while (currentSum < 17) {
    const cardIndex = Math.floor(Math.random() * values.length);
    const newCard = values[cardIndex];
    currentHand.push(newCard);
    currentSum += newCard.value;

    console.log("Дилер взял:", newCard.rank, "Текущая сумма:", currentSum);
  }

  return {
    finalHand: currentHand,
    finalSum: currentSum,
  };
};
