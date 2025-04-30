
import "./TypingLoader.css"

interface Props {
  className?: string
  description?: string
}

export const TypingLoader = ({ className, description }: Props) => {
  return (
    <>
      <div className={`${className} typing-loader`}>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
      </div>

      {description && (
        <div className="text-gray-600 text-base text-center mt-8">
          {description}
        </div>
      )}
    </>
  )
}
