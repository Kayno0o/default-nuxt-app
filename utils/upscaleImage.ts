export default function upscaleImage(img: HTMLImageElement, scaleFactor: number) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const scaledWidth = img.width * scaleFactor
  const scaledHeight = img.height * scaleFactor

  canvas.width = scaledWidth
  canvas.height = scaledHeight

  if (ctx) {
    ctx.imageSmoothingEnabled = false // Disable smoothing for pixel-perfect upscaling
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight)
  }

  return canvas
}
