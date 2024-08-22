
export default function LoadingCircles() {
    return (
        <div className="h-[20svh]">
            <svg className="h-[10svh] justify-self-end fill-cyan-300">
                    <circle cy="50%" cx="40%" r="10" >
                        <animate
                            attributeName="opacity"
                            begin="0s"
                            dur="0.9s"
                            from="0"
                            to="1"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cy="50%" cx="50%" r="10" >
                        <animate
                            attributeName="opacity"
                            begin="0.3s"
                            dur="0.9s"
                            from="0"
                            to="1"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cy="50%" cx="60%" r="10" >
                        <animate
                            attributeName="opacity"
                            begin="0.6s"
                            dur="0.9s"
                            from="0"
                            to="1"
                            repeatCount="indefinite"
                        />
                    </circle>
            </svg>
        </div>
    )
}