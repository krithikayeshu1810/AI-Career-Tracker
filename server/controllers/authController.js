const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    console.log("Received Registration Data:", req.body);

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check email
    const checkQuery =
      "SELECT * FROM users WHERE email = ?";

    db.query(
      checkQuery,
      [email],
      async (err, result) => {
        if (err) {
          console.log("Check Error:", err);

          return res.status(500).json({
            message: err.message,
          });
        }

        // Email already exists
        if (result.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        // Hash password
        const hashedPassword =
          await bcrypt.hash(password, 10);

        // Insert user
        const insertQuery = `
          INSERT INTO users
          (fullname, email, password)
          VALUES (?, ?, ?)
        `;

        db.query(
          insertQuery,
          [
            fullname,
            email,
            hashedPassword,
          ],
          (err, result) => {
            if (err) {
              console.log(
                "Insert Error:",
                err
              );

              return res.status(500).json({
                message: err.message,
              });
            }

            console.log(
              "✅ User Registered Successfully"
            );

            res.status(201).json({
              message:
                "Registration Successful",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log("Register Catch Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request:", email);

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    const sql =
      "SELECT * FROM users WHERE email = ?";

    db.query(
      sql,
      [email],
      async (err, result) => {
        if (err) {
          console.log(
            "Login Database Error:",
            err
          );

          return res.status(500).json({
            message: err.message,
          });
        }

        // User doesn't exist
        if (result.length === 0) {
          return res.status(400).json({
            message: "User not found",
          });
        }

        const user = result[0];

        // Check password
        const isMatch =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }

        // Create JWT
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        console.log(
          "✅ Login Successful:",
          user.email
        );

        res.status(200).json({
          message: "Login Successful",
          token,
          user,
        });
      }
    );
  } catch (error) {
    console.log(
      "Login Catch Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= EXPORT =================

module.exports = {
  registerUser,
  loginUser,
};