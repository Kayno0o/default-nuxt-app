export type Point = [number, number]

export type ColorArgs = string | number | [number, number, number]

export interface FillProps { fillColor: ColorArgs }
export interface StrokeProps { weight: number, strokeColor: ColorArgs }
export interface PosProps { pos: Point }
export interface SizeProps { width: number, height: number }
export type ColorProps = Partial<FillProps> & Partial<StrokeProps>

export type RectProps = PosProps & SizeProps & ColorProps
export type EllipseProps = PosProps & SizeProps & ColorProps
export type TriangleProps = {
  pos1: Point
  pos2: Point
  pos3: Point
} & ColorProps
export type NStarProps = PosProps & {
  radius: number
  points: number
  innerRadius?: number
} & ColorProps
export type VectorShapeProps = PosProps & {
  vectors: Array<[number, number]>
} & ColorProps
export type TextProps = PosProps &
  Partial<FillProps> &
  Partial<StrokeProps> & {
    text: string
    fontSize?: number
    font?: string
    align?: CanvasTextAlign
  }
export type ImageProps = PosProps & SizeProps & {
  image: CanvasImageSource
  crop?: {
    start: Point
    size: Point
  }
}

export default function useDraw(ctx: ComputedRef<CanvasRenderingContext2D | null>) {
  function getColor(color: ColorArgs): string {
    const [r, g, b] = Array.isArray(color) ? color : [color]
    if (typeof r === 'string')
      return r
    else if (g === undefined)
      return rgbToHex([r, r, r])
    else return rgbToHex([r, g, b!])
  }

  function applyColor(props: Partial<FillProps> & Partial<StrokeProps>) {
    if (!ctx.value)
      return

    const { fillColor, strokeColor, weight } = props

    if (fillColor !== undefined) {
      ctx.value.fillStyle = getColor(fillColor)
      ctx.value.fill()
    }
    else if (strokeColor !== undefined) {
      ctx.value.strokeStyle = getColor(strokeColor)
      ctx.value.lineWidth = weight ?? 1
      ctx.value.stroke()
    }
    else {
      ctx.value.closePath()
    }
  }

  function text(props: TextProps) {
    if (!ctx.value)
      return
    const { pos, text, fillColor, strokeColor, weight, fontSize, font } = props

    ctx.value.font = `${fontSize ?? 20}px ${font ?? 'sans-serif'}`
    ctx.value.textAlign = props.align ?? 'left'

    if (fillColor !== undefined) {
      ctx.value.fillStyle = getColor(fillColor)
      ctx.value.fillText(text, pos[0], pos[1])
    }

    if (strokeColor !== undefined) {
      ctx.value.strokeStyle = getColor(strokeColor)
      ctx.value.lineWidth = weight ?? 1
      ctx.value.strokeText(text, pos[0], pos[1])
    }
  }

  function rect(props: RectProps) {
    if (!ctx.value)
      return
    const { pos, width, height, fillColor, weight, strokeColor } = props

    if (fillColor !== undefined) {
      ctx.value.fillStyle = getColor(fillColor)
      ctx.value.fillRect(pos[0], pos[1], width, height)
    }

    if (strokeColor !== undefined) {
      ctx.value.strokeStyle = getColor(strokeColor)
      ctx.value.lineWidth = weight ?? 1
      ctx.value.strokeRect(pos[0], pos[1], width, height)
    }
  }

  function ellipse(props: EllipseProps) {
    if (!ctx.value)
      return
    const {
      pos: [x, y],
      width,
      height,
    } = props

    ctx.value.beginPath()
    ctx.value.ellipse(x, y, width, height, 0, 0, 2 * Math.PI)
    applyColor(props)
  }

  function triangle(props: TriangleProps) {
    if (!ctx.value)
      return
    const {
      pos1: [x1, y1],
      pos2: [x2, y2],
      pos3: [x3, y3],
    } = props

    ctx.value.beginPath()
    ctx.value.moveTo(x1, y1)
    ctx.value.lineTo(x2, y2)
    ctx.value.lineTo(x3, y3)

    applyColor(props)
  }

  function shape(props: VectorShapeProps) {
    if (!ctx.value)
      return
    const { pos, vectors } = props

    ctx.value.beginPath()
    ctx.value.moveTo(pos[0], pos[1])
    vectors.forEach(([x, y]) => ctx.value?.lineTo(pos[0] + x, pos[1] + y))
    ctx.value.closePath()

    applyColor(props)
  }

  function nStar(props: NStarProps) {
    if (!ctx.value)
      return
    const { pos, radius, points, innerRadius = radius / 2 } = props

    ctx.value.beginPath()
    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? radius : innerRadius
      const a = (i * Math.PI) / points - Math.PI / 2
      ctx.value.lineTo(pos[0] + r * Math.cos(a), pos[1] + r * Math.sin(a))
    }
    ctx.value.closePath()
    applyColor(props)
  }

  function image(props: ImageProps) {
    if (!ctx.value)
      return

    if (props.crop)
      ctx.value.drawImage(props.image, props.crop.start[0], props.crop.start[1], props.crop.size[0], props.crop.size[1], props.pos[0], props.pos[1], props.width, props.height)

    else
      ctx.value.drawImage(props.image, props.pos[0], props.pos[1], props.width, props.height)
  }

  return {
    shape,
    rect,
    triangle,
    nStar,
    ellipse,
    text,
    image,
  }
}
