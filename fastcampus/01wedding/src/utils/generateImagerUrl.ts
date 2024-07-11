/** generateImageUrl
 * @params
 * filename: ex) wedding_01
 * format: jpg | webp
 * option: c_fill, w_400
 */
function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dthvdlvig/image/upload/${option}/v1720703390/${filename}.${format}`
}

export default generateImageUrl
