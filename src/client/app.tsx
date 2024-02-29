import { useWatchFile } from "@/client/features/subscription/useSubscription";

function App() {
  useWatchFile(() => {
    console.log("🚀 File Changed");
  });

  return <div className="">test</div>;
}

export default App;
