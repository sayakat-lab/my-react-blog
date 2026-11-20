import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Post } from "../types/posts";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const fetcher = async () => {
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
          {
            signal: controller.signal,
          },
        );
        if (res.status === 404) return;
        if (!res.ok) throw new Error("記事を取得できませんでした");
        const data: { post: Post } = await res.json();
        setPost(data.post);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e instanceof Error ? e.message : "通信に失敗しました");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void fetcher();
    return () => controller.abort();
  }, [id]);
  if (error) {
    return <div className="max-w-200 mx-auto px-4 py-6">{error}</div>;
  }
  if (loading) {
    return <div className="max-w-200 mx-auto px-4 py-6">読み込み中です</div>;
  }
  if (!post) {
    return (
      <div className="max-w-200 mx-auto px-4 pt-6 pb-12 flex flex-col gap-4">
        <p>記事がありません</p>
        <Link to="/" className="text-blue-600">
          記事一覧へもどる
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-200 mx-auto px-4 pt-6 pb-12 flex flex-col gap-4">
      <img
        src={post.thumbnailUrl}
        alt={`${post.title} thumbnail`}
        className="w-full"
      />
      <div className="flex flex-wrap gap-2 items-center">
        <time className="text-gray-500" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <span
              className="text-sm text-gray-600 bg-gray-300 px-2 py-1 rounded-xl"
              key={category}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <h1 className="font-bold text-[1.8rem]">{post.title}</h1>
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Link to="/" className="text-blue-600 mt-4">
        記事一覧へもどる
      </Link>
    </div>
  );
}

export default PostDetail;
