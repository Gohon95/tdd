import userRepo from "./userRepo.js";

export default (model) => ({
  userRepo: userRepo(model.User),
});
