import { useEffect } from "react";

function App() {
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");

      console.log(await res.json());
    })();
  }, []);

  return <div className="App">test</div>;
}

export default App;
