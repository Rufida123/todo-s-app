import { useState } from "react";
import { useTasksStore } from './store/tasks-store';

export default function TaskInput() {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');
    const addTask = useTasksStore((state) => state.addTask);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim().length === 0) {
            setError('Enter a task name to add it.');
            return;
        }

        setError('');
        addTask(task.trim());
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
                <div className="form-row">
                    <label htmlFor="task">Task</label>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="What needs doing?"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'task-error' : undefined}
                    />
                    <button type="submit">Add task</button>
                </div>
                {error && <p className="error-text" id="task-error" role="alert">{error}</p>}
            </div>
        </form>
    );
}