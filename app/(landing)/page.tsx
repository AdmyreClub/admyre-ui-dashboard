import { redirect } from 'next/navigation';
function isLoggedIn() {

}
export default async function Home() {
    console.log(isLoggedIn());
  
    redirect('/login');
  // ...
}
