import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VIDEO_URL = "/dormdrop-hero.mp4";

export default function Landing() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* =========================================
          BACKGROUND VIDEO
      ========================================= */}

      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{
          objectPosition: "center center",
        }}
      />

      {/* =========================================
          VERY LIGHT CINEMATIC OVERLAY

          This is intentionally subtle.
          We don't want to wash out the video.
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/10" />

      {/* =========================================
          SLIGHT DARKENING ON RIGHT

          Keeps text readable without covering
          the whole video.
      ========================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          bg-gradient-to-l
          from-black/35
          via-black/5
          to-transparent
        "
      />

      {/* =========================================
          LOGO
      ========================================= */}

      <header className="fixed left-0 top-0 z-20 w-full px-5 py-5 sm:px-8 sm:py-6">

        <Link
          to="/"
          className="
            group
            flex
            w-fit
            items-center
            gap-3
          "
        >

          <span
            className="
              text-[23px]
              font-bold
              tracking-[-0.04em]
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
              transition-opacity
              duration-200
              group-hover:opacity-70
              sm:text-[27px]
            "
          >
            DormDrop
          </span>

          <span
            className="
              select-none
              text-[26px]
              font-medium
              leading-none
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]
              sm:text-[30px]
            "
          >
            ✳︎
          </span>

        </Link>

      </header>

      {/* =========================================
          HERO CONTENT
      ========================================= */}

      <section
        className="
          relative
          z-10
          flex
          min-h-screen
          items-end
          px-5
          pb-12
          sm:px-8
          sm:pb-16
          md:items-center
          md:justify-end
          md:px-12
          md:pb-0
          lg:px-20
        "
      >

        <div
          className={`
            w-full
            max-w-xl
            transition-all
            duration-1000
            ease-out
            md:mr-4
            lg:mr-10
            xl:mr-16
            ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          {/* =========================================
              SMALL EYEBROW
          ========================================= */}

          <p
            className="
              mb-4
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-white/80
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]
              sm:text-sm
            "
          >
            The campus marketplace
          </p>

          {/* =========================================
              MAIN HEADING
          ========================================= */}

          <h1
            className="
              max-w-lg
              text-[clamp(42px,7vw,76px)]
              font-semibold
              leading-[0.94]
              tracking-[-0.055em]
              text-white
              drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]
            "
            style={{
              fontFamily:
                "Georgia, 'Times New Roman', serif",
            }}
          >
            Your campus.
            <br />
            Your marketplace.
          </h1>

          {/* =========================================
              DESCRIPTION
          ========================================= */}

          <p
            className="
              mt-6
              max-w-md
              text-[17px]
              font-medium
              leading-[1.45]
              tracking-[-0.01em]
              text-white/90
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]
              sm:text-[19px]
            "
          >
            Buy, sell, donate, and discover useful
            things from people around you.
          </p>

          {/* =========================================
              ACTION BUTTONS
          ========================================= */}

          <div className="mt-7 flex flex-wrap gap-2">

            {/* LOGIN */}

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                shadow-lg
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-black
                hover:text-white
                hover:shadow-xl
                sm:text-[15px]
              "
            >
              Login
            </Link>

            {/* REGISTER */}

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-white/60
                bg-white/10
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white
                hover:text-black
                sm:text-[15px]
              "
            >
              Create account
            </Link>

            {/* EXPLORE */}

            <Link
              to="/home"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-white
                hover:bg-white/10
                sm:text-[15px]
              "
            >
              Explore campus
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================
          BOTTOM LEFT MICRO TEXT
      ========================================= */}

      <div
        className="
          fixed
          bottom-5
          left-5
          z-20
          hidden
          text-[10px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-white/60
          sm:left-8
          sm:block
        "
      >
        Built for campus life
      </div>

      {/* =========================================
          BOTTOM RIGHT SCROLL INDICATOR
      ========================================= */}

      <div
        className="
          fixed
          bottom-5
          right-5
          z-20
          hidden
          items-center
          gap-3
          text-[10px]
          font-medium
          uppercase
          tracking-[0.2em]
          text-white/60
          sm:flex
          sm:right-8
        "
      >
        Explore

        <span className="h-px w-8 bg-white/50" />
      </div>

    </main>
  );
}