export const dynamic = "force-dynamic";

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import events from "@/lib/constants";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  let fetchedEvents: IEvent[] = [];

  if (!BASE_URL) {
    console.error("BASE_URL is not defined");
    return null;
  }

  try {
    // Abort after 5 seconds (5000ms)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${BASE_URL}/api/events`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      fetchedEvents = data.events || [];
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Fetch request timed out or failed:", errorMessage);
  }

  return (
    <section>
      <h1 className="text-center">
        The Hub For Every DEV Event <br /> You Must&apos;nt MISS
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meet&Greet, Conferences, All in one place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {fetchedEvents &&
            fetchedEvents.length > 0 &&
            fetchedEvents.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
