import './App.css'
import TaskInput from './TaskInput'
import TaskList from './TaskList'
import { useTasksStore } from './store/tasks-store'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function App() {
  const tasks = useTasksStore((state) => state.tasks)
  const total = tasks.length
  const done = tasks.filter((task) => task.completed).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="app">
      <header className="app-header">
        <p className="app-date">{today}</p>
        <h1>{getGreeting()}</h1>
        <div className="progress">
          <div className="progress-meta">
            <span>{total === 0 ? 'No tasks yet' : `${done} of ${total} done`}</span>
            <span>{percent}%</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Tasks completed"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </header>
      <TaskInput />
      <TaskList />
    </main>
  )
}

export default App