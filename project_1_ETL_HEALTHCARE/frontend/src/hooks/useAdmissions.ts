import { useEffect, useState } from "react";

import { getMonthlyAdmissions } from "../api/analytics";
import type { MonthlyAdmission } from "../types/analytics";

export function useAdmissions() {

    const [data, setData] = useState<MonthlyAdmission[]>([]);

    useEffect(() => {

        getMonthlyAdmissions().then(setData);

    }, []);

    return data;
}