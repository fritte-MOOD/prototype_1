"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Drama, Gem, Home, Users, Pickaxe, UserRoundPen, CalendarDays, MessagesSquare, Globe, Key, LucideIcon,SquareCheckBig, Menu, Settings,Volleyball, X, Boxes, Box, Combine, File, BookOpenText, ChartNoAxesCombined, MessageCircleOff, BookKey} from "lucide-react"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <nav className="sticky z-[100] h-14 px-4 top-0 width-full border-b border-gray-200 bg-brand-50 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div onClick={() => router.push("/")} className="h-14 flex items-center font-bold text-lg cursor-pointer">
                        <span className="text-brand-300">/</span>MOOD
                    </div>

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
                            <div onClick={() => router.push("/pages/dashboard")} className="h-14 px-7 flex items-center text-zinc-700 text-[20px] cursor-pointer hover:bg-brand-300">
                               My  Groups
                            </div>
                        </div>
                            

                            {/* Dropdown-Menü (Kein Abstand zwischen Button und Menü) */}
                            {isOpen && (
                                <div 
                                    className="bg-white text-s font-medium leading-6 text-zinc-700 absolute right-30 left-auto shadow-lg top-full text-sm cursor-pointer text-gray-800"
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >   
                                    <div>
                                        <div
                                        className="text-lg flex hover:bg-brand-300 transition gap-x-2 py-2 px-6 cursor-pointer group"
                                        onClick={() => router.push("/settings")}
                                        >
                                        <div className="flex justify-center text-brand-300">
                                            <Volleyball className="self-center text-brand-300 group-hover:text-white transition-colors" />
                                        </div>
                                        Park Club
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Executive Committee
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Women's 2nd Team
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Construction Committee
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Training Organization
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                        className="text-lg flex hover:bg-brand-300 transition gap-x-2 py-2 px-6 cursor-pointer group"
                                        onClick={() => router.push("/settings")}
                                        >
                                        <div className="flex justify-center text-brand-300">
                                            <Drama className="self-center text-brand-300 group-hover:text-white transition-colors" />
                                        </div>
                                        Rochefort
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Women of Rchefort
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Children's Protection
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                        className="text-lg flex hover:bg-brand-300 transition gap-x-2 py-2 px-6 cursor-pointer group"
                                        onClick={() => router.push("/settings")}
                                        >
                                        <div className="flex justify-center text-brand-300">
                                            <Home className="self-center text-brand-300 group-hover:text-white transition-colors" />
                                        </div>
                                        Marin Quarter
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            House 24
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
                                            Handcrafts Friday
                                        </div>
                                        <div  onClick={() => router.push("/settings")} className="py-2 px-6 block hover:bg-brand-300 transition">
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
