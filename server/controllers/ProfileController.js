const db = require("../config/db");

// ================= UPDATE PROFILE =================

const updateProfile = (req, res) => {
  console.log("=================================");
  console.log("UPDATE PROFILE REQUEST");
  console.log("Received Data:", req.body);
  console.log("=================================");

  const {
    id,
    fullname,
    email,
    phone,
    location,
    dob,
    college,
    degree,
    graduation,
    cgpa,
    github,
    linkedin,
  } = req.body;

  // Check ID
  if (!id) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  // Check required fields
  if (!fullname || !email) {
    return res.status(400).json({
      message: "Full name and email are required",
    });
  }

  // Check if another user already has this email
  const checkEmailQuery = `
    SELECT id
    FROM users
    WHERE email = ? AND id != ?
  `;

  db.query(
    checkEmailQuery,
    [email, id],
    (err, emailResult) => {
      if (err) {
        console.log("Email Check Error:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      // Email belongs to another user
      if (emailResult.length > 0) {
        return res.status(400).json({
          message: "This email is already used by another account",
        });
      }

      // ================= UPDATE =================

      const updateQuery = `
        UPDATE users
        SET
          fullname = ?,
          email = ?,
          phone = ?,
          location = ?,
          dob = ?,
          college = ?,
          degree = ?,
          graduation = ?,
          cgpa = ?,
          github = ?,
          linkedin = ?
        WHERE id = ?
      `;

      const values = [
        fullname,
        email,
        phone || null,
        location || null,
        dob || null,
        college || null,
        degree || null,
        graduation || null,
        cgpa || null,
        github || null,
        linkedin || null,
        id,
      ];

      console.log("Updating User ID:", id);

      db.query(
        updateQuery,
        values,
        (err, result) => {
          if (err) {
            console.log("❌ UPDATE ERROR:");
            console.log(err);

            return res.status(500).json({
              message: err.message,
            });
          }

          console.log(
            "Rows Updated:",
            result.affectedRows
          );

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "User not found",
            });
          }

          // ================= GET UPDATED USER =================

          const getUserQuery = `
            SELECT
              id,
              fullname,
              email,
              phone,
              location,
              dob,
              college,
              degree,
              graduation,
              cgpa,
              github,
              linkedin,
              created_at
            FROM users
            WHERE id = ?
          `;

          db.query(
            getUserQuery,
            [id],
            (err, users) => {
              if (err) {
                console.log(
                  "Get Updated User Error:",
                  err
                );

                return res.status(500).json({
                  message: err.message,
                });
              }

              if (users.length === 0) {
                return res.status(404).json({
                  message: "User not found",
                });
              }

              console.log(
                "✅ Profile Updated Successfully"
              );

              return res.status(200).json({
                message:
                  "Profile updated successfully",
                user: users[0],
              });
            }
          );
        }
      );
    }
  );
};

// ================= GET PROFILE =================

const getProfile = (req, res) => {
  const { id } = req.params;

  console.log("Getting profile for user:", id);

  const sql = `
    SELECT
      id,
      fullname,
      email,
      phone,
      location,
      dob,
      college,
      degree,
      graduation,
      cgpa,
      github,
      linkedin,
      created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("❌ GET PROFILE ERROR:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("✅ Profile Found");

    res.status(200).json({
      user: result[0],
    });
  });
};

module.exports = {
  updateProfile,
  getProfile,
};