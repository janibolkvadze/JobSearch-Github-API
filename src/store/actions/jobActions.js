import "./types";
import { SAVE_JOB } from "./types";

export const saveJob = (payload) => {
    return {
        type: SAVE_JOB,
        payload: payload
    }
}
