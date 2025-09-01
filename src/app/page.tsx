"use client";

import { useState } from "react";
import { createDeck } from "@/utils/deck";
import { addCard } from "@/utils/addCard";
import { dealerPlay } from "@/utils/dealer";
import { determineWinner } from "@/utils/compareHands";
import { ICard } from "@/types/blackjack";

import styles from "./home.module.css";

export default function Home() {
  const [playerDeck, setPlayerDeck] = useState<ICard[]>([]);
  const [playerSum, setPlayerSum] = useState(0);
  const [dealerDeck, setDealerDeck] = useState<ICard[]>([]);
  const [dealerSum, setDealerSum] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStage, setGameStage] = useState("initial");

  const handleStart = () => {
    const playerHand = createDeck();
    const dealerHand = createDeck();

    setPlayerDeck(playerHand);
    setPlayerSum(playerHand.reduce((acc, card) => acc + card.value, 0));
    setDealerDeck(dealerHand);
    setDealerSum(dealerHand.reduce((acc, card) => acc + card.value, 0));
    setMessage("");
    setGameStage("player-turn");
  };

  const handleAddCard = () => {
    if (playerDeck.length === 0) {
      setMessage("Start the game first!");
      return;
    }

    const result = addCard(playerDeck);
    setPlayerDeck(result.newDeck);
    setPlayerSum(result.sum);

    if (result.sum > 21) {
      setMessage("Player busts! Dealer wins! 💀");
      setGameStage("game-over");
    }
  };

  const handleStand = () => {
    setGameStage("dealer-turn");

    // dealer's move
    const dealerResult = dealerPlay(dealerDeck);
    setDealerDeck(dealerResult.finalHand);
    setDealerSum(dealerResult.finalSum);

    // choose winner
    const winnerMessage = determineWinner(playerSum, dealerResult.finalSum);
    setMessage(winnerMessage);
    setGameStage("game-over");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Blackjack Game</h1>
        <div className={styles.handInfo}>
          <div className={styles.handInfo__user}>
            <h3 className={styles.subtitle}>Player Hand ({playerSum})</h3>
            <p className={styles.text}>Cards: {playerDeck.length}</p>
          </div>

          <div className={styles.handInfo__user}>
            <h3 className={styles.subtitle}>
              Dealer Hand ({gameStage === "game-over" ? dealerSum : "?"})
            </h3>
            <p className={styles.text}>Cards: {dealerDeck.length}</p>
          </div>
        </div>
        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.buttons}>
          <button className={styles.btn} onClick={handleStart}>
            Start
          </button>
          <button
            className={styles.btn}
            onClick={handleAddCard}
            disabled={gameStage !== "player-turn" || playerSum > 21}>
            Hit
          </button>
          <button
            className={styles.btn}
            onClick={handleStand}
            disabled={gameStage !== "player-turn"}>
            Stand
          </button>
        </div>
      </div>
    </div>
  );
}
