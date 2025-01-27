import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ClerkLogo } from "../components/clerk-logo";
import { NextLogo } from "../components/next-logo";
import Link from "next/link"


export default async function ForYouPage() {
  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto">
          <div>
            <header className="flex items-center justify-between w-full h-16 gap-4">
              <div className="flex gap-4">
                <ClerkLogo />
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <NextLogo />
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Dashboard
                </Link>
                <div aria-hidden className="w-px h-6 bg-[#C7C7C8]" />
                <Link
                  href="/upload"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Upload
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <OrganizationSwitcher
                  appearance={{
                    elements: {
                      organizationPreviewAvatarBox: "size-6",
                    },
                  }}
                />
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "size-6",
                    },
                  }}
                />
              </div>
            </header>
            <h1>WORKING ON FOR YOU</h1>
          </div>
      </main>
    </>
  );
}
