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

            <button onClick={props.addHabit}>
                Add Habit
            </button>
        </>
    );
}

export default HabitForm;