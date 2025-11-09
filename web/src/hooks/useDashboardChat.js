import { useState, useCallback } from "react";
import useHandleStreamResponse from "@/utils/useHandleStreamResponse";

export function useDashboardChat(initialMessages, generateSystemPrompt) {
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
    setIsLoading(false);
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { role: "user", content: currentMessage };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: generateSystemPrompt(),
            },
            ...messages,
            userMessage,
          ],
          stream: true,
        }),
      });

      handleStreamResponse(response);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    setMessages,
    currentMessage,
    setCurrentMessage,
    streamingMessage,
    isLoading,
    handleSendMessage,
    handleKeyPress,
  };
}
