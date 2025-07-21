
'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';

export default function LoginPage() {
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="rounded-md bg-card p-4 text-center shadow-md">
          <h1 className="mb-2 text-xl font-bold text-red-600">
            Configuration Error
          </h1>
          <p className="text-foreground">Mapbox Access Token is not configured.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please add your token to the <code className="rounded bg-muted p-1">.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen font-sans">
      <div className="absolute inset-0 z-0">
         {/* The MapComponent can be placed here if a full-screen background map is desired */}
      </div>
      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/20 p-4">
        <div className="w-full max-w-sm rounded-lg bg-card p-8 shadow-2xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-primary">
            Ridemap
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            Welcome back! Please log in.
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-foreground"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="+8801XXXXXXXXX"
                className="mt-1 block w-full rounded-md border-border bg-background p-3 focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-foreground"
              >
                PIN
              </label>
              <input
                id="pin"
                type="password"
                maxLength={5}
                placeholder="•••••"
                className="mt-1 block w-full rounded-md border-border bg-background p-3 focus:border-primary focus:ring-primary"
              />
            </div>
            <Link href="/find-trip">
              <button
                type="button"
                className="w-full rounded-md bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Log In
              </button>
            </Link>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/register"
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
           <div className="mt-4 text-center">
            <Link
              href="/agent-home"
              className="text-sm text-muted-foreground hover:underline"
            >
              Log in as Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
