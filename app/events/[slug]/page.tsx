import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
    },
  } = await request.json();

  if (!description) return notFound();
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        {/* L side */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} />

          <section className="flex-col-gap-2">
            <h2>OverView</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>vent Details</h2>
          </section>
        </div>
        {/* R side */}
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailsPage;
