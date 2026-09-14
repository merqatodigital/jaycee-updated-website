import React from 'react';

interface JayCeeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon-only';
  inverted?: boolean;
}

export const JayCeeLogo: React.FC<JayCeeLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  inverted = false,
}) => {
  // Dimensions for different sizes
  const config = {
    sm: { iconSize: 32, fontSize: 'text-sm', bannerText: 'text-[6px] tracking-[0.18em]', bannerPad: 'px-1.5 py-0.5' },
    md: { iconSize: 46, fontSize: 'text-lg', bannerText: 'text-[7.5px] tracking-[0.22em]', bannerPad: 'px-2 py-0.5' },
    lg: { iconSize: 64, fontSize: 'text-2xl', bannerText: 'text-[10px] tracking-[0.24em]', bannerPad: 'px-3 py-1' },
    xl: { iconSize: 88, fontSize: 'text-4xl', bannerText: 'text-xs tracking-[0.26em]', bannerPad: 'px-4 py-1.5' },
  }[size];

  // Unique IDs for SVG gradient definitions to prevent collisions
  const uniquePrefix = React.useId().replace(/:/g, '');

  return (
    <div
      className={`inline-flex ${
        variant === 'compact' ? 'flex-row items-center space-x-2.5' : 'flex-col items-center justify-center'
      } select-none ${className}`}
    >
      {/* Exact Vector Brand Emblem matching jaycee-logo.jpg */}
      <svg
        width={config.iconSize}
        height={config.iconSize}
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="JayCee Emblem"
      >
        <defs>
          {/* Leaf Gradient */}
          <linearGradient id={`${uniquePrefix}-leaf`} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="35%" stopColor="#22C55E" />
            <stop offset="75%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <linearGradient id={`${uniquePrefix}-leafHigh`} x1="10%" y1="0%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
          </linearGradient>

          {/* Yellow / Gold Loop Gradients */}
          <linearGradient id={`${uniquePrefix}-goldMain`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="25%" stopColor="#FACC15" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id={`${uniquePrefix}-goldBevel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id={`${uniquePrefix}-goldHigh`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FACC15" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>

          {/* Red Loop Gradients */}
          <linearGradient id={`${uniquePrefix}-redMain`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="25%" stopColor="#EF4444" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          <linearGradient id={`${uniquePrefix}-redBevel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="50%" stopColor="#7F1D1D" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>

          <linearGradient id={`${uniquePrefix}-redHigh`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FECACA" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#EF4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#B91C1C" stopOpacity="0" />
          </linearGradient>

          {/* Dimensional Shadow */}
          <filter id={`${uniquePrefix}-dropShadow`} x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        <g filter={`url(#${uniquePrefix}-dropShadow)`}>
          {/* 1. Top Green Leaf with Central Vein */}
          <g>
            <path
              d="M 135 48 C 175 35, 215 70, 210 115 C 205 130, 185 135, 170 128 C 145 115, 130 85, 135 48 Z"
              fill="#065F46"
              opacity="0.5"
            />
            <path
              d="M 133 46 C 170 32, 210 65, 208 110 C 203 125, 185 130, 170 122 C 146 110, 132 80, 133 46 Z"
              fill={`url(#${uniquePrefix}-leaf)`}
            />
            <path
              d="M 135 48 C 160 40, 195 65, 198 90 C 180 82, 160 70, 142 55 Z"
              fill={`url(#${uniquePrefix}-leafHigh)`}
            />
            <path
              d="M 135 48 Q 170 85 188 122"
              fill="none"
              stroke="#86EFAC"
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path d="M 152 66 Q 165 60 178 68" fill="none" stroke="#BBF7D0" strokeWidth="1.8" opacity="0.65" />
            <path d="M 162 82 Q 176 80 188 90" fill="none" stroke="#BBF7D0" strokeWidth="1.8" opacity="0.65" />
            <path d="M 148 76 Q 140 85 142 96" fill="none" stroke="#BBF7D0" strokeWidth="1.5" opacity="0.65" />
          </g>

          {/* 2. Inner Red Crescent */}
          <g>
            <path
              d="M 230 100 C 190 120, 155 170, 153 225 C 151 268, 175 305, 218 318 C 228 321, 238 314, 236 304 C 232 284, 202 265, 198 225 C 195 185, 222 145, 245 125 Z"
              fill={`url(#${uniquePrefix}-redBevel)`}
            />
            <path
              d="M 233 103 C 195 123, 160 170, 158 223 C 156 262, 178 298, 215 312 C 224 315, 233 308, 230 299 C 224 280, 203 260, 200 223 C 197 186, 224 148, 243 128 Z"
              fill={`url(#${uniquePrefix}-redMain)`}
            />
            <path
              d="M 230 106 C 200 128, 168 175, 166 220 C 165 240, 170 265, 185 285 C 178 265, 178 238, 182 215 C 188 175, 212 138, 230 115 Z"
              fill={`url(#${uniquePrefix}-redHigh)`}
            />
          </g>

          {/* 3. Golden Yellow Outer Loop */}
          <g>
            <path
              d="M 80 205 C 80 205, 90 270, 140 325 C 190 380, 275 385, 335 345 C 315 358, 255 378, 195 348 C 145 322, 110 270, 102 220 C 98 198, 88 192, 80 205 Z"
              fill={`url(#${uniquePrefix}-goldBevel)`}
            />
            <path
              d="M 78 200 C 88 215, 98 275, 145 328 C 195 382, 282 382, 340 338 C 300 355, 248 360, 195 338 C 145 315, 115 268, 105 218 C 98 190, 80 185, 78 200 Z"
              fill={`url(#${uniquePrefix}-goldMain)`}
            />
            <path
              d="M 78 200 L 115 220 C 115 220, 102 245, 115 268 C 105 250, 96 232, 78 200 Z"
              fill={`url(#${uniquePrefix}-goldBevel)`}
            />
            <path
              d="M 82 206 C 96 230, 115 280, 155 324 C 200 370, 275 370, 320 340 C 265 362, 205 352, 165 315 C 128 278, 108 232, 95 210 Z"
              fill={`url(#${uniquePrefix}-goldHigh)`}
            />
            {/* Upper Right yellow continuation */}
            <path
              d="M 235 125 C 275 145, 305 185, 305 240 C 305 285, 280 325, 245 340 C 255 332, 285 300, 285 245 C 285 195, 260 155, 230 135 Z"
              fill={`url(#${uniquePrefix}-goldMain)`}
            />
            <path
              d="M 238 130 C 270 152, 298 188, 298 238 C 298 275, 282 305, 258 325 C 275 298, 285 268, 285 235 C 285 190, 262 152, 235 130 Z"
              fill={`url(#${uniquePrefix}-goldHigh)`}
            />
          </g>

          {/* 4. Lower Right Red Horn */}
          <g>
            <path
              d="M 248 355 C 315 375, 385 350, 412 282 C 415 274, 408 268, 400 274 C 375 292, 345 312, 280 315 C 260 316, 242 332, 248 355 Z"
              fill={`url(#${uniquePrefix}-redBevel)`}
            />
            <path
              d="M 252 358 C 322 376, 388 348, 415 278 C 418 270, 410 265, 402 271 C 378 288, 348 306, 282 310 C 262 312, 246 335, 252 358 Z"
              fill={`url(#${uniquePrefix}-redMain)`}
            />
            <path
              d="M 265 352 C 325 365, 375 338, 406 280 C 390 295, 355 315, 295 315 C 278 315, 262 330, 265 352 Z"
              fill={`url(#${uniquePrefix}-redHigh)`}
            />
          </g>
        </g>
      </svg>

      {/* Typography: JAYCEE + TRADING AND SERVICES Banner */}
      {variant !== 'icon-only' && (
        <div
          className={`flex flex-col ${
            variant === 'compact'
              ? 'items-start'
              : className.includes('items-start')
              ? 'items-start mt-1'
              : 'items-center mt-1'
          }`}
        >
          {/* JAYCEE with exact colors: JAY (Yellow), C (Red), EE (Black/Inverted White) */}
          <div
            className={`font-black italic tracking-wide leading-none ${config.fontSize} flex items-center`}
          >
            <span className="text-[#F59E0B]">JAY</span>
            <span className="text-[#DC2626]">C</span>
            <span className={inverted ? 'text-white' : 'text-[#111827] dark:text-white'}>EE</span>
          </div>

          {/* Slanted Parallelogram Banner: TRADING AND SERVICES */}
          <div
            className={`mt-1 w-full flex ${
              className.includes('items-start') || variant === 'compact'
                ? 'justify-start'
                : 'justify-center'
            }`}
          >
            <div
              className={`-skew-x-12 ${
                inverted ? 'bg-white text-black' : 'bg-black text-white dark:bg-white dark:text-black'
              } ${config.bannerPad} shadow-2xs`}
            >
              <div
                className={`font-black italic uppercase whitespace-nowrap leading-none ${config.bannerText}`}
              >
                TRADING AND SERVICES
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
