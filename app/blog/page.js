import Link from 'next/link'
export default function Blog(){
    return (
        <div className = "w-full  h-full bg-gray-100">
            <Link href = "/blog/post">
                <button class="w-16 h-16 rounded-full absolute bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white">
                +
                </button>      
            </Link>
        </div>
    )
}