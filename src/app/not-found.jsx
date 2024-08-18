import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center gap-4">
      <h2 className="text-lg font-bold">Oops, Page Not Found</h2>
      <p>
        It seems like the page you're looking for doesn't exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white text-sm rounded-md py-2 px-4 mt-5"
      >
        Return Home
      </Link>
    </div>
  );
}
