import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-white">
        Home
      </h1>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Card Action
          </button>
        </CardFooter>
      </Card>

      <Button>Shadcn Button</Button>
    </div>
  );
};

export default Home;
