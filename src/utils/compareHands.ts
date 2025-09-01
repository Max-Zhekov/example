export const determineWinner = (
  playerSum: number,
  dealerSum: number
): string => {
  if (playerSum > 21) return "Player busts! Dealer wins!";
  if (dealerSum > 21) return "Dealer busts! Player wins!";
  if (playerSum > dealerSum) return "Player wins!";
  if (dealerSum > playerSum) return "Dealer wins!";
  return "Push! It's a tie!";
};
