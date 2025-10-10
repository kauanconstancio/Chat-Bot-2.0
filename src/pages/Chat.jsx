import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AudioLines, Send, Upload } from "lucide-react";
import { Link } from "react-router-dom";

function Chat() {
  return (
    <div className="p-5 grid grid-rows-[min-content_1fr_min-content] gap-5 h-full ">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 ">
            <Link to={"/"}>
              <ArrowLeft />
            </Link>
            <img src="./src/assets/robot.png" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-primary-blue">ChatGPT</h2>
            <span className="flex items-center">
              <li className="font-medium ml-5 text-green-600">Online</li>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <AudioLines />
          <Upload className="text-gray-400" />
        </div>
      </div>
      <Separator />
      <ScrollArea className="w-full h-200 max-h-[700px]">
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <span className="rounded-bl-full rounded-br-full rounded-tl-full p-5 bg-primary-blue shadow flex items-center w-[70%] text-white font-medium">
              Hello chatGPT, how are you today?
            </span>
          </div>
          <div className="flex items-end gap-3">
            <div className="shadow rounded-full py-2 px-3">
              <img src="./src/assets/robot.png" className="flex h-7 " />
            </div>
            <span className="rounded-tl-full rounded-br-full rounded-tr-full p-5 bg-gray-100 shadow flex items-center w-[70%] text-black font-medium">
              Hello chatGPT, how are you today?
            </span>
          </div>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="flex gap-3 items-center shadow rounded-full py-3 px-5">
        <Input
          placeholder="Write your mesage..."
          className="border-none shadow-none"
        ></Input>
        <Send className="text-primary-blue cursor-pointer" />
      </div>
    </div>
  );
}

export default Chat;
