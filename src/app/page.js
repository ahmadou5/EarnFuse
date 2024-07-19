'use client'
import { Home2 } from "@/components/Home";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDoing,setIsDoing] = useState(true)
  return (
    <main className="flex min-h-screen flex-col ">
     {isDoing ? <Home2/> :  <Loading/> }
    </main>
  );
}
