type ButtonProps = {
    onClick?: () => void
    config: Partial<ButtonConfig>
}

type ButtonConfig = {
    theme: "blue" | "gray"
    disabled: boolean
    text: string
}

export default function Button({ onClick, config }: ButtonProps) {
    let themeClass: string

    switch (config.theme ?? "blue") {
        case "blue":
            themeClass = "bg-blue-500 shadow-blue-500 hover:bg-blue-600 disabled:bg-blue-200 disabled:hover:bg-blue-200"
            break
        case "gray":
            themeClass = "bg-gray-400 shadow-gray-400 hover:bg-gray-500 disabled:bg-gray-100 disabled:hover:bg-gray-100"
            break
    }
    return (
        <button
            disabled={config.disabled ?? false}
            onClick={onClick}
            className={`
                w-28 h-10 rounded-md
                text-white font-medium
                transition-all
                ${config.disabled ?? false? "cursor-not-allowed" : "hover:drop-shadow-xl drop-shadow-md"}
                ${themeClass}
            `}
        >
            {config.text ?? "Default Text"}
        </button>
    )
}
