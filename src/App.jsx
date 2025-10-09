import { ArrowRight } from "lucide-react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-around px-10 ">
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-primary-blue font-medium text-2xl">
          You AI Assistant
        </h1>
        <p className="text-lg w-80">
          Using this software, you can ask questions and receive articles using
          atificial intelligence assistant
        </p>
      </div>
      <img src="../src/assets/frame 33.png" />
      <Button className="w-full rounded-full h-13 relative bg-primary-blue text-lg cursor-pointer hover:bg-primary-blue/90">
        Continue
        <ArrowRight className="w-5! h-5! absolute right-10" />
      </Button>
    </div>
  );
}

export default App;
