import { useContext } from "react";
import { ApiConfigContext } from "../context/ApiConfigContext";

export const useApiConfig = () => {
    return useContext(ApiConfigContext);
};

