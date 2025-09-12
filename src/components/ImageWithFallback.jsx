import { useState } from 'react'

function ImageWithFallback({ src, alt, className, fallbackSrc, ...props }) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Default fallback images
  const defaultFallback = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop&auto=format'
  const finalFallback = fallbackSrc || defaultFallback

  return (
    <div className={`image-container ${className || ''}`}>
      {isLoading && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={imageError ? finalFallback : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback
