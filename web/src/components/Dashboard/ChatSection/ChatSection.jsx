import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatSection({
  messages,
  streamingMessage,
  isLoading,
  currentMessage,
  setCurrentMessage,
  onSend,
  onKeyPress,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col h-[900px] lg:h-[1000px]">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        streamingMessage={streamingMessage}
        isLoading={isLoading}
      />
      <ChatInput
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        onSend={onSend}
        onKeyPress={onKeyPress}
        isLoading={isLoading}
      />
    </div>
  );
}
