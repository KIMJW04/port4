/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        loader__circle: 'orbit 5.5s infinite',
        marquee: 'marquee 10s linear infinite',
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
        'fade-out-down': 'fade-out-down 0.4s ease-in forwards',
      },
      backgroundImage: {
        Loading_Bg: "url('/assets/img/Loading_bg.jpg')", // 사용자 정의 배경 이미지
        bg_1: "url('/assets/img/bg1.jpg')", // 사용자 정의 배경 이미지
        bg_2: "url('/assets/img/window_bg.jpg')", // 사용자 정의 배경 이미지
        logo: "url('/assets/img/star.svg')", // 사용자 정의 배경 이미지
        footer_1: "url('/assets/img/nib.jpg')", // 사용자 정의 배경 이미지
        footer_2: "url('/assets/img/youtube.png')", // 사용자 정의 배경 이미지
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(225deg)',
            opacity: 1,
            animationTimingFunction: 'ease-out',
          },
          '7%': {
            transform: 'rotate(345deg)',
            animationTimingFunction: 'linear',
          },
          '30%': {
            transform: 'rotate(455deg)',
            animationTimingFunction: 'ease-in-out',
          },
          '39%': {
            transform: 'rotate(690deg)',
            animationTimingFunction: 'linear',
          },
          '70%': {
            transform: 'rotate(815deg)',
            opacity: 1,
            animationTimingFunction: 'ease-out',
          },
          '75%': {
            transform: 'rotate(945deg)',
            animationTimingFunction: 'ease-out',
          },
          '76%': {
            transform: 'rotate(945deg)',
            opacity: 0,
          },
          '100%': {
            transform: 'rotate(945deg)',
            opacity: 0,
          },
        },
        'fade-in-up': {
          '0%': {
            top: "50%",
            opacity: 0,
            transform: 'translateY(-45%)'
          },
          '100%': {
            top: "50%",
            opacity: 1,
            transform: 'translateY(-50%)'
          },
        },
        'fade-out-down': {
          '0%': {
            top: "50%",
            opacity: 1,
            transform: 'translateY(-50%)'
          },
          '100%': {
            top: "50%",
            opacity: 0,
            transform: 'translateY(-45%)',
            visibility: 'hidden'
          }
        },
      },
      colors: {
        'MusicPlayer-primary': '#49654D',
        'MusicPlayer-secondary': '#8BA989',
        'MusicPlayer-white': '#FFFFFF',
        'MusicPlayer-light': '#C0CFB2',
        'MusicPlayer-dark': '#364F3C',
        pointBg: "#171719",
        black: {
          DEFAULT: "#000",
          100: "#111",
          200: "#222",
          300: "#333",
          400: "#444",
          500: "#555",
          600: "#666",
          700: "#797979",
        },
        gray: {
          DEFAULT: "#ccc",
          100: "#c0c0c0",
        },
      },
      fontFamily: {
        neogeo: ["NeoGeoTrial"],
        Chomsky: ["Chomsky"],
        eulyoo1945: ["eulyoo1945"],
        ChosunNm: ["ChosunNm"],
        GmarketSans: ["GmarketSans"],
        nanumSquareNeo: ["nanumSquareNeo"],
      },
      backgroundOpacity: {
        'MusicPlayer-85': '0.85',
      },
      transformOrigin: {
        'footer_40%_70%': '40% 70%',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
      scale: ['hover'],
    },
  },
  plugins: [],
};
