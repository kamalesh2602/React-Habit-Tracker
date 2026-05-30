import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";
import ThemeToggle from "./components/ThemeToggle";
import ThemeContext from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { useRef } from "react";
import QuoteOfDay from "./components/QuoteOfDay";
import useDebounce from "./hooks/useDebounce";

function App() {

    const [habits, setHabits] = useLocalStorage("habits", []);
    const [habitName, setHabitName] = useState("")
    const [category, setCategory] = useState("Health")
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [theme, setTheme] = useLocalStorage("theme", "light");
    const searchRef = useRef(null);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [message, setMessage] = useState("");

    const addHabit = () => {
        if (habitName.trim() === "") {
            return;
        }
        setHabits([...habits, { id: Date.now(), name: habitName, completed: false, category: category }]);
        setHabitName("");
        setMessage("Habit Added");
    }

    const delHabit = (id) => {
        setHabits(habits.filter((habit) => habit.id !== id))
        setMessage("Habit Deleted");
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
            .includes(debouncedSearch.toLowerCase())
    );
    console.log("search:", search);
    console.log("debounced:", debouncedSearch);

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

    const handleKeyDown = (e) => {

        if (e.ctrlKey && e.key === "/") {
            e.preventDefault();

            searchRef.current.focus();
        }

    };
    useEffect(() => {

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };

    }, []);

    const saveHabit = () => {

        setHabits(
            habits.map((habit) => {

                if (habit.id === editingId) {
                    return {
                        ...habit,
                        name: editText
                    };
                }

                return habit;
            })
        );

        setEditingId(null);
        setEditText("");
        setMessage("Habit Updated");
    };

    useEffect(() => {

        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, [message]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            <div className={`container ${theme}`}>
                <h1>Habit Tracker</h1>
                <ThemeToggle />

                <HabitForm
                    habitName={habitName}
                    setHabitName={setHabitName}
                    addHabit={addHabit}
                    category={category}
                    setCategory={setCategory}
                />
                {
                    message && (
                        <div className="toast">
                            {message}
                        </div>
                    )
                }
                <HabitStats
                    totalHabits={totalHabits}
                    completedHabits={completedHabits}
                    pendingHabits={pendingHabits}
                    completionRate={completionRate}
                    categoryCounts={categoryCounts}
                />

                <input
                    type="text"
                    ref={searchRef}
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
                    editingId={editingId}
                    setEditingId={setEditingId}
                    editText={editText}
                    setEditText={setEditText}
                    saveHabit={saveHabit}

                />

                <QuoteOfDay />
            </div>
        </ThemeContext.Provider>
    )
}

export default App;