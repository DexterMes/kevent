"use client";
import { EventProvider } from "./EventContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EventProvider>{children}</EventProvider>;
}
