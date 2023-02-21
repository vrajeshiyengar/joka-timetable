import config from "./config";
export default {
  getUsersIds: `${config[`${config.ENV}_BASE_URL`]}getUserIds`,
};
