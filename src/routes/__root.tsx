import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-deep-brown">404</h1>
        <p className="mt-4 text-muted-foreground">
          This page has drifted away like a petal on the breeze.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-deep-brown px-6 py-3 text-sm tracking-widest text-warm-white uppercase"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-deep-brown">Something went quiet</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again in a moment.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-deep-brown px-6 py-3 text-sm tracking-widest text-warm-white uppercase"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { title: "Kowshik & Niroopa · A Wedding Invitation" },
      {
        name: "description",
        content:
          "Together with their families, Kowshik Raj & Niroopa Vijayakumar invite you to celebrate their  wedding on 6–7 September in Trichy.",
      },

      // Open Graph
      {
        property: "og:title",
        content: "Kowshik & Niroopa · A Wedding Invitation",
      },
      {
        property: "og:description",
        content:
          "Celebrate our Wedding — 6–7 September at Crystal Convention Centre, Trichy.",
      },
      {
        property: "og:image",
        content: "https://kowshik-niroopa-invitation.invitecraft2026.workers.dev/image-6.jpeg",
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:url",
        content: "https://kowshik-niroopa-invitation.invitecraft2026.workers.dev/image-6.jpeg",
      },
      {
        property: "og:type",
        content: "website",
      },

      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Kowshik & Niroopa · A Wedding Invitation",
      },
      {
        name: "twitter:description",
        content: "Celebrate our Wedding — 6–7 September in Trichy.",
      },
      {
        name: "twitter:image",
        content: "https://kowshik-niroopa-invitation.invitecraft2026.workers.dev/image-6.jpeg",
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },

      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600&family=Parisienne&family=Alex+Brush&family=Great+Vibes&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
