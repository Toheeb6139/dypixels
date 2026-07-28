// Cover images and gallery items are stored as plain URLs — this just
// checks the extension so components know whether to render an <img>
// (via next/image) or a looping, muted <video>. Lets you upload a
// converted WebM/MP4 instead of a GIF and have it "just play" on cards.
export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}
