import React from 'react'

const CardActions = ({ bookmarkIcon, num_materials, handleAddToTray }) => {

    return (
        <div className="card-actions">
            <button
                className={`btn btn-square ${!bookmarkIcon ? "btn-outline" : "btn-solid border-secondary"
                    }`}
                onClick={handleAddToTray}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            </button>

            {/* {JSON.stringify(num_materials)} */}
        </div>

    )
}

export default CardActions