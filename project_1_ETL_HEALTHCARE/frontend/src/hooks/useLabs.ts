import { useEffect, useState } from "react";

import { getLabWorkload } from "../api/analytics";
import type { LabWorkload } from "../types/analytics";

export function useLab() {

    const [data, setData] = useState<LabWorkload[]>([]);

    useEffect(() => {

        getLabWorkload().then(setData);

    }, []);

    return data;
}