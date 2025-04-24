"use client";

import { MaxWidthWrapper } from "./max-width-wrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drama, Home, Volleyball, ChevronRight } from "lucide-react";
import { useGroup } from "@/context/ContextFiles/GroupContext";
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext';
import { useName } from '@/context/ContextFiles/NameContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { groupName, setGroupName } = useGroup();
    const { groupStructure, activateMainAndSubs, activateOnlySub } = useCheckbox();
    const { name, setName } = useName();

    const handleGroupClick = (newGroupName: string) => {
        setGroupName(newGroupName);
        
        // Check if the clicked group is a main group
        const isMainGroup = groupStructure.some(group => group.name === newGroupName);
        
        if (isMainGroup) {
            activateMainAndSubs(newGroupName);
        } else {
            activateOnlySub(newGroupName);
        }
        
        router.push("/about");
    };

    useEffect(() => {
    }, [groupName]);

    const getGroupIcon = (groupName: string) => {
        switch (groupName) {
            case "Park Club":
                return <Volleyball className="self-center text-brand-300 group-hover:text-white" />;
            case "Rochefort":
                return <Drama className="self-center text-brand-300 group-hover:text-white" />;
            case "Marin Quarter":
                return <Home className="self-center text-brand-300 group-hover:text-white" />;
            default:
                return <ChevronRight className="self-center text-brand-300 group-hover:text-white" />;
        }
    };

    const toggleName = () => {
        const newName = name === "Fritz Schmack" ? "Arbnora Kokollari" : "Fritz Schmack";
        setName(newName);
    };

    return (
        <nav className="hidden sm:block sticky z-[100] h-14 px-4 top-0 width-full border-b border-gray-200 bg-white backdrop-blur-lg">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div onClick={() => router.push("/")} className="h-14 flex items-center font-bold text-lg cursor-pointer">
                        <span className="text-brand-300">/</span>MOOD
                    </div>

                    {/* Toggle name button */}
                    <button
                        onClick={toggleName}
                        className="h-10 px-4 bg-brand-300 text-white rounded-md hover:bg-brand-400 transition-colors"
                    >
                        Switch to {name === "Fritz Schmack" ? "Arbnora Kokollari" : "Fritz Schmack"}
                    </button>

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
                                   My Groups
                                </div>
                            </div>
                            
                            {/* Dropdown-Menü */}
                            {isOpen && (
                                <div 
                                    className="bg-brand-0 rounded-md text-s font-medium text-zinc-700 absolute left-auto shadow-lg top-full text-sm cursor-pointer"
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >   
                                    {groupStructure.map((mainGroup) => (
                                        <div key={mainGroup.name}>
                                            <div
                                                className="rounded-md text-lg flex hover:bg-brand-300 gap-x-2 py-2 px-6 cursor-pointer group"
                                                onClick={() => handleGroupClick(mainGroup.name)}
                                            >
                                                <div className="flex justify-center text-brand-300">
                                                    {getGroupIcon(mainGroup.name)}
                                                </div>
                                                {mainGroup.name}
                                            </div>
                                            {mainGroup.subgroups.map((subgroup) => (
                                                <div 
                                                    key={subgroup}
                                                    onClick={() => handleGroupClick(subgroup)} 
                                                    className="py-2 px-6 block hover:bg-brand-300 rounded-md"
                                                >
                                                    {subgroup}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
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