import React, { useEffect, useState } from "react";
import { PLACEHOLDER_IMG } from "../utils/format";

// Shows the first picture that loads. If a link is broken it tries the next one,
// and at the end shows a neutral placeholder, so a product never has a broken image.
function SmartImage({ srcs, alt, className, style, loading = "lazy" }) {
  const list = (srcs || []).filter(Boolean);
  const key = list.join("|");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [key]);

  const src = index < list.length ? list[index] : PLACEHOLDER_IMG;
  return (
    <img
      className={className}
      style={style}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setIndex((n) => n + 1)}
    />
  );
}

export default SmartImage;
