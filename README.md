# Markdown Blog with Bun and HTMX

## Introduction

Welcome to our Markdown Blog project! This repository showcases how to build a blog platform using Markdown for content, Bun as the backend runtime, and HTMX for dynamic frontend interactions. It's a perfect example for those looking to integrate these technologies in a web application.

## Key Features

- **Markdown Content**: Write and manage your blog posts easily in Markdown format.
- **Bun Backend**: Experience the speed and simplicity of Bun, a modern JavaScript runtime.
- **Dynamic Frontend with HTMX**: Enhance user interactions dynamically with HTMX, without complex JavaScript frameworks.
- **Tailwind CSS**: Utilize Tailwind CSS and its typography plugin for stylish, utility-first designs.

## Tech Stack

- **Backend**: Bun (JavaScript runtime)
- **Markdown Processing**: `gray-matter`, `marked`
- **Image Processing**: `sharp`
- **Styling**: Tailwind CSS with `@tailwindcss/typography`
- **Frontend**: HTMX for asynchronous content loading

## Pre-requisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone [your-repository-link]
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd [project-directory]
   ```
3. **Install Dependencies with Bun**
   ```bash
   bun install
   ```

## Running the Project

- **Development Mode**: Start the server in development mode with hot-reload by running:
  ```bash
  bun run dev
  ```
- **Production Build**: Compile the server-side code for production with:
  ```bash
  bun run build
  ```

## JavaScript Dependency Note

This project uses HTMX on the frontend for dynamically loading blog posts. Please note that the post list will not render if JavaScript is disabled in the browser.

## Contributing

Interested in contributing? Great! We welcome any contributions, from bug fixes to feature enhancements. Fork the repository, make your changes, and submit a pull request.

## License

This project is released under the MIT License.
