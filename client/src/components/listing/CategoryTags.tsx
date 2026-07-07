import type { Listing } from '../../api/listings'

interface CategoryTagsProps {
  tags: Listing['categoryTags']
}

function CategoryTags({ tags }: CategoryTagsProps) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <button
          key={tag.label}
          type="button"
          className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
        >
          {tag.label} · {tag.count}
        </button>
      ))}
    </div>
  )
}

export default CategoryTags
