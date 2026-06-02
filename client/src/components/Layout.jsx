import Sidebar from './Sidebar';
import RightPanel from './RightPanel';

export default function Layout({ children }) {
    return (
        <div className="flex justify-center min-h-screen max-w-7xl mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 border-x border-[var(--color-border-color)] max-w-2xl sm:ml-20 xl:ml-64 pb-20 sm:pb-0 relative z-10">
                {children}
            </main>
            <RightPanel />
        </div>
    );
}
