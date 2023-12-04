export const isAdmin = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization);

    const token = authorization.split(" ")[1];
  
    if (token) {
      try {
        const decode = verifyToken(token);
        console.log(222222, decode);
        if (decode.role != 1) {
          return res.status(401).json({
            message: "Unauthorized",
            errors: {
              auth: "Token is expired or invalid",
            },
          });
        }
        return next();
      } catch (error) {
        return res.status(401).json({
          message: "Unauthorized",
          errors: {
            auth: "You not authorized to access this",
          },
        });
      }
    }
  
    return res.status(401).json({
      message: "Unauthorized",
      errors: {
        auth: "Token is invalid",
      },
    });
  };