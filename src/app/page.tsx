import Head from "next/head";
import ical from "node-ical";
import { format } from "date-fns";
import { aiFringeIcalURL } from "./const";

async function getData() {
  const cal = await ical.async.fromURL(aiFringeIcalURL);
  const _events = Object.values(cal);

  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const events = _events
    .filter((event: any) => {
      return !!event.summary && event.start.valueOf() >= today.valueOf(); // && event.summary.toLowerCase().includes("fringe");
    })
    .map((event: any) => {
      const [firstLine, ...descLines] = event.description.split("\n");
      const description = descLines.join("\n");
      const eventUrl = "http" + firstLine.split("http")[1];
      event.description = description.trim();
      event.url = eventUrl;

      return event;
    });

  return { events };
}

export default async function Home() {
  const { events } = await getData();

  return (
    <main>
      <title>AI Fringe</title>
      <meta name="title" content="AI Safety Summit Fringe" />
      <meta name="description" content="AI Safety Summit Fringe." />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aifringe.uk/" />
      <meta property="og:title" content="AI Safety Summit Fringe" />
      <meta property="og:description" content="UK AI Summit Fringe." />
      <meta property="og:image" content="/social-banner.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://aifringe.uk/" />
      <meta property="twitter:title" content="AI Safety Summit Fringe" />
      <meta property="twitter:description" content="AI Safety Summit Fringe" />
      <meta property="twitter:image" content="/social-banner.png" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <Head>
        <script
          async
          defer
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
        <noscript>
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </Head>
      <div className="w-full sm:border-t-8 border-off_green">
        <header className="flex flex-col items-center justify-between w-full max-w-4xl pb-6 mx-auto mb-0 bg-off_green sm:mb-8 sm:pb-0 sm:flex-row sm:bg-transparent">
          <h1 className="relative mx-auto mt-12 text-2xl font-normal font-header sm:mx-0">
            <span className="relative z-10 px-2 py-1 sm:text-white text-off_green">
              AI Fringe
            </span>
            <span className="absolute inset-0 z-0 transform bg-white text-off_green sm:bg-off_green -rotate-6"></span>
          </h1>

          <div className="items-center hidden space-x-3 sm:flex">
            <a
              href="#about"
              className="px-3 py-3 pt-12 hover:bg-off_green hover:text-white"
            >
              About
            </a>
          </div>

          <div className="flex flex-row w-full px-4 mt-8 space-x-2 sm:hidden">
            <p className="w-full">
              <a
                href="https://chat.whatsapp.com/LuWcWtD04YM3DJTULmn2Fs"
                target="_blank"
                className="block w-full p-2 text-sm font-medium text-center bg-white rounded-md text-off_green font-header"
              >
                Join
              </a>
            </p>

            <p className="w-full">
              <a
                href="https://lu.ma/ldn"
                target="_blank"
                className="block w-full p-2 text-sm font-medium text-center bg-white rounded-md text-off_green font-header"
              >
                Attend
              </a>
            </p>

            <p className="w-full">
              <a
                href="https://chat.whatsapp.com/CZGKvlhEWgcE2gbL0mJd5o"
                target="_blank"
                className="block w-full p-2 text-sm font-medium text-center bg-white rounded-md text-off_green font-header"
              >
                Submit
              </a>
            </p>
          </div>
        </header>

        <div className="hidden max-w-6xl grid-cols-12 px-4 pt-0 mx-auto mt-0 text-left sm:grid sm:mt-20 sm:pt-0">
          <main className="col-span-full">
            <h3 className="flex flex-col mb-6 text-off_green-500 sm:text-2xl sm:flex-row sm:mb-0">
              <span className="font-medium">1 - 5 November</span>&nbsp;
              <span className="mr-2 text-off_green">2023</span>
            </h3>
            <h2 className="hidden mt-10 text-5xl font-medium text-left sm:block sm:text-9xl">
              <span className="inline">
                <span className="text-rose-950">A</span>
                <span className="text-blue-950">I</span>&nbsp;
                <span className="text-off_green-500">Safety Summit</span>&nbsp;
                <span className="text-off_green-500">Fringe</span>
              </span>
            </h2>
          </main>
        </div>
      </div>

      <div className="flex-col hidden w-full mt-20 text-xl sm:flex sm:flex-row">
        <h4 className="w-full">
          <a
            href="https://chat.whatsapp.com/LuWcWtD04YM3DJTULmn2Fs"
            target="_blank"
            className="block w-full p-10 text-center hover:bg-off_green hover:text-white"
          >
            Join the community.
          </a>
        </h4>

        <h4 className="w-full">
          <a
            href="https://lu.ma/ldn"
            target="_blank"
            className="block w-full p-10 text-center hover:bg-off_green hover:text-white"
          >
            Attend the events.
          </a>
        </h4>

        <h4 className="w-full">
          <a
            href="https://chat.whatsapp.com/CZGKvlhEWgcE2gbL0mJd5o"
            target="_blank"
            className="block w-full p-10 text-center hover:bg-off_green hover:text-white"
          >
            Submit an event.
          </a>
        </h4>
      </div>
      <div
        style={{
          backgroundImage: "url(/social-banner-lg.png)",
          minHeight: "400px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full"
      ></div>

      {events.map((event) => {
        return (
          <a
            key={event.uid}
            // TODO the URL for an external event is to the org, not event
            href={event.url}
            target="_blank"
            className="block w-full py-6 px-4 sm:mt-10 hover:bg-off_green text-off_green-500 hover:text-white sm:py-8"
          >
            <div className="hidden max-w-6xl mx-auto 6xl sm:grid sm:grid-cols-12">
              <article className="col-span-8">
                <h3 className="hover:text-white text-2xl font-medium">
                  {event.summary}
                </h3>
              </article>

              <aside className="col-span-4 text-right">
                <p className="text-sm">{format(event.start, "LLLL do, y")}</p>
              </aside>
            </div>

            <div className="flex flex-col sm:hidden">
              <div className="flex items-center justify-between space-x-2">
                <h3 className="font-medium">{event.summary}</h3>
                <p className="text-sm">{format(event.start, "LLLL do, y")}</p>
              </div>
            </div>

            <div className="hidden max-w-6xl mx-auto 6xl sm:grid sm:grid-cols-12">
              <p className="col-span-12 text-sm hover:text-white sm:text-lg py-2">
                <span className="inline line-clamp">{event.description}</span>
              </p>
            </div>
          </a>
        );
      })}

      <div className="relative w-full py-20 mt-10 overflow-hidden h-60 text-white">
        <div
          className="absolute inset-0 z-0 transform bg-off_green -rotate-3 h-96"
          style={{ width: "110%" }}
        ></div>
        <div className="absolute top-0 w-full py-10 sm:py-20">
          <div className="w-full max-w-6xl grid-cols-12 mx-auto sm:grid px-4">
            <div className="col-span-2">
              <h6
                id="about"
                className="relative mx-auto mb-4 font-medium uppercase w-fit sm:w-full sm:mx-0 sm:mb-0"
              >
                <span className="relative z-10 px-2 py-1 font-medium sm:p-0 text-off_green sm:text-white">
                  About
                </span>
                <span className="absolute inset-0 z-0 transform bg-white sm:hidden rotate-6"></span>
              </h6>
            </div>

            <article className="col-span-6 mt-6 space-y-6 text-sm sm:p-0 sm:mt-0 sm:text-base">
              <p>
                The AI Safety Summit Fringe is organised by{" "}
                <a href="https://futurelondon.org" target="_blank" className="underline">
                  Future London
                </a>{" "}
                and{" "}
                <a href="https://ailondon.org" target="_blank" className="underline">
                  AI London
                </a>{" "}
                We're running events to coincide with, but are not affiliated with the <a href="https://www.gov.uk/government/publications/ai-safety-summit-introduction" className="underline">UK's AI Safety Summit</a>.
              </p>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
