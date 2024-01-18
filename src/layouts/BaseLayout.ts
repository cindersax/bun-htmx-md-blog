import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

interface BaseProps {
  title: string;
  description?: string;
}

const NavBarProps = {
  navItems: [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog" },
  ],
  siteTitle: "AI Odyssey 🤖",
};

const footerProps = {
  copyrightText: "© 2024 by AI Odyssey ",
  socialLinks: [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      icon: "<i class='fab fa-facebook'></i>",
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com",
      icon: "<i class='fab fa-twitter'></i>",
    },
  ],
};

export function BaseLayout(props: BaseProps, content: string) {
  const metaDescription = props.description || "Default site description";

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="${metaDescription}">
          <link href="/styles.css" rel="stylesheet">
          <script src="https://unpkg.com/htmx.org@1.9.10"></script>
          <title>${props.title}</title>
          <!-- Additional meta tags and links (e.g., stylesheets, favicon) -->
        </head>
        <body>
          ${NavBar(NavBarProps)}
          ${content}
          ${Footer(footerProps)}
        </body>
        </html>
      `;
}
