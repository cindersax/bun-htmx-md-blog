import { BaseLayout } from "./BaseLayout";

export function TagLayout(props: Taxonomy) {
  const taxonomyContent = `
    <main class="pt-8 pb-12 max-w-prose mx-auto px-4 md:px-0 md:pt-12">
      <article id="${props.slug}" class="post">
        <header>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Tag: ${props.title}</h1>
        </header>
        <section class="prose prose-lg">
          ${props.description}
        </section>
        <aside class="mt-12">
          <h2 class="text-2xl font-bold mb-4">Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6" hx-get="/postList" hx-trigger="load" hx-vals='{"tag": "${props.slug}"}' ></div>
        </aside>
      </article>
    </main>
    `;
  return BaseLayout(props, taxonomyContent);
}
