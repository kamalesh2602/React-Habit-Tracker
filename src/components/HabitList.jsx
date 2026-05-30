//destructured props

function HabitList({ habits, deleteHabit, toggleHabit }) {
    return (
        <ul>
            {habits.map((habit) => (
                <li key={habit.id}>
                    <input
                        type="checkbox"
                        checked={habit.completed}
                        onChange={() => toggleHabit(habit.id)}
                    />
                    <span
                        style={{
                            textDecoration: habit.completed
                                ? "line-through"
                                : "none"
                        }}
                    >
                        {habit.name}
                    </span>

                    <button
                        onClick={() => deleteHabit(habit.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default HabitList;