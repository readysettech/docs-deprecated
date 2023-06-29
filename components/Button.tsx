import Link from "next/link";
import React from "react";

export type ILinkProps<PropsWeControl> = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof PropsWeControl
> & {
    href: string;
} & PropsWeControl;

export type IButtonProps<PropsWeControl> = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof PropsWeControl
> &
    PropsWeControl;

export type BaseButtonProps<PropsWeControl = {}> =
    | ILinkProps<PropsWeControl>
    | IButtonProps<PropsWeControl>;

export interface ButtonPropsWeControl {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary";
}

export type ButtonProps = BaseButtonProps<ButtonPropsWeControl>;

export const Button = ({ children, size, color, ...props }: ButtonProps) => {
    const style = color === "secondary" ? "border border-neutral-200 dark:border-neutral-800 text-md font-medium rounded-md px-4 py-2 text-black dark:text-white bg-gradient-to-b from-white dark:from-neutral-900 to-gray-100 dark:to-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:bg-none" : "border border-neutral-900 dark:border-neutral-200 text-white dark:text-black text-md font-medium rounded-md bg-gradient-to-b from-neutral-700 dark:from-neutral-50 to-black dark:to-neutral-100 hover:bg-black dark:hover:bg-neutral-200 px-4 py-2 hover:bg-none";
    if ("href" in props) {
        return (
            <Link {...props}href={props.href} passHref className={style}>
                {children}
            </Link>
        )
    }

    return (
        <button className={style} >
            {children}
        </button>
    )
}