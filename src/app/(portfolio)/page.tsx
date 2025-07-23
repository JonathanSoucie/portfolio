import ProjectCard from "@/app/(portfolio)/components/ProjectCard";

export default function HomePage() {
  const projects = [
    {
      title: "Project 1",
      description: "Service site",
      image: "/placeholder-image.png",
      href: '/serviceSite/home',
    },
    {
      title: "Project 2",
      description: "Game",
      image: "/placeholder-image.png",
      href: "/memoryGame/home",
    },
    {
      title: "Project 3",
      description: "E-Commerce site",
      image: "/placeholder-image.png",
      href: "/eCommerce/home",
    },
    {
      title: "Project 4",
      description: "Analytics",
      image: "/placeholder-image.png",
      href: "/dashboardSite/home",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-2 py-12 font-merriweather text-white">
      <section className="mb-20">
        <h1 className="text-6xl font-raleway mb-4">
          Hi, I&apos;m Jon. I am a Computer Engineer at the University of Ottawa!
        </h1>

        <section className="space-y-4 text-white">
          <h2 className="text-4xl font-raleway my-10">🛠 How I work</h2>
          <p className="text-xl leading-relaxed">
            I enjoy building projects independently — from concept to execution. I
            like taking on challenges that involve both hardware and software,
            allowing me to learn hands-on across the entire stack.
          </p>
          <p className="text-xl leading-relaxed">
            I recently built a workout tracking app using SwiftUI, which helped me
            sharpen my skills in UI/UX design and front-end development for mobile
            platforms.
          </p>
          <p className="text-xl leading-relaxed">
            Currently, I&apos;m working on a custom desk shelf project that blends 3D
            printing, PCB design, and electronics. It&apos;s a perfect example of how I
            enjoy combining creativity, engineering, and practical problem-solving
            to build things that are both functional and uniquely mine.
          </p>
        </section>
      </section>

      <section>
        <h2 className="text-2xl font-raleway mb-6">Projects</h2>
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
