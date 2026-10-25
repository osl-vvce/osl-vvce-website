import React, { useState } from "react"
import HalloweenBannerButton from "./halloween-banner-button"

type ButtonProps = {
    title: string
    to?: string
    type?: any
    label?: string
    disabled?: boolean
    iconLeft?: JSX.Element
    iconRight?: JSX.Element
    onClick?: (e: React.MouseEvent) => void
    className?: string
}

const Button: React.FC<ButtonProps> = props => {
    return <HalloweenBannerButton {...props} />
}

const TextInput = ({ label, type = "text", name, onChange, footer }) => {
    const [focused, changeFocused] = useState(false)

    let elem = (
        <input
            type={type}
            name={name}
            className="block w-full outline-none px-4 py-2 focus:outline-none bg-bg text-color-default"
            onFocus={() => changeFocused(true)}
            onBlur={() => changeFocused(false)}
            onChange={onChange}
            aria-label={name}
        />
    )

    if (type === "textarea") {
        elem = (
            <textarea
                className="block w-full outline-none resize-none px-4 py-2 focus:outline-none bg-bg text-color-default"
                name={name}
                onChange={event => {
                    event.target.style.height = "auto"
                    event.target.style.height = event.target.scrollHeight + "px";

                    onChange(event);
                }}
                onFocus={() => changeFocused(true)}
                onBlur={() => changeFocused(false)}
                aria-label={name}
            />
        )
    }

    return (
        <div
            className={`${
                focused ? "input focused shadow-2xl" : ""
            } transition-all duration-300 py-3 lg:p-4 pb-6`}
        >
            <p className="text-color-3">{label}</p>
            <div className="bg-gradient-primary p-2px">
                {elem}
            </div>
            {footer && 
            <>{footer}</>
            }
        </div>
    )
}

export { Button, TextInput }
