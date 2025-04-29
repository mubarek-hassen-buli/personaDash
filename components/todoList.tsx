'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { addTodo, deleteTodo, getTodos, updateTodo } from '@/lib/todoService';
import { Todo } from '@/types/todo';
import { Plus } from 'lucide-react';

const TodoWidget = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!task.trim()) return;
    const newTodo = await addTodo(task);
    setTodos([newTodo, ...todos]);
    setTask('');
  };

  const toggleTodo = async (todo: Todo) => {
    const updated = await updateTodo(todo.$id, { completed: !todo.completed });
    setTodos(todos.map(t => t.$id === todo.$id ? updated : t));
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.$id !== id));
  };

  return (
    <Card className="w-full h-full rounded-2xl bg-muted text-white shadow-md p-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Tasks</CardTitle>
        <span className="text-sm text-muted-foreground">{todos.length} remaining</span>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Add new task..."
            value={task}
            onChange={e => setTask(e.target.value)}
            className="text-black"
          />
          <Button onClick={handleAdd}><Plus className="h-4 w-4" /></Button>
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {todos.map(todo => (
            <div
              key={todo.$id}
              className={`flex items-center justify-between p-2 rounded-md ${
                todo.completed ? 'bg-muted/50 line-through text-muted-foreground' : 'bg-muted/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo)}
                />
                <span>{todo.title}</span>
              </div>
              <button onClick={() => handleDelete(todo.$id)} className="text-red-500 text-sm">x</button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoWidget;
