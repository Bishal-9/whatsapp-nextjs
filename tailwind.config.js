module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                'fit': 'fit-content'
            }
        },
        minHeight: {
            '90': '90vh',
        },
        flex: {
            '0.45': '1 1 0.45'
        },
        minWidth: {
            '300': '300px'
        },
        maxWidth: {
            '350': '350px'
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}
