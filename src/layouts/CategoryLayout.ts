import { BaseLayout } from "./BaseLayout";

export function CategoryLayout(props: Taxonomy) {
  const taxonomyContent = `
    <main class="pt-8 pb-12 max-w-prose mx-auto px-4 md:px-0 md:pt-12">
      <article id="${props.slug}" class="post">
        <header>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Category: ${props.title}</h1>
        </header>
        <section class="prose prose-lg">
          ${props.description}
        </section>
        <aside class="mt-12">
          <h2 class="text-2xl font-bold mb-4">Posts</h2>

          <div  hx-swap="innerHTML" hx-get="/postList?limit=4&category=${props.slug}" hx-trigger="load" class="grid grid-cols-1 md:grid-cols-2 gap-6" ></div>
        </aside>
      </article>
    </main>
    `;
  return BaseLayout(props, taxonomyContent);
}
