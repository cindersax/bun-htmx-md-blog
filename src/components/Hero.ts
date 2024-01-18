type HeroProps = {
  title: string;
  description: string;
};

export function Hero(props: HeroProps) {
  return `<section class="relative py-20 px-6 md:px-12 bg-gradient-to-r from-[#007aff] to-[#00c6ff]">
              <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-5xl font-bold text-white mb-6">${props.title}</h1>
                <p class="text-xl text-white mb-12">${props.description}</p>
              </div>
            </section>`;
}
