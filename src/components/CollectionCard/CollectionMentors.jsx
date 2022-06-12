import React from 'react'

const CollectionMentors = ({ mentors }) => {
    return (
        <div className="avatar-group -space-x-6">
            {/* {JSON.stringify(mentors)} */}
            {mentors.map((mentor, i) => (
                <div className="avatar" key={i}>
                    <div className="w-12">
                        <img src={mentor.imageURL} alt={mentor.name} />
                    </div>
                </div>))}
        </div>
    )
}

export default CollectionMentors