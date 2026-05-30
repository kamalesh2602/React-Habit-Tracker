import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

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

        <HabitForm
            habitName={habitName}
            setHabitName={setHabitName}
            addHabit={addHabit}
        />

        <HabitList
            habits={habits}
            deleteHabit={delHabit}
        />
    </div>
)
}

export default App;