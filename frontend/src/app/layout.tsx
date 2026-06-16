import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart-Wanderlust | AI-Powered Travel Planning',
  description: 'Create personalized travel itineraries with AI. Get smart recommendations, optimized routes, and budget forecasts for your next adventure.',
  keywords: ['travel planner', 'AI travel', 'itinerary builder', 'trip planner', 'personalized travel'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
