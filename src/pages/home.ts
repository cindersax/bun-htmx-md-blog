import { BaseLayout } from "../layouts/BaseLayout";
import { Hero } from "../components/Hero";
import { Button } from "../components/Button";

interface homeProps {
  title: string;
  description: string;
}

export function HomeLayout(props: homeProps) {
  const postContent = `
        <main class=" pb-12 w-full mx-auto px-4 md:px-0">
            <article class="post">
            ${Hero(props)}
            <section class="mt-12 max-w-4xl mx-auto flex flex-col">
                <h2 class="text-2xl font-bold mb-4">LastestPosts</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6" hx-swap="innerHTML" hx-get="/postList?limit=3&showMore=false" hx-trigger="load" ></div>
                ${Button({
                  text: "View All Posts",
                  href: "/blog",
                  className: "self-center mt-8",
                })}
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
