export default function removeObjectByKey(objects: Map<string, any>, filterFn: (key: string) => boolean) {
  const keysToRemove: string[] = []

  // Find keys to remove based on the filter function
  objects.forEach((_, key) => {
    if (filterFn(key))
      keysToRemove.push(key)
  })

  // Remove entries with keys matching the filter
  keysToRemove.forEach((key) => {
    objects.delete(key)
  })
}
