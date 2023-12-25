import jwt from "jsonwebtoken";
// fun for generation of token
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
//# sourceMappingURL=token-manage.js.map