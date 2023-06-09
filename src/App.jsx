import Header from './components/Header'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Footer from './components/Footer'
import Tasks from './components/Tasks'
import { useState, useEffect } from 'react' 
// import data from './components/data'
import AddTask from './components/AddTask'
// import About from './components/About'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      console.log(data);
      return data
    }

    // Fetch Task
  const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      console.log(data);
      return data
    }


  // Add Task
  const addTask =async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask ])
  }

  // Delete Task
  const deleteTask = async (id) => {
     await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
     })
      setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()


    setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <div className='container'>
      
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      
        {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task to show'}
      {/* <Footer/> */}
    </div>
   
  )
}

export default App
