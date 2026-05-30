//destructured props

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";


function HabitList({ habits, deleteHabit, toggleHabit, editingId, setEditingId, editText, setEditText, saveHabit }) {
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
                        {
                            habit.id === editingId ? (
                                <>
                                    <input
                                        value={editText}
                                        onChange={(e) =>
                                            setEditText(e.target.value)
                                        }
                                    />
                                    <button onClick={saveHabit}>
                                        Save
                                    </button>
                                </>

                            ) : (
                                <span
                                    style={{
                                        textDecoration: habit.completed
                                            ? "line-through"
                                            : "none"
                                    }}
                                >
                                    {habit.name}
                                </span>
                            )
                        }
                        <button
                            onClick={() => {
                                setEditingId(habit.id);
                                setEditText(habit.name);
                            }}
                        >
                            Edit
                        </button>
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