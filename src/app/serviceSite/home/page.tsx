import Image from "next/image";
import Link from "next/link";

export default function ServiceHomePage() {
  return (
    <main className="service-site min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Image
          src="/ssHomeHero.jpg" // replace with actual image path
          alt="Pit Crew Hero"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">PIT CREW</h1>
          <p className="text-lg md:text-xl mb-4 italic">Your Ultimate Track Day Concierge</p>

          <div className="h-px w-3/6 mx-auto accent-bg my-4 mb-7 rounded-full" />

          <Link href="/serviceSite/signIn">
            <button className="accent-bg hover:bg-[#e82e24] px-6 py-2 rounded-md font-semibold text-white">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      
      <div className="h-px w-4/6 mx-auto accent-bg mt-16 rounded-full" />

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 mt-4 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">About Pit Crew</h2>
          <ul className="space-y-7 text-lg leading-relaxed">
            <li>• PitCrew is your track day concierge — so you can focus on driving, not logistics.</li>
            <li>• We handle everything: tires, fluids, transport, and meals. Just show up and race.</li>
            <li>• Built by drivers, for drivers. We live and breathe performance.</li>
          </ul>
        </div>
        <div className="flex-1">
          <Image
            src="/ssHomeAboutPitCrew.jpg" 
            alt="About Pit Crew"
            width={600}
            height={400}
            className="rounded-md object-cover"
          />
        </div>
      </section>

      <div className="h-px w-4/6 mx-auto accent-bg mt-8 rounded-full" />

      {/* Our Crew Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Crew</h2>
        <p className="max-w-2xl mx-auto text-lg mb-10">
          Our crew brings real trackside experience, having worked with professional
          drivers and motorsport teams across Canada.
        </p>
        <Image
          src="/ssHomeOurCrew.jpg" // replace with actual image path
          alt="Our Crew"
          width={800}
          height={500}
          className="mx-auto rounded-md object-cover"
        />
      </section>

      {/* Reviews Placeholder */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-gray-400">Coming soon...</p>
      </section>
    </main>
  );
}