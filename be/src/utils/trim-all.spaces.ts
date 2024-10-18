import { Transform } from 'class-transformer'

export function TrimAllSpaces() {
  return Transform(({ value }) => value.replace(/\s+/g, ''))
}
