import { useState } from "react";
import { useTasksStore } from './store/tasks-store';

export default function TaskInput() {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');
    const addTask = useTasksStore((state) => state.addTask);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Validate first
        if (task.trim().length === 0) {
            setError('Task cannot be blank.');
            return;
        }

        // 2. Process success
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
                        placeholder="Enter a new task..."
                    />
                    <button type="submit">Add</button>
                </div>
                {error && <p className="error-text">{error}</p>}
            </div>
        </form>
    );
}