interface WinnerResult {
  text: string;
  winner: "player" | "dealer" | "tie";
}

export const determineWinner = (
  playerSum: number,
  dealerSum: number
): WinnerResult => {
  if (playerSum > 21)
    return { text: "Dealer wins! Player has more than 21!", winner: "dealer" };
  if (dealerSum > 21)
    return { text: "Player wins! Dealer has more than 21!", winner: "player" };
  if (playerSum > dealerSum) return { text: "Player wins!", winner: "player" };
  if (dealerSum > playerSum) return { text: "Dealer wins!", winner: "dealer" };
  return { text: "Push! It's a tie!", winner: "tie" };
};
