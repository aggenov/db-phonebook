const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env;

const authentificate = async (req, res, next) => {
  const { authentificate } = req.header;
  const [bearer, token] = authentificate.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({ message: " Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !token || user.token !== token) {
      return res.status(401).json({ message: " Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authentificate;
