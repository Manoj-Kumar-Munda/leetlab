import jwt from "jsonwebtoken";
import { AvailableRoles } from "../utils/contants";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: "Invalid token" });
  }
};

export const checkAdmin = (req, res, next) => {
  try {
    const UserRole = req.user?.role;
    if (UserRole !== AvailableRoles) {
      return res
        .status(403)
        .json({
          success: false,
          error: "Access denied. Admins only.",
        });
    }
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    return res.status(403).json({
      success: false,
      error: "Error checking admin role",
    });
    
  }
};

export default verifyToken;
