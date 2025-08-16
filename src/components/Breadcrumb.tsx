// components/Breadcrumb.tsx
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex flex-wrap items-center text-sm mb-6"
      aria-label="Breadcrumb"
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <div
            key={idx}
            className="flex items-center flex-shrink-0 mb-1 sm:mb-0"
          >
            {idx > 0 && (
              <svg
                className="w-4 h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-150 text-xs sm:text-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="px-2 sm:px-3 py-1 bg-blue-600 text-white rounded font-medium text-xs sm:text-sm">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
