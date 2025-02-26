import { useEffect, useState } from 'react'
import Image from './Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {getToken} = useAuth();

    useEffect(() => {
        getToken().then((token) => console.log("token", token));
    }, [getToken])

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            <Link to="/" className='flex items-center gap-4 text-2xl font-bold'>
                <Image description="img logo" src="logo.png" width={32} height={32} />
                <span>Logo</span>
            </Link>
            {/* MOBILE MENU */}
            <div className='md:hidden'>
                {/* MOBILE BUTTON */}
                <div className='cursor-pointer text-2xl' onClick={() => setOpen((prev) => !prev)}>
                    {open ? "X" : "☰"}
                </div>
                {/* MOBILE LINK LIST */}
                <div className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 gap-8 font-medium text-lg transition-all ease-in-out ${open ? '-right-0' : '-right-[100%]'}`}>
                    <Link to='/'>Home</Link>
                    <Link to='/'>Trending</Link>
                    <Link to='/'>Most popular</Link>
                    <Link to='/'>About</Link>
                    <Link to='/'>
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'> Login 👋</button>
                    </Link>
                </div>
            </div>
            {/* DESKTOP MENU */}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                <Link to='/'>Home</Link>
                <Link to='/'>Trending</Link>
                <Link to='/'>Most popular</Link>
                <Link to='/'>About</Link>
                <SignedOut>
                    <Link to='/login'>
                        <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'> Login 👋</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

        </div>
    )
}

export default Navbar;
