interface Post {
  title: string;
  content: string;
  id: string;
  slug: string;
  url: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  featuredImage?: string;
}

interface Taxonomy {
  id: string;
  title: string;
  description: string;
  url: string;
  posts: Post[];
  slug: string;
}
