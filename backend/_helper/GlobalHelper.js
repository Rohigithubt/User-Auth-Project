const bcrypt = require("bcryptjs");
module.exports = {
  securePassword,
};
async function securePassword(password) {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error in hashing password:', error);
        throw error; 
    }
  }