import statusCheck from "./statusCheck.js";
import user from "./user.js";

export default (repository) => ({
  statusCheck,
  user: user(repository.userRepo),
});
