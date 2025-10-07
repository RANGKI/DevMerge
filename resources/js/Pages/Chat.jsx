import { ChatInterface } from "@/components/ui/chat-interfaces";

export default function Home({ directMessages }) { 
  return <ChatInterface directMessages={directMessages} />;
}
