import { useState, useEffect } from "react";

const EarningHistory = ({ sortedEarning }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="earning-history-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <div className="modal-header my-4">
            <h2 className="modal-title text-2xl">Earning History</h2>
            <label
              htmlFor="earning-history-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
          <div className="modal-body">
            <div className="overflow-x-auto">
              <table className="table table-compact table-zebra w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount (IDR)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEarning.map((earning) => (
                    <tr key={earning.id}>
                      <td>{earning.earnedAt.slice(0, 10)}</td>
                      <td>{Number(earning.amount).toLocaleString()}</td>
                      <td>{earning.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function EarningBoard(user) {
  const [sortedEarning, setSortedEarning] = useState(user.earnings);

  useEffect(() => {
    setSortedEarning(
      user.earnings.sort((a, b) => {
        return new Date(b.earnedAt) - new Date(a.earnedAt);
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
            <label htmlFor="earning-history-modal" className="btn btn-sm">
              View History
            </label>
          </div>
        </div>
      </div>
      <EarningHistory sortedEarning={sortedEarning} />
    </div>
  );
}
