import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DiarioMural() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder]);
      setNewReminder("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Diario Mural</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendario */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Calendario</h2>
            <Calendar onChange={setDate} value={date} />
          </CardContent>
        </Card>
        
        {/* Lista de tareas */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Lista de Tareas</h2>
            <div className="mb-2 flex">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nueva tarea"
                className="mr-2"
              />
              <Button onClick={addTask}>Añadir</Button>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                  onClick={() => toggleTask(index)}
                >
                  {task.text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Sección de Recordatorios */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Recordatorios</h2>
          <div className="mb-2 flex">
            <Input
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Nuevo recordatorio"
              className="mr-2"
            />
            <Button onClick={addReminder}>Añadir</Button>
          </div>
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index} className="text-gray-700">{reminder}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
