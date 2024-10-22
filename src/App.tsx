import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
// Genera un cliente para interactuar con la base de datos
const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  // Estado para almacenar la lista de todos
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    // Observa los cambios en la tabla Todo y actualiza el estado
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  // Función para crear un nuevo todo
  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  // Función para eliminar un todo
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      {/* Botón para crear un nuevo todo */}
      <button onClick={createTodo}>+ new</button>
      {/* Lista de todos */}
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
