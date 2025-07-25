import React from "react";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <nav>
            <div className="py-4 px-20 flex justify-between">
                <p className="text-3xl font-bold">KuraBox</p>
                <Button size={"lg"} className="bg-[#b8ff4c] text-black cursor-pointer hover:scale-105" >Launch App</Button>
            </div>
        </nav>
    );
}