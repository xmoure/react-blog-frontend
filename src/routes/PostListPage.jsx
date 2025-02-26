import { useState } from 'react'
import PostsList from '../components/PostsList'
import SideMenu from '../components/SideMenu'

const PostListPage = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className=''>
            <h1 className='text-2xl mb-8 '> Development Blog</h1>
            <button className='bg-blue-800 md:hidden text-sm tex-white px-4 py-2 rounded-2xl mb-4' onClick={() => setOpen((prev) => !prev)}>{open ? "Close" : "Filter or Search"}</button>
            <div className='flex flex-col-reverse gap-8 md:flex-row'>
                <div className=''>
                    <PostsList />
                </div>
                <div className={`${open ? "block" : "hidden"} md:block`}>
                    <SideMenu />
                </div>
            </div>
        </div>
    )
}

export default PostListPage
