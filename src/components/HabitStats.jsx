function HabitStats(props) {
    return (
        <div>
            <div className="stats-grid">
                <div className="stats-card">
                    <h2>{props.totalHabits}</h2>
                    <p>Total Habits</p>
                </div>

                <div className="stats-card">
                    <h2>{props.completedHabits}</h2>
                    <p>Completed</p>
                </div>

                <div className="stats-card">
                    <h2>{props.pendingHabits}</h2>
                    <p>Pending</p>
                </div>

                <div className="stats-card">
                    <h2>
                        {Math.round(props.completionRate)}%
                    </h2>
                    <p>Completion</p>
                </div>
            </div>

            <h3>Category Breakdown</h3>

            <div className="category-list">
                {
                    Object.entries(props.categoryCounts).map(
                        ([category, count]) => (
                            <div
                                key={category}
                                className="category-pill"
                            >
                                {category} ({count})
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default HabitStats;