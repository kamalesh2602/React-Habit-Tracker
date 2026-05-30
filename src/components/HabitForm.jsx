function HabitForm(props) {
    return (
        <>
            <input
                type="text"
                value={props.habitName}
                onChange={(e) =>
                    props.setHabitName(e.target.value)
                }
            />
            <select
                value={props.category}
                onChange={(e) => props.setCategory(e.target.value)}
            >
                <option value="Health">Health</option>
                <option value="Coding">Coding</option>
                <option value="Learning">Learning</option>
                <option value="Personal">Personal</option>
            </select>

            <button onClick={props.addHabit}>
                Add Habit
            </button>
        </>
    );
}

export default HabitForm;