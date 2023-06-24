import { User } from './entities/user.entity';

const userResponseSerializer = (user: User) => {
  delete user.password;
  delete user.role;
};

export default userResponseSerializer;
