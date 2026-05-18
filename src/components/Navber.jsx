import Image from 'next/image';
import Link from 'next/link';

const Navber = () => {
    return (
        <nav className='flex justify-between p-5'>
            <div>
               <h1 className='font-bold text-3xl'><span className='text-cyan-300'>Doc</span>Appoint</h1>
            </div>

            <ul className='flex gap-4'>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/destinations"}>All Appointment</Link></li>
                <li><Link href={"/my-bookings"}>Dashbord</Link></li>
            </ul>


            <ul className='flex gap-4'>
                <li><Link href={"/login"}>Login</Link></li>
                <li><Link href={"/signup"}>Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Navber;