import React, { useState } from 'react'
import { Star } from 'lucide-react'

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => {
        const filled = (hovered || value) >= starValue
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            className="p-0.5"
          >
            <Star
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                filled ? 'fill-orange-500 text-orange-500' : 'text-gray-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
