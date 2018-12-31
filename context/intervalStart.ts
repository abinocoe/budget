import _ from "lodash";
import React from "react";

// const daysAvailable = _.range(1, 31);

// type StartDate = daysAvailable.join(" | ");

// export interface IntervalStartContextI {
//   intervalStartDate: number;
// }

const IntervalStartContext = React.createContext(1);

export default IntervalStartContext;
