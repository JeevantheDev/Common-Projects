const users: unknown[] = [];

class User {
  static create = (newUser: unknown) => {
    users.push(newUser);
    return newUser;
  };
  static findById = <T extends object>(userId: string, key: keyof T) => {
    return users.find((user) => (user as T)[key] === userId);
  };
}

export default User;
