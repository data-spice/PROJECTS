import { useEffect, useState } from "react";

import { getDiseaseTrends } from "../api/analytics";
import type { DiseaseTrend } from "../types/analytics";

export function useDisease() {

    const [data, setData] = useState<DiseaseTrend[]>([]);

    useEffect(() => {

        getDiseaseTrends().then(setData);

    }, []);

    return data;
}