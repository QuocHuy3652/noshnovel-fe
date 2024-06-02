import { Chip } from '@material-tailwind/react';
import { toSlug } from '~/utils/fn';

export interface Category {
  name: string;
  slug: string;
  handler?: () => void;
}
export interface CategoryChipsProps {
  categories: Category[];
  isGenreAvailable: (category: Category) => boolean;
  handleSearch: (data: any, type: "genre" | "author" | "keyword") => void
}
export const CategoryChips = (props: CategoryChipsProps) => {
  const { categories, isGenreAvailable, handleSearch } = props;

  return (
    <div className="category-chips w-full flex flex-row flex-wrap mt-2 max-w-full">
      {categories.map((category) => (
        <div
          className={`my-2 mr-2 rounded-[7px] ${isGenreAvailable(category) ? 'cursor-pointer  bg-app_primary  ' : 'bg-gray-500'}`}
          onClick={isGenreAvailable(category) ? () => handleSearch(category.slug, 'genre') : undefined}
        >
          <Chip key={category.name} size="sm" value={category.name} className="bg-transparent" />
        </div>
      ))}
    </div>
  );
};
