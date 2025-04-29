import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luggage Tracker",
  description: "Track your luggage items and destinations",
};

/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It provides a consistent structure for all pages, including the HTML and body tags,
 * and applies global styles such as a minimum height and background color.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components or elements to be rendered inside the layout.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}