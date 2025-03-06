import React, {useContext, createContext, useEffect, useState, Children} from "react";

export const AnalyticsContext = createContext()
export function AnalyticsProvider({children}) {
    const [dailyData,setDailyData] = useState([]);
    useEffect(() => {
        setDailyData(AnalyticsServices()['stats']);
    },[]);
    return(
        <AnalyticsContext.Provider value={{dailyData}}>
            {Children}
        </AnalyticsContext.Provider>
    )
}
export const useAnalytics = () => useContext(AnalyticsContext);