
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				roadsaver: {
					primary: '#9B87F5',
					green: '#8BC34A',
					red: '#EA384C',
					blue: '#0EA5E9',
					darkGray: '#333333',
					lightGray: '#F1F1F1',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
        'deflate-wobble': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(0.9) rotate(3deg)' },
          '50%': { transform: 'scale(0.8) rotate(-3deg)' },
          '75%': { transform: 'scale(0.85) rotate(1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        },
        'fuel-flash-red': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7468%) hue-rotate(357deg) brightness(95%) contrast(118%)' }
        },
        'fuel-pulse-flash': {
          '0%, 100%': { 
            transform: 'scale(1)', 
            filter: 'brightness(1)' 
          },
          '25%': { 
            transform: 'scale(1.1)', 
            filter: 'brightness(1)' 
          },
          '50%': { 
            transform: 'scale(1.05)', 
            filter: 'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7468%) hue-rotate(357deg) brightness(95%) contrast(118%)' 
          },
          '75%': { 
            transform: 'scale(1.1)', 
            filter: 'brightness(1)' 
          }
        },
        'fuel-sputter-flash': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)', color: 'currentColor', opacity: '1' },
          '20%': { transform: 'translateX(-2px) rotate(-3deg)' },
          '40%': { transform: 'translateX(2px) rotate(3deg)' },
          '60%': { transform: 'translateX(-1px) rotate(-2deg)', color: 'theme("colors.roadsaver.red")', opacity: '0.7' },
          '80%': { transform: 'translateX(1px) rotate(2deg)' }
        },
        'battery-flash-red': {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
          },
          '25%': { 
            transform: 'scale(1.05)',
            filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
          },
          '50%': { 
            transform: 'scale(1.1)',
            filter: 'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(7468%) hue-rotate(357deg) brightness(95%) contrast(118%)'
          },
          '75%': { 
            transform: 'scale(1.05)',
            filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)'
          }
        },
        'wrench-turn': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        'truck-pull': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '30%': { transform: 'translateX(3px)' },
          '60%': { transform: 'translateX(2.5px)' },
          '90%': { transform: 'translateX(-1px)' },
        },
        'phone-ring': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-10deg)' },
          '20%, 40%, 60%, 80%': { transform: 'rotate(10deg)' },
        },
        'emergency-alert-flash': {
          '0%, 100%': { transform: 'scale(1)', color: 'currentColor' },
          '50%': { transform: 'scale(1.1)', color: 'theme("colors.red.400")' }
        },
        'map-pin-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        'settings-gear-turn': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(15deg)' }
        },
        'globe-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' }
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'deflate-wobble': 'deflate-wobble 2s ease-in-out infinite',
        'fuel-flicker': 'fuel-flicker 1.2s ease-in-out infinite',
        'fuel-flash-red': 'fuel-flash-red 1.5s ease-in-out infinite',
        'fuel-pulse-flash': 'fuel-pulse-flash 2s ease-in-out infinite',
        'fuel-sputter-flash': 'fuel-sputter-flash 1.8s ease-in-out infinite',
        'battery-flash-red': 'battery-flash-red 1.2s ease-in-out infinite',
        'wrench-turn': 'wrench-turn 2.5s ease-in-out infinite alternate',
        'truck-pull': 'truck-pull 2.2s ease-in-out infinite',
        'phone-ring': 'phone-ring 1.3s ease-in-out infinite',
        'emergency-alert-flash': 'emergency-alert-flash 1s ease-in-out infinite',
        'map-pin-bob': 'map-pin-bob 1.5s ease-in-out infinite alternate',
        'settings-gear-turn': 'settings-gear-turn 2.5s ease-in-out infinite alternate',
        'globe-pulse': 'globe-pulse 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
