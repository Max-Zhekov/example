"use client";
import BetModal from "./components/BetModal/BetModal";

import { useState, useEffect } from "react";
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
  const [winner, setWinner] = useState<"player" | "dealer" | "tie" | null>(
    null
  );
  const [userMoney, setUserMoney] = useState(100);
  const [betAmount, setBetAmount] = useState(10);
  const [isBetModalOpen, setIsBetModalOpen] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showResults) {
      const timer = setTimeout(() => {
        setShowResults(false);
        setIsBetModalOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showResults]);

  const handleStart = () => {
    if (userMoney <= 0) {
      setMessage("You're out of money!");
      setIsBetModalOpen(true);
      return;
    }
    const playerHand = createDeck();
    const dealerHand = createDeck();

    setPlayerDeck(playerHand);
    setPlayerSum(playerHand.reduce((acc, card) => acc + card.value, 0));
    setDealerDeck(dealerHand);
    setDealerSum(dealerHand.reduce((acc, card) => acc + card.value, 0));
    setMessage("");
    setWinner(null);
    setGameStage("start game");
    setIsBetModalOpen(false);
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
      setWinner("dealer");
      setUserMoney((prev) => prev - betAmount);
      setShowResults(true);
      setGameStage("initial");
    }
  };

  const handleStand = () => {
    setGameStage("dealer-turn");

    // dealer's move
    const dealerResult = dealerPlay(dealerDeck);
    setDealerDeck(dealerResult.finalHand);
    setDealerSum(dealerResult.finalSum);

    // choose winner
    const { text, winner } = determineWinner(playerSum, dealerResult.finalSum);
    setMessage(text);
    setWinner(winner);
    updateMoney(winner);
    setShowResults(true);
    setGameStage("initial");
  };

  const updateMoney = (winner: "player" | "dealer" | "tie" | null) => {
    if (winner === "player") {
      setUserMoney((prev) => prev + betAmount);
      console.log("Player wins money");
    } else if (winner === "dealer") {
      setUserMoney((prev) => prev - betAmount);
      console.log("Dealer wins money");
    }
  };

  const handleConfirmBet = () => {
    if (userMoney <= 0) {
      setMessage("You're out of money!");
      setIsBetModalOpen(true);
      return;
    }
    handleStart();
  };

  return (
    <>
      {isBetModalOpen ? (
        <BetModal
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          setIsBetModalOpen={handleConfirmBet}
          userMoney={userMoney}
        />
      ) : (
        <div className="bg_color">
          <div className="container">
            <div className={styles.wrapper}>
              <h1 className={styles.title}>Blackjack Game</h1>
              <p className={styles.stake}>${betAmount} at stake</p>

              {showResults && (
                <div className={styles.resultOverlay}>
                  <div className={styles.resultMessage}>
                    <h2>{message}</h2>
                    <div className={styles.cardsContainer}>
                      <div className={styles.scoreCard}>
                        <h3>👤 Player</h3>
                        <p className={styles.score}>{playerSum}</p>
                        <p>{playerDeck.length} cards</p>
                      </div>
                      <div className={styles.scoreCard}>
                        <h3>🎩 Dealer</h3>
                        <p className={styles.score}>{dealerSum}</p>
                        <p>{dealerDeck.length} cards</p>
                      </div>
                    </div>
                    <p className={styles.countdown}>
                      New round starting soon...
                    </p>
                  </div>
                </div>
              )}

              <div className={styles.handInfo}>
                <div
                  className={`${styles.handInfo__user} ${
                    winner === "player" && "winner"
                  }`}>
                  <h3 className={styles.subtitle}>Player Hand ({playerSum})</h3>
                  <p className={styles.text}>Cards: {playerDeck.length}</p>
                  <p className={styles.text}>${userMoney} in total</p>
                </div>

                <div
                  className={`${styles.handInfo__user} ${
                    winner === "dealer" && "winner"
                  }`}>
                  <h3 className={styles.subtitle}>
                    Dealer Hand ({gameStage === "initial" ? dealerSum : "?"})
                  </h3>
                  <p className={styles.text}>Cards: {dealerDeck.length}</p>
                </div>
              </div>
              {message && <p className={styles.message}>{message}</p>}

              <div className={styles.buttons}>
                <button
                  className={styles.btn}
                  onClick={handleStart}
                  disabled={gameStage === "start game"}>
                  Start
                </button>
                <button
                  className={styles.btn}
                  onClick={handleAddCard}
                  disabled={gameStage == "initial" || playerSum > 21}>
                  Hit
                </button>
                <button
                  className={styles.btn}
                  onClick={handleStand}
                  disabled={gameStage == "initial"}>
                  Stand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
