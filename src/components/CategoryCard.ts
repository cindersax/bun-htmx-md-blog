type CategoryCardProps = {
  name: string;
  slug: string;
};

export function CategoryCard(props: CategoryCardProps) {
  return `<a  href="${props.slug}" class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 bg-gray-300 hover:bg-gray-400 py-3 px-5 rounded-lg">
              ${props.name}
            </a>`;
}
