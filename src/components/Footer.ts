interface FooterProps {
  copyrightText?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  socialLinks?: { name: string; url: string; icon: string }[];
}

export function Footer(props: FooterProps) {
  const socialLinksElements = props.socialLinks
    ? props.socialLinks
        .map(
          (link) =>
            `<a href="${link.url}" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                <span class="sr-only">${link.name}</span>
                ${link.icon} <!-- Replace with actual icon representation -->
              </a>`
        )
        .join(" ")
    : "";

  const footerContent = `
      <footer class="bg-white shadow mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div>
              ${
                props.privacyPolicyUrl
                  ? `<a href="${props.privacyPolicyUrl}" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Privacy Policy</a>`
                  : ""
              }
              ${
                props.termsOfServiceUrl
                  ? `<a href="${props.termsOfServiceUrl}" class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">Terms of Service</a>`
                  : ""
              }
            </div>
            <div>
              ${socialLinksElements}
            </div>
            <div>
              <p class="text-gray-600 text-sm">${
                props.copyrightText || "© 2024 Your Company"
              }</p>
            </div>
          </div>
        </div>
      </footer>
    `;

  return footerContent;
}
