import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8 ml-15">
          <Image
            src="/images/A2sv_logo.svg"
            alt="A2SV Logo"
            width={100}
            height={100}
          />
          <nav className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-900 font-medium border-b-2 border-blue-600 pb-1 ml-10 "
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            Your Profile
          </Link>
          <Link href="/applicant" className="text-gray-600 hover:text-gray-900">
            Applicant Name
          </Link>
          <Link href="/logout" className="text-gray-600 hover:text-gray-900">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
