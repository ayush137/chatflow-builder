import Navbar from "./components/Navbar";
import ChatFlowMap from "./components/ChatFlowMap";
import SideBar from "./components/SideBar";

const ChatFlowBuilder = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="mt-[63px] w-full flex justify-between h-full">
        <div className="w-full">
          <ChatFlowMap />
        </div>
        <div className="w-[400px] min-h-[calc(100vh-63px)] border-l border-[#e4e4e7] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.06)]">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default ChatFlowBuilder;
