import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <main className="flex items-center justify-center min-h-screen font-sans text-base subpixel-antialiased text-gray-700 bg-background">
            <Outlet/>
        </main>
    )
}