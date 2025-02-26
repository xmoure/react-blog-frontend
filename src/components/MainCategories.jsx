import { Link } from "react-router-dom"
import Search from "./Search"

const MainCategories = () => {
    return (
        <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
            {/* links */}
            <div className="flex-1 items-center justify-between flex-wrap">
                <Link to="/posts" className="bg-blue-800 text-white rounded-full py-2 px-4">All posts</Link>
                <Link to="/posts?cat=web-design" className="hover:bg-blue-50 rounded-full py-2 px-4">Web Design</Link>
                <Link to="/posts?cat=development" className="hover:bg-blue-50 rounded-full py-2 px-4">Development</Link>
                <Link to="/posts?cat=search-engines" className="hover:bg-blue-50 rounded-full py-2 px-4">Search Engines</Link>
                <Link to="/posts?cat=marketing" className="hover:bg-blue-50 rounded-full py-2 px-4">Marketing</Link>
            </div>
            <span className="text-xl font-medium">|</span>
            <Search />
        </div>
    )
}

export default MainCategories
