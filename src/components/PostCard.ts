import { Button } from "./Button";

export function PostCard(props: Post) {
  return `<div class="flex flex-col bg-[#f0f0f0] rounded-lg shadow-lg">
            <div class="relative h-0 pb-[66.66%] mb-4 rounded-md overflow-hidden">
              <img alt="Post" class="absolute top-0 left-0 w-full h-full object-cover" height="200" src="${
                props.featuredImage
              }" width="300" style="aspect-ratio: 300 / 200; object-fit: cover;">
            </div>
            <div class="p-4 flex-1 flex flex-col">
              <h2 class="text-2xl font-semibold mb-2">${props.title}</h2>
              <p class="text-lg mb-4 flex-grow">${props.description}</p>

              ${Button({
                text: "Learn More",

                href: props.url,
              })}
            </div>
          </div>`;
}
