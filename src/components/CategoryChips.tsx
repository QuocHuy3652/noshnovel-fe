import { Chip } from "@material-tailwind/react";

export interface Category {
  name: string,
  handler?: () => void
}
export interface CategoryChipsProps {
  categories: Category[]
}
export const CategoryChips = (props:CategoryChipsProps) => {
  const {categories} = props

  return (
    <div className="category-chips w-full flex flex-row flex-wrap space-x-2 mt-2 max-w-full">
      {
        categories.map((category) => (
          <Chip
            className="m-2 bg-app_tertiary"
            key={category.name} size="sm"
            value={category.name} />))
      }
    </div>
    )
}