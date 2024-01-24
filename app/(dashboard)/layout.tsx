import Navbar  from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { auth } from '@clerk/nextjs';
import { AuthProvider } from '@/app/context/AuthContext';
const DashboardLayout = (
    {
        children
    } : {
        children : React.ReactNode;
    }
) => {
    const {userId} = auth();
  return (
    <div className="h-full relative">
        <AuthProvider userId={userId}>
        <div className="hidden h-full md:flex md:flex-col md:w-72 fixed md:inset-y-0 bg-gray-900">
            <Sidebar />
        </div>
        <main className="md:pl-72">
            <Navbar />
            {children}
        </main>
        </AuthProvider>
    </div>
  )
}

export default DashboardLayout
