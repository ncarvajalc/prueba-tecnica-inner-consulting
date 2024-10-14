import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        Technical Test - Frontend Developer
      </h1>
      <p className="max-w-xl">
        This is the technical test for the Frontend Developer position at Inner
        Consulting. To begin, click in the <span>Create Product</span> button
        below.
      </p>
      <Button>
        <Link href={`/products/add/1`}>Create Product</Link>
      </Button>
    </>
  );
}
