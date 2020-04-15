import { getData } from "../data";

export const getBase = async () => {
    try {
        return await getData();
    } catch (e) {
        return e
    }
}