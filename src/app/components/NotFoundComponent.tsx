import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";  // Adjust path if needed
import { Footer } from "./Footer";  // Adjust path if needed

interface NotFoundProps {
  title?: string;
  description?: string;
  buttonText?: string;
  homeUrl?: string;
}

export default function NotFoundComponent({
  title = "Page Not Found",
  description = "Sorry, we couldn't find the page you're looking for.",
  buttonText = "Go Home",
  homeUrl = "/"
}: NotFoundProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          {/* Large 404 Text with custom color */}
          <h1 className="text-8xl md:text-9xl font-bold mb-4" style={{ color: "#4F46E5" }}>
            404
          </h1>

          {/* Page Not Found Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {title}
          </h2>

          {/* Description Text */}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {description}
          </p>

          {/* Go Home Button */}
          <Link href={homeUrl}>
            <Button className="bg-custom-primary hover:bg-custom-primary/90 text-white px-6 py-2 rounded-md">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}