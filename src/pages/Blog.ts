import { BaseLayout } from "../layouts/BaseLayout";
import { Hero } from "../components/Hero";
import { Button } from "../components/Button";

interface BlogProps {
  title: string;
  description: string;
}

export function BlogLayout(props: BlogProps) {
  const postContent = `
        <main class=" pb-12 w-full mx-auto px-4 md:px-0">
            <article class="post">
            ${Hero(props)}
            <section class="mt-12 max-w-4xl mx-auto flex flex-col">
                <h2 class="text-2xl font-bold mb-4">blog</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6" hx-swap="innerHTML" hx-get="/postList?limit=6" hx-trigger="load" ></div>
            </section>
            <section class="mt-12 max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4">Categories</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6" hx-swap="innerHTML" hx-get="/categoryList" hx-trigger="load" ></div>
        </section>
            </article>
        </main>
        `;

  return BaseLayout(props, postContent);
}
