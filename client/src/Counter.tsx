import { useState } from "react";
import reactLogo from "./assets/react.svg";

import { trpc } from "./utils/trpc";

function Counter() {
  const [count, setCount] = useState(0);

  const user = trpc.getUser.useQuery("me");
  if (!user.data) return <div>Loading...</div>;

  // 型ついてる〜
  const { name } = user.data;

  const mutation = trpc.createUser.useMutation();
  const handleCreateUser = () => {
    mutation.mutate({ name: "test" });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleCreateUser}>Create User Button</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Counter;
