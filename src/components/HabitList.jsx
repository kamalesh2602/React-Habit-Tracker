//destructured props

function HabitList({habits , deleteHabit}) {
    return (
        <ul>
            {habits.map((habit) => (
                <li key={habit.id}>
                    {habit.name}

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