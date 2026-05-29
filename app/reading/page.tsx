"use client";

import dynamic from "next/dynamic";

const ReadingPageInner = dynamic(() => import("./ReadingPageInner"), { ssr: false });

export default function ReadingPage() {
  return <ReadingPageInner />;
}
