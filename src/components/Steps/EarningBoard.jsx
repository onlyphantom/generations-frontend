import { useState, useEffect } from "react";

const EarningHistory = ({ sortedEarning, setShowHistory }) => {
  return <div>Earning History</div>;
};

export function EarningBoard(user) {
  const [showHistory, setShowHistory] = useState(false);
  const [sortedEarning, setSortedEarning] = useState(user.earnings);

  useEffect(() => {
    setSortedEarning(
      user.earnings.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  }, [user.earnings]);

  return (
    <div>
      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title">Total Payouts</div>
          <div className="stat-value">{sortedEarning.length}</div>
          <div className="stat-desc">
            Since joining on {user.createdAt.slice(0, 10)}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Earnings (IDR)</div>
          <div className="stat-value">
            {sortedEarning
              .reduce((sum, curr) => sum + Number(curr.amount), 0)
              .toLocaleString()}
          </div>
          <div className="stat-actions">
            <button className="btn btn-sm" onClick={() => setShowHistory(true)}>
              View History
            </button>
          </div>
        </div>
      </div>
      {showHistory && (
        <EarningHistory
          sortedEarning={sortedEarning}
          setShowHistory={setShowHistory}
        />
      )}
    </div>
  );
}
