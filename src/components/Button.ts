type ButtonProps = {
  text: string;
  href: string;
  className?: string;
};

export function Button(props: ButtonProps) {
  return `<a href="${props.href}" class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-500 hover:bg-blue-700 text-white h-10 px-4 py-2  ${props.className} mt-4">
                ${props.text}
            </a>`;
}
