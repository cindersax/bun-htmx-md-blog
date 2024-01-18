import { CategoryCard } from "./CategoryCard";

type CategoryGridProps = {
  categories: Taxonomy[];
};

export function CategoryGrid(props: CategoryGridProps) {
  const categoriesHtml = props.categories
    .map((category) =>
      CategoryCard({ name: category.title, slug: category.url })
    )
    .join("");
  return categoriesHtml;
}
