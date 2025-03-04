import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";


export const Navbar = () => {
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 width-full border-b  border-gray-200 bg-brand-50 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between p-4 font-bold text-lg text-zinc-800">
                    <div className="flex gap-4">
                        <Link href="/pages/dashboard" className="flex z-40 font-bold text-lg">
                            <span className="text-brand-300">/</span>YourPlatform
                        </Link>
                    </div>
                    
                    <div className="flex gap-4">
                    <Link href="/pages/dashboard" className="z-40">
                    Groups
                    </Link>

                    <Link href="/pages/dashboard" className="z-40">
                    Settings
                    </Link>
                    </div>

                </nav>
            </MaxWidthWrapper>
        </nav>
    )
}