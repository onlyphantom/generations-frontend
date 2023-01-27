export function earningBoard(user) {
  return (
    <div className="stats bg-primary text-primary-content">
      <div className="stat">
        <div className="stat-title">Total Payouts</div>
        <div className="stat-value">{user.earnings.length}</div>
        <div className="stat-desc">
          Since joining on {user.createdAt.slice(0, 10)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Earnings (IDR)</div>
        <div className="stat-value">
          {user.earnings
            .reduce((sum, curr) => sum + Number(curr.amount), 0)
            .toLocaleString()}
        </div>
        <div className="stat-actions">
          <button className="btn btn-sm">View History</button>
        </div>
      </div>
    </div>
  );
}
