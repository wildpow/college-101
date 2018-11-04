import React from "react";

const ClassViewer = props => {
  const { datesAndClassSizes, date } = props;
  return (
    <div>
      <h1>hellosdfsfefweewfwefewfewfwefweff</h1>

      {datesAndClassSizes.map(poop => {
        const duddy = new Date(poop.startDate);
        if (
          date.getMonth() === duddy.getMonth() &&
          date.getDate() === duddy.getDate() &&
          date.getFullYear() === duddy.getFullYear()
        ) {
          return (
            <h1>
              true
              {console.log("TRUE date from GraphCMS", duddy)}
              {console.log("TRUE date from calendar", date)}
            </h1>
          );
        }
        return (
          <h2>
            false
            {console.log("FALSE date from GraphCMS", duddy)}
            {console.log("FALSE date from calendar", date)}
          </h2>
        );
      })}
    </div>
  );
};

export default ClassViewer;
