"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drama, Home, Volleyball } from "lucide-react";
import { useGroup } from "@/context/GroupContext"; // Import the useGroup hook

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { groupName, setGroupName } = useGroup(); // Use the setGroupName function from GroupContext

    const handleGroupClick = (newGroupName: string) => {
        setGroupName(newGroupName);
        router.push("/about");
    };

    useEffect(() => {
        console.log("Current group name:", groupName);
    }, [groupName]);

    return (
        <nav className="hidden sm:block sticky z-[100] h-14 px-4 top-0 width-full border-b border-gray-200 bg-white backdrop-blur-lg">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div onClick={() => router.push("/")} className="h-14 flex items-center font-bold text-lg cursor-pointer">
                        <span className="text-brand-300">/</span>MOOD
                    </div>

                    {/* Debug output */}
                    <div>Current Group: {groupName}</div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        {/* Dropdown-Menü für Groups */}
                        <div>
                            <div 
                                className="relative"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                {/* Button */}
                                <div onClick={() => router.push("/dashboard")} className="rounded-md h-14 px-7 flex items-center text-zinc-700 text-[20px] cursor-pointer hover:bg-brand-300">
                                   My  Groups
                                </div>
                            </div>
                            

                            {/* Dropdown-Menü (Kein Abstand zwischen Button und Menü) */}
                            {isOpen && (
                                <div 
                                    className="bg-brand-0 rounded-md text-s font-medium text-zinc-700 absolute left-auto shadow-lg top-full text-sm cursor-pointer"
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >   
                                    <div>
                                        <div
                                            className="rounded-md text-lg flex hover:bg-brand-300 gap-x-2 py-2 px-6 cursor-pointer group"
                                            onClick={() => handleGroupClick("Park Club")}
                                        >
                                            <div className="flex justify-center text-brand-300">
                                                <Volleyball className="self-center text-brand-300 group-hover:text-white" />
                                            </div>
                                            Park Club
                                        </div>
                                        <div onClick={() => handleGroupClick("Executive Committee")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Executive Committee
                                        </div>
                                        <div onClick={() => handleGroupClick("2nd Senior Team")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            2nd Senior Team
                                        </div>
                                        <div onClick={() => handleGroupClick("Construction Committee")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Construction Committee
                                        </div>
                                        <div onClick={() => handleGroupClick("Training Organization")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Training Organization
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="rounded-md text-lg flex hover:bg-brand-300 gap-x-2 py-2 px-6 cursor-pointer group"
                                            onClick={() => handleGroupClick("Rochefort")}
                                        >
                                            <div className="flex justify-center text-brand-300">
                                                <Drama className="self-center text-brand-300 group-hover:text-white" />
                                            </div>
                                            Rochefort
                                        </div>
                                        <div onClick={() => handleGroupClick("Parents of Rochefort")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Parents of Rochefort
                                        </div>
                                        <div onClick={() => handleGroupClick("Sports in Rochefort")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Sports in Rochefort
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="rounded-md text-lg flex hover:bg-brand-300 gap-x-2 py-2 px-6 cursor-pointer group"
                                            onClick={() => handleGroupClick("Marin Quarter")}
                                        >
                                            <div className="flex justify-center text-brand-300">
                                                <Home className="self-center text-brand-300 group-hover:text-white" />
                                            </div>
                                            Marin Quarter
                                        </div>
                                        <div onClick={() => handleGroupClick("House 24")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            House 24
                                        </div>
                                        <div onClick={() => handleGroupClick("Handcrafts Friday")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Handcrafts Friday
                                        </div>
                                        <div onClick={() => handleGroupClick("Shared Dinner")} className="py-2 px-6 block hover:bg-brand-300 rounded-md">
                                            Shared Dinner
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div onClick={() => router.push("/settings")} className="h-14 px-7 flex items-center text-zinc-700 text-[20px] cursor-pointer hover:bg-brand-300">
                            Settings
                        </div>
                    </div>
                </nav>
            </MaxWidthWrapper>
        </nav>
    );
};