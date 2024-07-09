import User from "../models/user.model.js";
import Token from "../models/token.model.js";
class userRepository{

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

        async createOAuthUser(name,email,hashedPassword,role,photo){
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

        async findAllUsers(page,limit){
          
         const users=await User.find({role:{$ne:'admin'}})
          .skip((page - 1) * limit)
          .limit(limit)
          const count=await User.countDocuments()
          console.log('users:',users,'count:',count)
          return {count,users}
        }

        async findUserById(id){
          return User.findById(id)
        }
}

export default new userRepository()


  