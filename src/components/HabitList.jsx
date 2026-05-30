//destructured props

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";


function HabitList({ habits, deleteHabit, toggleHabit }) {
    const { theme } = useContext(ThemeContext);
    return (
        <ul>
            {habits.map((habit) => (
                <li key={habit.id} className={`habit-item ${theme}`}>
                    <div>
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
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default HabitList;