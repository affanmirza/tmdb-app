import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/types/category';

export default function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => {
        const isActive = category.id === '' ? pathname === '/' : pathname === `/${category.id}`;
        return (
          <Link
            key={category.id}
            href={category.id === '' ? '/' : `/${category.id}`}
            className={`category-button ${
              isActive ? 'category-button-active' : 'text-gray-900 hover:text-gray-700'
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
} 