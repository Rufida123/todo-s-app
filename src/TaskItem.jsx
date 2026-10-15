import { useState } from "react";
import { useTasksStore } from './store/tasks-store';

export default function TaskItem({ id, name, completed }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(name);
    const onDelete = useTasksStore((state) => state.deleteTask);
    const onUpdate = useTasksStore((state) => state.updateTask);
    const toggleTask = useTasksStore((state) => state.toggleTask);

    const handleSave = () => {
        if (editText.trim().length === 0) {
            return;
        }
        onUpdate(id, editText.trim());
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            <input 
                type="checkbox" 
                className="task-checkbox" 
                checked={completed} 
                onChange={() => toggleTask(id)} 
                aria-label="Mark task as completed"
            />
            {isEditing ? (
                <input 
                    type="text" 
                    className="task-input" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    autoFocus
                />
            ) : (
                <p className="task-text">{name}</p>
            )}
            <div className="task-actions">
                {isEditing ? (
                    <>
                        <button className="btn-icon btn-save" aria-label="Save task" onClick={handleSave}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                        <button className="btn-icon btn-cancel" aria-label="Cancel editing" onClick={() => { setIsEditing(false); setEditText(name); }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </>
                ) : (
                    <button className="btn-icon btn-edit" aria-label="Edit task" onClick={() => setIsEditing(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                )}
                <button onClick={() => onDelete(id)} className="btn-icon btn-delete" aria-label="Delete task">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}