import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'
import data from './components/data'

function App() {

  const [tasks, setTasks] = useState(data)

  return (
    <div className='container'>
      <Header title='Task Tracker' />
      <Tasks tasks={tasks} />
    </div>
  )
}

export default App
