export default function getElementBoundingBox(element: Element) {
  const boundingRect = element.getBoundingClientRect()

  const style = window.getComputedStyle(element)

  const padding = {
    left: Number.parseInt(style.paddingLeft),
    right: Number.parseInt(style.paddingRight),
    top: Number.parseInt(style.paddingTop),
    bottom: Number.parseInt(style.paddingBottom),
    x: Number.parseInt(style.paddingLeft) + Number.parseInt(style.paddingRight),
    y: Number.parseInt(style.paddingTop) + Number.parseInt(style.paddingBottom),
  }

  const margin = {
    left: Number.parseInt(style.marginLeft),
    right: Number.parseInt(style.marginRight),
    top: Number.parseInt(style.marginTop),
    bottom: Number.parseInt(style.marginBottom),
    x: Number.parseInt(style.marginLeft) + Number.parseInt(style.marginRight),
    y: Number.parseInt(style.marginTop) + Number.parseInt(style.marginBottom),
  }

  const border = {
    left: Number.parseInt(style.borderLeftWidth),
    right: Number.parseInt(style.borderRightWidth),
    top: Number.parseInt(style.borderTopWidth),
    bottom: Number.parseInt(style.borderBottomWidth),
    x: Number.parseInt(style.borderLeftWidth) + Number.parseInt(style.borderRightWidth),
    y: Number.parseInt(style.borderTopWidth) + Number.parseInt(style.borderBottomWidth),
  }

  const gap = {
    left: margin.left + padding.left,
    right: margin.right + padding.right,
    top: margin.top + padding.top,
    bottom: margin.bottom + padding.bottom,
    x: margin.x + padding.x + border.x,
    y: margin.y + padding.y + border.y,
  }

  const width = Math.max(boundingRect.width, element.scrollWidth)
  const height = Math.max(boundingRect.height, element.scrollHeight)

  const rect = {
    width,
    height,
    left: boundingRect.left,
    x: boundingRect.x,
    right: boundingRect.left + width,
    top: boundingRect.top,
    y: boundingRect.y,
    bottom: boundingRect.top + height,
  }

  const innerRect = {
    width: width - gap.x,
    height: height - gap.y,
    top: rect.top + gap.top,
    right: rect.right - gap.right,
    left: rect.left + gap.left,
    bottom: rect.bottom - gap.bottom,
    x: rect.x - gap.left,
    y: rect.y - gap.top,
  }

  return {
    rect,
    innerRect,
    padding,
    margin,
    gap,
  }
}
