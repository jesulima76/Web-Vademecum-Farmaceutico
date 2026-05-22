import React from "react";

interface UniversitasValentinaLogoProps {
  className?: string;
  size?: number | string;
}

export const UniversitasValentinaLogo: React.FC<UniversitasValentinaLogoProps> = ({
  className = "",
  size = "80",
}) => {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      id="universitas-valentina-logo-holder"
    >
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* GOLD CROWN (5 points on top with curved bottom) */}
        <path
          d="M 30,65 
             L 30,25 
             C 45,45 55,50 70,55 
             L 100,12 
             C 115,40 120,45 135,53 
             L 160,2 
             C 175,40 180,45 195,53 
             L 220,12 
             C 235,50 245,55 250,55 
             L 290,25 
             L 290,65 
             C 290,65 240,82 160,82 
             C 80,82 30,65 30,65 Z"
          fill="#C6A15A"
          stroke="#B5914C"
          strokeWidth="1.5"
          id="crown-bg"
        />

        {/* Text curve path for crown "UNIVERSITAS VALENTINA" */}
        <path
          id="crown-text-path"
          d="M 38,62 Q 160,77 282,62"
          fill="none"
          stroke="none"
        />

        {/* CROWN TEXT */}
        <text
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="bold"
          fontFamily="Cinzel, Georgia, serif"
          letterSpacing="1.8"
        >
          <textPath href="#crown-text-path" startOffset="50%" textAnchor="middle">
            UNIVERSITAS VALENTINA
          </textPath>
        </text>

        {/* CENTRAL WHITE SHIELD BACKGROUND */}
        <path
          d="M 75,90 
             L 245,90 
             L 245,190 
             C 245,245 160,265 160,265 
             C 160,265 75,245 75,190 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1"
          id="central-shield-bg"
        />

        {/* RED DECORATIVE RIBBONS WITH MOTTO */}
        
        {/* Left red ribbon (ANIMA) */}
        <path
          d="M 30,95
             C 30,95 62,95 72,95
             L 72,192
             C 72,215 50,230 35,232
             C 45,215 48,205 48,192
             L 30,192
             C 30,192 12,210 30,234
             C 45,255 76,238 76,204
             L 76,95
             C 76,95 30,95 30,95 Z"
          fill="#D12421"
          stroke="#B91C1C"
          strokeWidth="1"
          id="left-ribbon"
        />
        
        {/* Vertical Text "ANIMA" inside Left Ribbon */}
        <text
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          textAnchor="middle"
          letterSpacing="4"
          transform="translate(53, 110)"
        >
          <tspan x="0" dy="0">A</tspan>
          <tspan x="0" dy="16">N</tspan>
          <tspan x="0" dy="16">I</tspan>
          <tspan x="0" dy="16">M</tspan>
          <tspan x="0" dy="16">A</tspan>
        </text>

        {/* Right red ribbon (VIGOR) */}
        <path
          d="M 290,95
             C 290,95 258,95 248,95
             L 248,192
             C 248,215 270,230 285,232
             C 275,215 272,205 272,192
             L 290,192
             C 290,192 308,210 290,234
             C 275,255 244,238 244,204
             L 244,95
             C 244,95 290,95 290,95 Z"
          fill="#D12421"
          stroke="#B91C1C"
          strokeWidth="1"
          id="right-ribbon"
        />

        {/* Vertical Text "VIGOR" inside Right Ribbon */}
        <text
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          textAnchor="middle"
          letterSpacing="4"
          transform="translate(267, 110)"
        >
          <tspan x="0" dy="0">V</tspan>
          <tspan x="0" dy="16">I</tspan>
          <tspan x="0" dy="16">G</tspan>
          <tspan x="0" dy="16">O</tspan>
          <tspan x="0" dy="16">R</tspan>
        </text>

        {/* Bottom Curved ribbon linking the two (MENS / ET) */}
        <path
          d="M 80,242
             C 110,278 140,296 160,296
             C 180,296 210,278 240,242
             C 245,252 235,268 225,278
             C 200,305 175,312 160,312
             C 145,312 120,305 95,278
             C 85,268 75,252 80,242 Z"
          fill="#D12421"
          stroke="#B91C1C"
          strokeWidth="1"
          id="bottom-ribbon"
        />

        <path
          id="bottom-text-path-mens"
          d="M 90,265 C 120,290 145,296 160,296"
          fill="none"
          stroke="none"
        />
        <text
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="2"
        >
          <textPath href="#bottom-text-path-mens" startOffset="50%" textAnchor="middle">
            MENS
          </textPath>
        </text>

        <path
          id="bottom-text-path-et"
          d="M 160,296 C 175,296 200,290 230,265"
          fill="none"
          stroke="none"
        />
        <text
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="2"
        >
          <textPath href="#bottom-text-path-et" startOffset="50%" textAnchor="middle">
            ET
          </textPath>
        </text>


        {/* BLUE EMBLEM (Stylized dual monogram "LL" / Winged Crest) */}
        <g id="blue-emblem" fill="#203F80">
          
          {/* Central Vertical Pillar */}
          <rect x="156" y="112" width="8" height="110" rx="2" />
          
          {/* Central Horizontal Cross Member */}
          <rect x="122" y="162" width="76" height="8" rx="2" />

          {/* Symmetrical Left Wing / Monogram */}
          <path
             d="M 152,112 
                C 152,112 110,110 90,95
                C 90,135 125,160 152,160 
                Z" 
             id="top-left-wing"
          />
          <path
             d="M 152,222 
                C 152,222 110,224 90,239
                C 90,199 125,172 152,172 
                Z" 
             id="bottom-left-wing"
          />

          {/* Symmetrical Right Wing / Monogram */}
          <path
             d="M 168,112 
                C 168,112 210,110 230,95
                C 230,135 195,160 168,160 
                Z" 
             id="top-right-wing"
          />
          <path
             d="M 168,222 
                C 168,222 210,224 230,239
                C 230,199 195,172 168,172 
                Z" 
             id="bottom-right-wing"
          />

          {/* Symmetrical Small Flourishes for Shield Authenticity */}
          <circle cx="160" cy="102" r="3.5" />
          <circle cx="160" cy="232" r="3.5" />
        </g>
      </svg>
    </div>
  );
};
