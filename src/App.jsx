import { useState } from "react";
function App() {
    const [habits, setHabits] = useState([]);
    const [habitName, setHabitName] = useState("")

    const addHabit = () => {
        if (habitName.trim() === "") {
            return;
        }
        setHabits([...habits, { id: Date.now(), name: habitName }]);
        setHabitName("");
    }

    const delHabit = (id) => {
        setHabits(habits.filter((habit) => habit.id !== id))
    }
    return (
        <div>
            <h1>Habit Tracker</h1>

            <input
                type="text"
                placeholder="Enter Habit"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
            />
            <button onClick={addHabit}>
                Add Habit
            </button>
            <ul>
                {habits.map((habit) => (
                    <li key={habit.id}>
                        {habit.name}
                        <button onClick={() => delHabit(habit.id)}>
                            Delete
                        </button>
                    </li>

                ))}
            </ul>


        </div>
    )
}

export default App;