"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 width-full border-b border-gray-200 bg-brand-50 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between p-4 font-bold text-lg text-zinc-800">
                    {/* Logo */}
                    <div className="flex gap-4">
                        <Link href="/pages/dashboard" className="flex z-40 font-bold text-lg">
                            <span className="text-brand-300">/</span>YourPlatform
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        {/* Dropdown-Menü für Groups */}
                        <div>
                            <div className="pb-4"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}>
                                <button className="font-normal text-[22px]">
                                    Groups
                                </button>
                            </div>
                            

                            {/* Dropdown-Menü (Kein Abstand zwischen Button und Menü) */}
                            {isOpen && (
                                <div 
                                    className="absolute right-20 left-auto top-full"
                                    onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                >
                                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Profil
                                    </Link>
                                    <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Einstellungen
                                    </Link>
                                    <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Weiterer Navigationslink */}
                        <Link href="/pages/dashboard" className="font-normal text-[22px]">
                            Settings
                        </Link>
                    </div>
                </nav>
            </MaxWidthWrapper>
        </nav>
    );
};
