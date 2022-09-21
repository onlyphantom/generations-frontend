import React from "react";

const CardTags = ({ tagsCount }) => {

    const tagClass = {
        postgresql: "badge-outline",
        python: "badge-primary",
        sql: "badge-secondary",
        r: "badge-info",
        react: "badge-ghost",
        django: "badge-error",
        other: "badge-warning"
    };
    
    const result = Object.keys(tagsCount).map(tag => {
        return(
            <div className={`badge badge-md ${Object.keys(tagClass).includes(tag) ? tagClass[tag] : tagClass["other"]} mx-1 tooltip`} data-tip="Tag Award" key={tag}>
                {tagsCount[tag] > 1 ? `${tag} x ${tagsCount[tag]}` : tag}
            </div>
        )
    });

    return result;

};

export default CardTags;
