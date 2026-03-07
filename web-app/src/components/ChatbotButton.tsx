import { MessageCircle } from "lucide-react";

const ChatbotButton = () => (
  <button className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center">
    <MessageCircle className="h-6 w-6" />
  </button>
);

export default ChatbotButton;
