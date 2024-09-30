import { WORKER_DID_URL } from "@dragverse/constants";
import axios from "axios";

export const resolveDid = async (addresses: string[]) => {
  try {
    const response = await axios.post(WORKER_DID_URL, {
      addresses: addresses.map((address) => address.split("/")[0])
    });
    return response.data.dids;
  } catch {
    return [];
  }
};
