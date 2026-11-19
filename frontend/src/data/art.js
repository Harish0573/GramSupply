// Placeholder artwork (SVG data URIs). Replace with real photos any time:
// just put image files in /public/images and use "/images/name.jpg" in the data files.
export function art(emoji, from, to) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
<rect width="640" height="440" fill="url(#g)"/>
<circle cx="520" cy="80" r="120" fill="#fff" fill-opacity="0.12"/>
<circle cx="90" cy="380" r="140" fill="#fff" fill-opacity="0.1"/>
<text x="320" y="270" font-size="190" text-anchor="middle">${emoji}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
