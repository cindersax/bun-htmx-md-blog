import { PostCard } from "./PostCard";

interface postGridProps {
  posts: Post[];
  showMore: boolean;
  limit: number;
  category?: string;
  tag?: string;
}

export function PostGrid(props: postGridProps) {
  const postsHtml = props.posts.map((post) => PostCard(post)).join("");

  let showMoreHtml = "";

  if (props.showMore && props.posts.length === props.limit) {
    const lastPostId = props.posts[props.posts.length - 1].id;
    let queryParams = `cursor=${encodeURIComponent(lastPostId)}&limit=${
      props.limit
    }`;
    if (props.category) {
      queryParams += `&category=${encodeURIComponent(props.category)}`;
    }
    if (props.tag) {
      queryParams += `&tag=${encodeURIComponent(props.tag)}`;
    }

    showMoreHtml = `<button id="show-more"
    hx-get="/postList?${queryParams}"
    hx-trigger="click"
    hx-swap="outerHTML"
    hx-target="#show-more"
    class="md:col-span-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition ease-in-out duration-300 mt-4"
    >Show More</button>

                      `;
  }

  return `${postsHtml}${showMoreHtml}`;
}
