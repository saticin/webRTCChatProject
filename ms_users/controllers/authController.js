import { db } from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // console.log(req.body);
  // const sql =
  // "INSERT INTO `users` (`username`, `password`) VALUES ('vishva', '123456')";
  const sql = "select * from users where username=?";

  db.query(sql, [req.body.username], (err, data) => {
    if (err) {
      console.log("Error from mysql:", err);
      return res.status(500).json(err);
    }
    if (data.length) return res.status(409).json("User already exist");
    const salt_pwd = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt_pwd);
    const slq_inserQ =
      "insert into users (`username`,`password`,`email`,`firstname`,`lastname`,`mobile`) VALUES (?)";
    const value_List = [
      req.body.username,
      hashedPassword,
      req.body.email,
      req.body.firstname,
      req.body.lastname,
      req.body.mobile,
    ];
    db.query(slq_inserQ, [value_List], (err, data) => {
      if (err) {
        console.log("Error : ", err);
        return res.status(500).json();
      }
      return res.status(200).json("New user created successfully");
    });
  });
};
export const loging = (req, res) => {
  const sql1_user = "select * from users where username=?";
  db.query(sql1_user, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) return res.status(404).json("user not found");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) return res.status(400).json("Invalied password");

    const token = jwt.sign({ id: data[0].userid }, "secretkey");
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json([others, token, data[0].userid]);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToke", {
      seucre: true,
      sameSite: "none",
    })
    .status(200)
    .json("User log out..");
};
export const authenticateuser = (req, res) => {
  //const token = jwt.sign({ id: req.body.uid }, "secretkey");
  const res_Token = req.body.token;
  if (res_Token) {
    jwt.verify(res_Token, "secretkey", (err, data) => {
      if (err) {
        return res.status(403).json("Invalied Token");
      } else {
        return res.status(200).json("Ok");
      }
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
};
