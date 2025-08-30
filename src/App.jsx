import { useState, useEffect } from 'react';
import './App.css';
import { FaTrash } from 'react-icons/fa';

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  // تحميل التودو من الـ localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodo(JSON.parse(savedTodos));
    }
  }, []); // [] تعني أنه سيعمل مرة واحدة عند أول تحميل

  // إضافة تودو جديد
  const AddTodo = () => {
    if (input.trim() === '') return;  // لو النص فاضي أو كله مسافات، ما تضيفش حاجة
    const newTodo = { text: input, completed: false };

    const updatedTodos = [...todo, newTodo];

    // حفظ التودو في الـ localStorage
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    // تحديث الحالة
    setTodo(updatedTodos);
    setInput('');
  }

  // تغيير حالة التودو (مكتمل / غير مكتمل)
  const toggleTodo = (index) => {
    const newTodos = [...todo];
    newTodos[index].completed = !newTodos[index].completed;

    // تحديث التودو في الـ localStorage
    localStorage.setItem('todos', JSON.stringify(newTodos));

    setTodo(newTodos);
  }

  // حذف تودو
  const deleteTodo = (index) => {
    const updatedTodos = todo.filter((_, i) => i !== index);

    // تحديث التودو في الـ localStorage
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setTodo(updatedTodos);
  }

  return (
    <div className='big-container'>
      <div className='container'>
        <h1>To-Do App</h1>
        <p>Get things done, one item at a time.</p>
        <hr style={{ border: "none", borderTop: "1px solid gray", margin: "10px 0" }} />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add function....'
          className='inp'
        />
        <button onClick={AddTodo} className='btn'>Add</button>

        <ul>
          {todo.map((item, index) => (
            <li key={index} className='todo-style'>
              <span
                onClick={() => toggleTodo(index)}
                className={item.completed ? 'completed' : ''}
                style={{ fontSize: 18, padding: 10, flexGrow: 1 }}
              >
                {item.text}
              </span>
              <input
                type='checkbox'
                checked={item.completed}
                onChange={() => toggleTodo(index)}
              />
              <span className='del-item' onClick={() => deleteTodo(index)}>
                <FaTrash color='red' size={18} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
