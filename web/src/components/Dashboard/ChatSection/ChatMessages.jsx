import { Bot, User } from "lucide-react";

export function ChatMessages({ messages, streamingMessage, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-[#2196F3] ml-3"
                  : "bg-gradient-to-r from-[#1E88E5] to-[#2196F3] mr-3"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl ${
                message.role === "user"
                  ? "bg-[#2196F3] text-white"
                  : "bg-[#F5F7FA] text-gray-900"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Streaming Message */}
      {streamingMessage && (
        <div className="flex justify-start">
          <div className="flex max-w-[80%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] mr-3">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#F5F7FA] text-gray-900">
              <p className="text-sm whitespace-pre-wrap">{streamingMessage}</p>
              <div className="mt-1">
                <div className="animate-pulse inline-block w-2 h-2 bg-[#2196F3] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !streamingMessage && (
        <div className="flex justify-start">
          <div className="flex max-w-[80%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#1E88E5] to-[#2196F3] mr-3">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#F5F7FA] text-gray-900">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#2196F3] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2196F3] rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-[#2196F3] rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
