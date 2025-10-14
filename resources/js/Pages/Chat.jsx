import { ChatInterface } from "@/components/ui/chat-interfaces";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Home({ directMessages }) { 
  const { props } = usePage()

  useEffect(() => {
    console.log('testing my broadcasr============')
  }, []);

  // useEffect(() => {
  //   console.log('testing my broadcasr')
  //   const a = window.Echo.private(`App.Models.User.${props.auth.user.id}`)
  //     .listen('.MessageSent', (event) => {
  //       console.log('$$$$$$$$$$$$$$$$$$$$$$4')
  //       console.log('New event received:', event);
  //     });
  //   console.log("++++++")
  //   console.log(a)
  //   console.log('++++++')
  // }, []);

  return <ChatInterface directMessages={directMessages} />;
}
