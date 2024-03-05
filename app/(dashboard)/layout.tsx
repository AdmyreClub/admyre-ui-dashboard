import Navbar  from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { auth } from '@clerk/nextjs';
import { AuthProvider } from '@/app/context/AuthContext';
import { getApiLimitCount } from '@/lib/api-limit';
const DashboardLayout = async (
    {
        children
    } : {
        children : React.ReactNode;
    }
) => {
    const {userId} = auth();
    const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
        <AuthProvider userId={userId}>
        <div className="hidden h-full md:flex md:flex-col md:w-72 fixed md:inset-y-0 bg-gray-900">
            <Sidebar apiLimitCount={apiLimitCount}/>
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
