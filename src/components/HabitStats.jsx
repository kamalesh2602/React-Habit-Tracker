function HabitStats(props) {
    return (
        <div>
            <h3>Total Habits: {props.totalHabits}</h3>
            <h3>Completed: {props.completedHabits}</h3>
            <h3>Pending: {props.pendingHabits}</h3>
            <h3>
                Completion Rate:
                {Math.round(props.completionRate)}%
            </h3>
            <h3>Category Breakdown</h3>

            {
                Object.entries(props.categoryCounts).map(
                    ([category, count]) => (
                        <p key={category}>
                            {category}: {count}
                        </p>
                    )
                )
            }

        </div>
    );
}

export default HabitStats;