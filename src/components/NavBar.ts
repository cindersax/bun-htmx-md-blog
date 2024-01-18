interface NavBarProps {
  navItems: { title: string; url: string }[];
  siteLogoUrl?: string;
  siteTitle?: string;
}

export function NavBar(props: NavBarProps) {
  const navigationLinks = props.navItems
    .map(
      (item) =>
        `<a href="${item.url}" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">${item.title}</a>`
    )
    .join(" ");

  const logoOrTitle = props.siteLogoUrl
    ? `<img class="h-8 w-auto" src="${props.siteLogoUrl}" alt="Your Logo">`
    : `<span class="text-xl font-semibold">${
        props.siteTitle || "Default Site Title"
      }</span>`;

  const headerContent = `
        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex-1 flex justify-center items-center">
                ${logoOrTitle}
              </div>
              <div class="flex-1 flex justify-center items-center">
                <nav class="flex space-x-8">
                  ${navigationLinks}
                </nav>
              </div>
              <div class="flex-1"></div>
            </div>
          </div>
        </header>
      `;

  return headerContent;
}
