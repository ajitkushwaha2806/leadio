const Title = ({ title, description }) => {
    return (<div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-white">
            {title}
        </h2>
        <p className="text-neutral-600 text-sm dark:text-neutral-400 mt-2">
            {description}
        </p>
    </div>
    )
}

export default Title