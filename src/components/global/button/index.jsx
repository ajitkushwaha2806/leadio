import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { baseStyles, sizes, variants } from "./helper/constants";

export default function Button({ text, icon, onClick, href, variant = "primary", size = "md", className = "", iconSize = 18, isLoading = false, loadingText = "", disabled = false, ...props }) {
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;
    const combinedClasses = cn(baseStyles, variantClass, sizeClass, className, (isLoading || disabled) && "opacity-70 cursor-not-allowed");

    const IconComponent = icon?.icon;
    const iconPosition = icon?.position || "start";

    const content = isLoading ? (
        <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={iconSize} />
            {loadingText && <span>{loadingText}</span>}
        </span>
    ) : (
        <>
            {iconPosition === "start" && IconComponent && <IconComponent size={iconSize} />}
            {text && <span>{text}</span>}
            {iconPosition === "end" && IconComponent && <IconComponent size={iconSize} />}
        </>
    );

    if (href && !isLoading && !disabled) {
        return (
            <Link href={href} onClick={onClick} className={combinedClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={combinedClasses}
            {...props}
        >
            {content}
        </button>
    );
}
