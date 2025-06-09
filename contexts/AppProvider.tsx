"use client";
import { AuthProvider } from "./AuthContext";
import { EventProvider } from "./EventContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <EventProvider>{children}</EventProvider>
    </AuthProvider>
  );
}
