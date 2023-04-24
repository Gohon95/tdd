import { v4 as uuidv4 } from "uuid";

export default (User) => {
  const users = [
    new User(
      uuidv4(),
      "Paul",
      "Jean",
      "13/08/2000",
      "24 passage poudlard",
      "+3378145685",
      "paul.test@hotmail.fr"
    ),
    new User(
      uuidv4(),
      "Louis",
      "Jeanpaul",
      "13/08/2001",
      "24 passage toutatis",
      "+3378145685",
      "louis.test@hotmail.fr"
    ),
  ];

  const listUsers = () => {
    return users;
  };

  const createUser = (user) => {
    users.push(
      new User(
        users.id,
        users.lastName,
        users.firstName,
        users.birthDate,
        users.address,
        users.phone,
        users.email
      )
    );
    return user;
  };

  const findUser = (res) => {
    return users.find((user) => user.id === res);
  };

  const updateUser = (id, user) => {
    let foundUserIdx = 0;
    users.forEach((user, idx) => {
      if (user.id === id) {
        foundUserIdx = idx;
      }
    });

    if (foundUserIdx > 0) {
      users[foundUserIdx] = new User(
        users.id,
        users.lastName,
        users.firstName,
        users.birthDate,
        users.address,
        users.phone,
        users.email
      );
      return user;
    }

    return null;
  };

  const deleteUser = (id) => {
    let userToDeleteIndex = users.findIndex((b) => b.id === id);
    let deletedUser = users.splice(userToDeleteIndex, 1);

    return deletedUser;
  };

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser,
  };
};
