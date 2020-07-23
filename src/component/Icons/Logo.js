import React, { useState } from 'react';
import { COLOR } from '../../theme';

export const Logo = ({
  fillColor = COLOR.main.text,
  defaultColor = COLOR.main.text,
  width = '3rem',
  height = '3rem',
}) => {
  const [toggleFillColor, setToggleFillColor] = useState(false);

  return (
    <div
      onMouseEnter={() => setToggleFillColor(true)}
      onMouseLeave={() => setToggleFillColor(false)}
    >
      <svg
        data-name="Logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        enable-background="new 0 0 64 64"
        aria-labelledby="logo"
        width={width}
        height={height}
      >
        <g id="personal_wallet">
          <path
            d="M57,34h-3v-1h-1v1H43c-0.55,0-1,0.45-1,1v10c0,0.55,0.45,1,1,1h13v7v1.721V57c0,0.551-0.448,1-1,1H8   c-0.551,0-1-0.449-1-1v-2.279V53V21.828C7.313,21.939,7.649,22,8,22h47c0.552,0,1,0.449,1,1v10h1V23v-4c0-1.1-0.9-2-2-2H44.933   c-0.025,0.334-0.055,0.668-0.105,1H55c0.552,0,1,0.449,1,1v2v0.279C55.704,21.106,55.365,21,55,21H8c-0.365,0-0.704-0.106-1-0.279   V19c0-0.551,0.449-1,1-1h11.173c-0.051-0.332-0.08-0.666-0.105-1H8c-1.1,0-2,0.9-2,2v34v4c0,1.1,0.9,2,2,2h47c1.1,0,2-0.9,2-2v-4   v-7c0.55,0,1-0.45,1-1v-1.098v-9.541v-0.062V33C58,33.553,57.553,34,57,34z M43,45V35h10h1h3v10H43z"
            fill={toggleFillColor ? fillColor : defaultColor}
          />
          <g id="personal_wallet_1_">
            <g>
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="48"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="43"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="38"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="33"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="28"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="23"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="18"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="13"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="8"
                y="55"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="48"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="43"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="38"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="33"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="28"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="23"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="18"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="13"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                width="3"
                x="8"
                y="24"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="3"
                width="1"
                x="53"
                y="53"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="3"
                width="1"
                x="53"
                y="48"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="3"
                width="1"
                x="53"
                y="28"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="2"
                width="1"
                x="53"
                y="24"
              />
              <path
                d="M46.525,37.525c-1.367,1.367-1.367,3.582,0,4.949C47.209,43.158,48.104,43.5,49,43.5     s1.791-0.342,2.475-1.025c1.367-1.367,1.367-3.582,0-4.949C50.791,36.842,49.896,36.5,49,36.5S47.209,36.842,46.525,37.525z      M50.768,41.768C50.295,42.24,49.667,42.5,49,42.5s-1.295-0.26-1.768-0.732c-0.975-0.975-0.975-2.561,0-3.535     C47.705,37.76,48.333,37.5,49,37.5s1.295,0.26,1.768,0.732C51.742,39.207,51.742,40.793,50.768,41.768z"
                fill={toggleFillColor ? fillColor : defaultColor}
              />
              <path
                d="M23.5,16c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5c0,1.446-0.365,2.807-1.004,4h1.108     c0.569-1.218,0.896-2.57,0.896-4c0-5.238-4.262-9.5-9.5-9.5s-9.5,4.262-9.5,9.5c0,1.43,0.326,2.782,0.896,4h1.108     C23.865,18.807,23.5,17.446,23.5,16z"
                fill={toggleFillColor ? fillColor : defaultColor}
              />
              <path
                d="M21,16c0-6.065,4.935-11,11-11s11,4.935,11,11c0,1.412-0.277,2.758-0.764,4h1.066     C43.746,18.747,44,17.405,44,16c0-6.627-5.372-12-12-12S20,9.373,20,16c0,1.405,0.254,2.747,0.697,4h1.066     C21.277,18.758,21,17.412,21,16z"
                fill={toggleFillColor ? fillColor : defaultColor}
              />
              <path
                d="M31,19.94c-1.316-0.16-2-0.695-2-1.94h2c0,0.633,0.334,1,1,1s1-0.405,1-1c0-0.562-0.423-1-1-1     c-1.969,0-3-1.188-3-2.5c0-1.399,0.674-2.168,2-2.408V10.5h2v1.606c1.326,0.274,2,1.079,2,1.894h-2c0-0.479-0.281-1-1-1     s-1,0.482-1,1c0,0.688,0.438,1.001,1,1.001c2,0,3,1.124,3,2.499c0.025,1.551-0.674,2.225-2,2.425V20h2.127     c0.59-0.589,0.891-1.432,0.873-2.517c0-0.905-0.34-1.819-1.063-2.483H35c0.553,0,1-0.448,1-1c0-1.161-0.763-2.138-2-2.635V10.5     c0-0.552-0.447-1-1-1h-2c-0.553,0-1,0.448-1,1v0.837c-1.297,0.509-2,1.607-2,3.163c0,0.914,0.379,1.833,1.119,2.5H29     c-0.553,0-1,0.448-1,1c0,0.664,0.166,1.416,0.73,2H31V19.94z"
                fill={toggleFillColor ? fillColor : defaultColor}
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -17.3333 32.6538)"
                width="16.263"
                x="22.618"
                y="36.75"
              />
              <rect
                fill={toggleFillColor ? fillColor : defaultColor}
                height="1"
                transform="matrix(0.7071 -0.7071 0.7071 0.7071 -22.7977 27.4614)"
                width="16.263"
                x="13.618"
                y="40.75"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
