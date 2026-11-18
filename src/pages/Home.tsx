import { posts } from "../data/posts"
import { Link } from "react-router"

function Home() {
  return (
    <div className="max-w-260 mx-auto px-4 py-6">
      <h1 className="mb-6 font-bold text-2xl">記事一覧</h1>
      {posts.map((post) =>
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-4 border-b border-gray-200">
            <img src={post.thumbnailUrl} alt={`${post.title} thumbnail`} className="w-full h-45 md:h-30 object-cover" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2 items-center">
                <time className="text-sm text-gray-500" dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (<span className="text-sm text-gray-600 bg-gray-300 px-2 py-1 rounded-xl" key={category}>{category}</span>))}
                </div>
              </div>
              <h2 className="font-bold">{post.title}</h2>
              <div className="line-clamp-2 text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Home