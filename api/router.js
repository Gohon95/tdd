export default (controlers, app) => {
  app.get("/statusCheck", controlers.statusCheck.getStatus);
  app.get("/users", controlers.user.listUsers);
  app.post("/users", controlers.user.createUser);
  app.get("/users/:id", controlers.user.getUser);
  app.put("/users/:id", controlers.user.updateUser);
  app.delete("/users/:id", controlers.user.deleteUser);
};
