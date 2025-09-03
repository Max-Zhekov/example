import styles from "./betModal.module.css";

interface IBetModalProps {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  setIsBetModalOpen: (isOpen: boolean) => void;
  userMoney: number;
}

const BetModal = ({
  betAmount,
  setBetAmount,
  setIsBetModalOpen,
  userMoney,
}: IBetModalProps) => {
  const quickBets = [5, 10, 25, 50];

  const handleConfirm = () => {
    if (betAmount > 0 && betAmount <= userMoney) {
      setIsBetModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= userMoney) {
      setBetAmount(value);
    } else {
      setBetAmount(userMoney);
    }
  };

  const setQuickBet = (amount: number) => {
    if (amount <= userMoney) {
      setBetAmount(amount);
    }
  };

  return (
    <div className="bg_color">
      <div className="container">
        <div className={styles.modalContainer}>
          <h2 className={styles.title}>Place Your Bet</h2>
          <p className={styles.availableText}>Available: ${userMoney}</p>

          <div className={styles.quickBets}>
            {quickBets.map((amount) => (
              <button
                key={amount}
                className={`${styles.quickBet} ${
                  betAmount === amount ? styles.quickBetActive : ""
                }`}
                onClick={() => setQuickBet(amount)}
                disabled={amount > userMoney}>
                ${amount}
              </button>
            ))}
          </div>

          <input
            type="number"
            min="1"
            max={userMoney}
            value={betAmount}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter bet amount"
          />

          <button
            onClick={handleConfirm}
            disabled={betAmount <= 0 || betAmount > userMoney}
            className={styles.button}>
            Confirm Bet ${betAmount}
          </button>

          {betAmount > userMoney && (
            <p className={styles.error}>Bet cannot exceed available money!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetModal;
