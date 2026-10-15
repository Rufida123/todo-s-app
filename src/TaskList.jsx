import TaskItem from "./TaskItem";
import { useTasksStore } from './store/tasks-store';

export default function TaskList() {
    const tasks = useTasksStore((state) => state.tasks);
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p className="empty-state">Nothing on your list yet. Add your first task above.</p>
            ) : (
                tasks.map((task) => <TaskItem key={task.id} id={task.id} name={task.name} completed={task.completed}/>)
            )}
        </div>
    );
}