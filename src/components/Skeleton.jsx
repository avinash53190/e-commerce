export function ProductSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-52 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-8 w-full rounded-xl mt-2" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  )
}
