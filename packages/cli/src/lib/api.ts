import axios from "axios";
import { configs } from "../configs";

export const api = axios.create({ baseURL: configs.SERVER_URL });
