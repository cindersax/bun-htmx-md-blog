// Constant
const PORT = process.env.PORT || 3001;
const MD_FILE_PATH = "src/pages/post/*.md";
const PUBLIC_FILE_PATH = "/public/*";
const BLOG_PREFIX = "/blog";
const TAG_PREFIX = "/tag";
const CATEGORY_PREFIX = "/category";
const DEFAULT_TITLE = "Default Title";
const DEFAULT_DESCRIPTION = "Optional Description";
const DEFAULT_AUTHOR = "Author Name";
const DEFAULT_DATE = "Unknown Date";
const DEFAULT_CATEGORY = "Uncategorized";
const DEFAULT_FEATURED_IMAGE = "";
const RESPONSE_NOT_FOUND = "404 Not Found";
const RESPONSE_SERVER_ERROR = "Error occurred";
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;
const POST_LIST_PATH = "/postList";
const CATEGORY_LIST_PATH = "/categoryList";
const HOME_PATH = "/";
const BLOG_PAGE_PATH = "/blog";
const DEFAULT_LIMIT = "10";
const SHOW_MORE_PARAM = "showMore";
const CATEGORY_PARAM = "category";
const TAG_PARAM = "tag";
const CURSOR_PARAM = "cursor";
const LIMIT_PARAM = "limit";

// Code
import { Glob } from "bun";
import { PostLayout } from "./layouts/PostLayout";
import { generateSlug, mdToHtmlAndMetadata } from "./utils";
import { serveCss, servePublicFile } from "./fileServer";
import { CategoryLayout } from "./layouts/CategoryLayout";
import { TagLayout } from "./layouts/TagLayout";
import { HomeLayout } from "./pages/home";
import { PostGrid } from "./components/PostGrid";
import { CategoryGrid } from "./components/CategoryGrid";
import { BlogLayout } from "./pages/Blog";

let postsSet = new Set<Post>();
let tagsSet = new Set<Taxonomy>();
let categoriesSet = new Set<Taxonomy>();

async function initPosts(markdownFileGlob: Glob) {
  for await (const markdownFilePath of markdownFileGlob.scan(".")) {
    const fileWithExt = markdownFilePath.split("/").pop();
    if (!fileWithExt) {
      continue;
    }

    const fileNoExt = fileWithExt.replace(".md", "");
    const postSlug = generateSlug(fileNoExt);
    const postUrl = `${BLOG_PREFIX}/${postSlug}`;

    const { html, metadata } = await mdToHtmlAndMetadata(markdownFilePath);

    const postId = crypto.randomUUID();

    const postProps: Post = {
      title: metadata.title || DEFAULT_TITLE,
      content: html,
      id: metadata.id || postId,
      slug: postSlug,
      url: postUrl,
      description: metadata.description || DEFAULT_DESCRIPTION,
      author: metadata.author || DEFAULT_AUTHOR,
      date: metadata.date || DEFAULT_DATE,
      tags: metadata.tags || [],
      category: metadata.category || DEFAULT_CATEGORY,
      featuredImage: metadata.featuredImage || DEFAULT_FEATURED_IMAGE,
    };

    postsSet.add(postProps);

    postProps.tags.forEach((tagName) => {
      const tagSlug = generateSlug(tagName);
      const tagUrl = `${TAG_PREFIX}/${tagSlug}`;

      const tagId = crypto.randomUUID();

      let tag = Array.from(tagsSet).find((t) => t.slug === tagUrl);
      if (!tag) {
        tag = {
          id: tagId,
          title: tagName,
          slug: tagSlug,
          url: tagUrl,
          description: "",
          posts: [],
        };
        tagsSet.add(tag);
      }
      tag.posts.push(postProps);
    });

    const categorySlug = generateSlug(postProps.category);
    const categoryUrl = `${CATEGORY_PREFIX}/${categorySlug}`;

    const categoryId = crypto.randomUUID();

    let category = Array.from(categoriesSet).find((c) => c.url === categoryUrl);
    if (!category) {
      category = {
        id: categoryId,
        title: postProps.category,
        slug: categorySlug,
        url: categoryUrl,
        description: "",
        posts: [],
      };
      categoriesSet.add(category);
    }
    category.posts.push(postProps);
  }
}

async function servePost(filePath: string): Promise<Response | null> {
  for (const post of postsSet) {
    if (filePath === `${post.url}`) {
      const postPage = PostLayout(post);
      return new Response(postPage, {
        headers: { "Content-Type": "text/html" },
      });
    }
  }
  return null;
}

async function serveCategories(filePath: string): Promise<Response | null> {
  for (const category of categoriesSet) {
    if (filePath === `${category.url}`) {
      const categoryPage = CategoryLayout(category);
      return new Response(categoryPage, {
        headers: { "Content-Type": "text/html" },
      });
    }
  }

  return null;
}

async function serveTags(filePath: string): Promise<Response | null> {
  for (const tag of tagsSet) {
    if (filePath === `${tag.url}`) {
      const tagPage = TagLayout(tag);
      return new Response(tagPage, {
        headers: { "Content-Type": "text/html" },
      });
    }
  }

  return null;
}

async function servePostList(
  filePath: string,
  queryParams: URLSearchParams
): Promise<Response | null> {
  if (filePath === POST_LIST_PATH) {
    let filteredPosts = Array.from(postsSet);

    const category = queryParams.get(CATEGORY_PARAM);
    if (category && category.trim() !== "") {
      const categorySlug = generateSlug(category);
      const categoryObj = Array.from(categoriesSet).find(
        (c) => generateSlug(c.title) === categorySlug
      );
      if (categoryObj) {
        filteredPosts = filteredPosts.filter((post) =>
          post.category.includes(categoryObj.title)
        );
      } else {
        filteredPosts = [];
      }
    }

    const tag = queryParams.get(TAG_PARAM);
    if (tag && tag.trim() !== "") {
      const tagSlug = generateSlug(tag);
      const tagObj = Array.from(tagsSet).find(
        (t) => generateSlug(t.title) === tagSlug
      );
      if (tagObj) {
        filteredPosts = filteredPosts.filter((post) =>
          post.tags.includes(tagObj.title)
        );
      } else {
        filteredPosts = [];
      }
    }

    const cursor = queryParams.get(CURSOR_PARAM);
    const limit = parseInt(queryParams.get(LIMIT_PARAM) || DEFAULT_LIMIT, 10);

    if (cursor) {
      const cursorIndex = filteredPosts.findIndex((post) => post.id === cursor);
      if (cursorIndex >= 0) {
        filteredPosts = filteredPosts.slice(
          cursorIndex + 1,
          cursorIndex + 1 + limit
        );
      } else {
        filteredPosts = [];
      }
    } else {
      filteredPosts = filteredPosts.slice(0, limit);
    }

    const showMore = queryParams.get(SHOW_MORE_PARAM) !== "false";

    const postGridProps = {
      posts: filteredPosts,
      showMore,
      limit,
      ...(category && { category }),
      ...(tag && { tag }),
    };

    const postGridHtml = PostGrid(postGridProps);
    return new Response(postGridHtml, {
      headers: { "Content-Type": "text/html" },
    });
  }

  return null;
}

async function serveCategorieList(filePath: string): Promise<Response | null> {
  if (filePath === CATEGORY_LIST_PATH) {
    const filteredCategories = Array.from(categoriesSet);

    const postGridHtml = CategoryGrid({ categories: filteredCategories });
    return new Response(postGridHtml, {
      headers: { "Content-Type": "text/html" },
    });
  }
  return null;
}

async function serveHome(filePath: string): Promise<Response | null> {
  if (filePath === HOME_PATH) {
    return new Response(
      HomeLayout({
        title: "AI Odyssey",
        description:
          "AI Odyssey is a journey into the heart of artificial intelligence.",
      }),
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  }
  return null;
}

async function serveBlogPage(filePath: string): Promise<Response | null> {
  if (filePath === BLOG_PAGE_PATH) {
    return new Response(
      BlogLayout({
        title: "AI Blog",
        description:
          "This blog aims to explore the timeless aspects of AI, delving into its foundations, current applications, and future potential",
      }),
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  }
  return null;
}

const markdownFileGlob = new Glob(MD_FILE_PATH);
initPosts(markdownFileGlob);

const blogServer = Bun.serve({
  port: PORT,
  async fetch(req: Request) {
    try {
      const requestUrl = new URL(req.url);

      return (
        (await serveCss(requestUrl.pathname)) ||
        (await servePublicFile(
          requestUrl.pathname,
          new Glob(PUBLIC_FILE_PATH)
        )) ||
        (await servePost(requestUrl.pathname)) ||
        (await servePostList(requestUrl.pathname, requestUrl.searchParams)) ||
        (await serveCategorieList(requestUrl.pathname)) ||
        (await serveCategories(requestUrl.pathname)) ||
        (await serveTags(requestUrl.pathname)) ||
        (await serveHome(requestUrl.pathname)) ||
        (await serveBlogPage(requestUrl.pathname)) ||
        new Response(RESPONSE_NOT_FOUND, { status: STATUS_NOT_FOUND })
      );
    } catch (error) {
      console.error("Error in server fetch:", error);
      return new Response(RESPONSE_SERVER_ERROR, {
        status: STATUS_SERVER_ERROR,
      });
    }
  },
});

console.log(`Blog server on localhost:${blogServer.port}`);
