import { Box, Image as ChakraImage } from "@chakra-ui/react";
import { useState } from "react";
import placeholderPortrait from "../../assets/images/states/placeholder-portrait.png";
import placeholderLandscape from "../../assets/images/states/placeholder-landscape.png";
import placeholderSquare from "../../assets/images/states/placeholder-square.png";
import imageErrorPortrait from "../../assets/images/states/image-error-portrait.png";
import imageErrorLandscape from "../../assets/images/states/image-error-landscape.png";
import imageErrorSquare from "../../assets/images/states/image-error-square.png";

const imageStateAssets = {
  portrait: {
    placeholder: placeholderPortrait,
    error: imageErrorPortrait,
  },
  landscape: {
    placeholder: placeholderLandscape,
    error: imageErrorLandscape,
  },
  square: {
    placeholder: placeholderSquare,
    error: imageErrorSquare,
  },
};

/**
 * Komponen progressive image dengan placeholder & error state yang menyesuaikan variant.
 *
 * @param {Object} props
 * @param {string} [props.src] - URL gambar asli.
 * @param {string} [props.alt] - Alt text gambar.
 * @param {"portrait"|"landscape"|"square"} [props.variant="portrait"] - Variant orientasi asset (default: portrait).
 * @param {"lazy"|"eager"} [props.loading="lazy"] - Native lazy loading.
 * @param {"async"|"sync"|"auto"} [props.decoding="async"] - Native image decoding.
 * @param {"high"|"low"|"auto"} [props.fetchPriority] - Native fetchPriority.
 * @param {import("@chakra-ui/react").SystemProps["objectFit"]} [props.objectFit="cover"] - CSS object-fit.
 * @param {import("@chakra-ui/react").SystemProps["objectPosition"]} [props.objectPosition="center"] - CSS object-position.
 */
function ResaeniImage({
  src,
  alt,
  variant = "portrait",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  objectFit = "cover",
  objectPosition = "center",
  ...rest
}) {
  const [status, setStatus] = useState(!src ? "error" : "loading");
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);

    setStatus(!src ? "error" : "loading");
  }

  const assets = imageStateAssets[variant] || imageStateAssets.portrait;
  const stateImage = status === "error" ? assets.error : assets.placeholder;

  return (
    <Box position="relative" overflow="hidden" {...rest}>
      <ChakraImage
        src={stateImage}
        aria-hidden="true"
        w="full"
        h="full"
        objectFit={objectFit}
        objectPosition={objectPosition}
      />

      {src && status !== "error" && (
        <ChakraImage
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          position="absolute"
          inset="0"
          w="full"
          h="full"
          objectFit={objectFit}
          objectPosition={objectPosition}
          opacity={status === "loaded" ? 1 : 0}
          transition="opacity 0.2s ease-in-out"
        />
      )}
    </Box>
  );
}

export default ResaeniImage;
