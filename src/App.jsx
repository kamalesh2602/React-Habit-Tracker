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
        setHabits([...habits, { id: Date.now(), name: habitName, completed : false}]);
        setHabitName("");
    }

    const delHabit = (id) => {
        setHabits(habits.filter((habit) => habit.id !== id))
    }
    
    const toggleHabit = (id) => {
    setHabits(
        habits.map((habit) => {

            if (habit.id === id) {
                return {
                    ...habit,
                    completed: !habit.completed
                };
            }

            return habit;
        })
    );
};


 
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
            toggleHabit={toggleHabit}
        />
    </div>
)
}

export default App;