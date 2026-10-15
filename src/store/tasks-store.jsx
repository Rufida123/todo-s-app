import {create} from "zustand";

export const useTasksStore = create((set) => ({
    tasks: [
        { id: 1, name: "Task 1", completed: false },
        { id: 2, name: "Task 2", completed: false },
        { id: 3, name: "Task 3", completed: false }
    ],
    addTask: (name) => set((state) => ({ 
        tasks: [...state.tasks, { id: Date.now(), name ,completed: false}] 
    })),
    deleteTask: (taskId) => set((state) => ({ 
        tasks: state.tasks.filter((task) => task.id !== taskId) 
    })),
    updateTask: (taskId, newName) => set((state) => ({ 
    tasks: state.tasks.map((task) => 
        task.id === taskId ? { ...task, name: newName } : task
    )})),
    toggleTask: (taskId) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    }))
}));