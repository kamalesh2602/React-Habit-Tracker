import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";

function App() {

    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem("habits");

        return storedHabits
            ? JSON.parse(storedHabits)
            : [];
    });
    const [habitName, setHabitName] = useState("")
    const [category, setCategory] = useState("Health")
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits))
    }, [habits])



    const addHabit = () => {
        if (habitName.trim() === "") {
            return;
        }
        setHabits([...habits, { id: Date.now(), name: habitName, completed: false, category: category }]);
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



    const categoryFilteredHabits = habits.filter((habit) =>
        selectedCategory === "All"
            ? true
            : habit.category === selectedCategory
    )

    const filteredHabits = categoryFilteredHabits.filter((habit) =>
        habit.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalHabits = habits.length;

    const completedHabits = habits.filter(
        (habit) => habit.completed
    ).length;

    const pendingHabits =
        totalHabits - completedHabits;

    const completionRate =
        totalHabits === 0
            ? 100
            : (completedHabits / totalHabits) * 100;

    const categoryCounts = habits.reduce(
        (counts, habit) => {

            counts[habit.category] =
                (counts[habit.category] || 0) + 1;

            return counts;
        },
        {}
    );
    console.log(categoryCounts);
    return (
        <div>
            <h1>Habit Tracker</h1>

            <HabitForm
                habitName={habitName}
                setHabitName={setHabitName}
                addHabit={addHabit}
                category={category}
                setCategory={setCategory}
            />
            <HabitStats
                totalHabits={totalHabits}
                completedHabits={completedHabits}
                pendingHabits={pendingHabits}
                completionRate={completionRate}
                categoryCounts={categoryCounts}
            />

            <input
                type="text"
                placeholder="Search habits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select
                value={selectedCategory}
                onChange={(e) =>
                    setSelectedCategory(e.target.value)
                }
            >
                <option value="All">All</option>
                <option value="Health">Health</option>
                <option value="Coding">Coding</option>
                <option value="Learning">Learning</option>
                <option value="Personal">Personal</option>
            </select>

            <HabitList
                habits={filteredHabits}
                deleteHabit={delHabit}
                toggleHabit={toggleHabit}
            />


        </div>
    )
}

export default App;