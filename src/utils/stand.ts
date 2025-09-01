export const stand = (sum: number): string => {
  if (sum === 21) {
    return "BLACKJACK! You won!";
  } else if (sum >= 17 && sum <= 20) {
    return "Good hand! Waiting for dealer";
  } else if (sum > 21) {
    return "Bust! You lose 💀";
  } else {
    return "Too low, but you have chance";
  }
};
