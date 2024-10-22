import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
            }
        }
    },
    plugins: [],
    safelist: [
        {
            pattern: /grid-cols-.+/
        },
        {
            pattern: /grid-rows-.+/
        },
        {
            pattern: /row-start-.+/
        },
        {
            pattern: /col-start-.+/
        }
    ]
}

export default config
