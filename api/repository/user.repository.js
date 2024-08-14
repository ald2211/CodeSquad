import User from "../models/user.model.js";
import Token from "../models/token.model.js";
class userRepository {
  async findByEmail(email) {
    return User.aggregate([{ $match: { email } }]);
  }

  async findByIdAndUpdate(userId, updateData) {
    return User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
  }

  async saveUser(newUser) {
    return newUser.save();
  }

  async deleteTokenByUserId(userId) {
    return Token.deleteOne({ userId });
  }

  async deleteUserByEmail(email) {
    return User.deleteOne({ email });
  }

  async saveToken(token) {
    return token.save();
  }

  async findToken(token) {
    return Token.aggregate([{ $match: { token } }]);
  }

  async deleteTokenById(tokenId) {
    return Token.deleteOne({ _id: tokenId });
  }

  async findVerifiedUserByEmail(email) {
    return User.aggregate([{ $match: { email, verified: true } }]);
  }

  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createUser(name, email, hashedPassword, role) {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return newUser.save();
  }

  async createOAuthUser(name, email, hashedPassword, role, photo) {
    const newUser = await User({
      name:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-3),
      email,
      password: hashedPassword,
      verified: true,
      role: role ? "client" : "developer",
      avatar: photo,
    });
    return newUser.save();
  }

  async updateUserVerification(userId) {
    return User.updateOne({ _id: userId }, { $set: { verified: true } });
  }

  //adimin

  async findAllUsers(page, limit, search) {
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};
    query.role = { $ne: "admin" };
    const count = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });
    return { count, users };
  }

  async findUserById(id) {
    return User.findById(id);
  }

  async getAdminId() {
    return User.findOne({ role: "admin" });
  }

  async findCountOfUsers() {
    return await User.aggregate([
      {
        $match: {
          userState: true,
        },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);
  }

  async getDataForChart() {
    return await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  }
}

export default new userRepository();
