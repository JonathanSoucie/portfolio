'use client';

import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

export default function ProjectCard({ title, description, image, href }: ProjectCardProps) {
  const cardContent = (
    <div className="flex w-full flex-col md:flex-row items-start justify-between bg-card rounded-xl shadow-lg p-6 md:p-8 gap-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-200">
      <div className="flex-1">
        <h3 className="text-2xl font-raleway font-semibold mb-2">{title}</h3>
        <p className="text-base text-white leading-relaxed font-merriweather">{description}</p>
      </div>
      <div className="w-full md:w-[200px] flex-shrink-0">
        <Image
          src={image}
          alt={`${title} image`}
          width={160}
          height={160}
          className="rounded-lg object-cover w-full h-auto"
        />
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="w-full no-underline text-inherit">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
