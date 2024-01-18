import { generateSlug } from "../utils";
import { BaseLayout } from "./BaseLayout";

export function PostLayout(props: Post) {
  const author = props.author || "Default author";
  const tagsElements = props.tags
    .map(
      (tag) =>
        `<a  href="/tag/${generateSlug(
          tag
        )}"class="text-blue-900 hover:text-blue-800 bg-blue-200 px-2 rounded">${tag}</a>`
    )
    .join(" ");

  const figureElement = props.featuredImage
    ? `<figure class="mb-8 bg-slate-300">
         <img class="w-full h-64 md:h-96 object-cover rounded-md" src="${props.featuredImage}" alt="Featured" />
       </figure>`
    : "";

  const postContent = `
    <main class="pt-8 pb-12 max-w-prose mx-auto px-4 md:px-0 md:pt-12">
      <article id="${props.id}" class="post">
        ${figureElement}
        <header>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">${props.title}</h1>
          <div class="flex items-center space-x-2 text-gray-500">
            <span>${author}</span>
            <span>•</span>
            <span>${props.date}</span>
          </div>
          <div class="mt-2 space-x-2">
            <span class="text-gray-600">Tags:</span>
            ${tagsElements}
          </div>
        </header>
        <section class="prose prose-lg">
          ${props.content}
        </section>
        <aside class="mt-12">
          <h2 class="text-2xl font-bold mb-4">Related Posts</h2>
          <div hx-get="/postList?limit=4&cursor=${props.id}&showMore=false" hx-trigger="load" class="grid grid-cols-1 md:grid-cols-2 gap-6" ></div>
        </aside>
      </article>
    </main>
  `;

  return BaseLayout(props, postContent);
}
