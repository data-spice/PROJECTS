import { useEffect, useState } from "react";

import { getBedUtilization } from "../api/analytics";
import type { BedUtilization } from "../types/analytics";

export function useBeds() {

    const [data, setData] = useState<BedUtilization[]>([]);

    useEffect(() => {

        getBedUtilization().then(setData);

    }, []);

    return data;
}