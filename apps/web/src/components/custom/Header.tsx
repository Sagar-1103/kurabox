import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
    return (
        <nav>
            <div className="py-4 px-4 md:px-20 flex justify-between">
                <p className="text-3xl font-bold">KuraBox</p>
                <Button asChild size={"lg"} className="bg-[#b8ff4c] text-black cursor-pointer hover:scale-105 font-bold sm:font-semibold sm:text-md " >
                    <Link href={"/onboard"} >Launch App</Link>
                </Button>
            </div>
        </nav>
    );
}