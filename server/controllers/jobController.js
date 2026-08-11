const db = require("../config/db");

// =====================================================
// GET ALL JOBS
// =====================================================

const getJobs = (req, res) => {
  const sql = "SELECT * FROM jobs ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Get Jobs Error:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result);
  });
};

// =====================================================
// ADD JOB
// =====================================================

const addJob = (req, res) => {
  const {
    company,
    role,
    description,
    skills,
    salary,
    location,
    jobType,
    applyLink,
    lastDate,
    logo,
  } = req.body;

  const sql = `
    INSERT INTO jobs
    (
      company,
      role,
      description,
      skills,
      salary,
      location,
      jobType,
      applyLink,
      lastDate,
      logo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      company,
      role,
      description,
      skills,
      salary,
      location,
      jobType,
      applyLink,
      lastDate,
      logo,
    ],
    (err) => {
      if (err) {
        console.log("Add Job Error:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Job Added Successfully",
      });
    }
  );
};

// =====================================================
// UPDATE JOB
// =====================================================

const updateJob = (req, res) => {
  const {
    company,
    role,
    description,
    skills,
    salary,
    location,
    jobType,
    applyLink,
    lastDate,
    logo,
  } = req.body;

  const sql = `
    UPDATE jobs
    SET
      company = ?,
      role = ?,
      description = ?,
      skills = ?,
      salary = ?,
      location = ?,
      jobType = ?,
      applyLink = ?,
      lastDate = ?,
      logo = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      company,
      role,
      description,
      skills,
      salary,
      location,
      jobType,
      applyLink,
      lastDate,
      logo,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.log("Update Job Error:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Job Updated Successfully",
      });
    }
  );
};

// =====================================================
// DELETE JOB
// =====================================================

const deleteJob = (req, res) => {
  const sql = "DELETE FROM jobs WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log("Delete Job Error:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      message: "Job Deleted Successfully",
    });
  });
};

// =====================================================
// APPLY FOR JOB
// =====================================================

const applyJob = (req, res) => {
  const { userId, jobId } = req.body;

  console.log("Apply Request:", {
    userId,
    jobId,
  });

  if (!userId || !jobId) {
    return res.status(400).json({
      message: "User ID and Job ID are required",
    });
  }

  // Check whether already applied
  const checkQuery = `
    SELECT *
    FROM applications
    WHERE user_id = ? AND job_id = ?
  `;

  db.query(
    checkQuery,
    [userId, jobId],
    (err, result) => {
      if (err) {
        console.log("Check Application Error:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "You already applied for this job",
        });
      }

      // Insert application
      const insertQuery = `
        INSERT INTO applications
        (user_id, job_id, status)
        VALUES (?, ?, 'Applied')
      `;

      db.query(
        insertQuery,
        [userId, jobId],
        (err, result) => {
          if (err) {
            console.log(
              "Apply Job Error:",
              err
            );

            return res.status(500).json({
              message: err.message,
            });
          }

          console.log(
            "✅ Application Saved:",
            result.insertId
          );

          res.status(201).json({
            message: "Application submitted successfully",
            applicationId: result.insertId,
          });
        }
      );
    }
  );
};

// =====================================================
// GET USER APPLICATIONS
// =====================================================

const getUserApplications = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT
      applications.id,
      applications.user_id,
      applications.job_id,
      applications.status,
      applications.applied_at,

      jobs.company,
      jobs.role,
      jobs.location,
      jobs.jobType,
      jobs.applyLink

    FROM applications

    INNER JOIN jobs
      ON applications.job_id = jobs.id

    WHERE applications.user_id = ?

    ORDER BY applications.id DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(
        "Get Applications Error:",
        err
      );

      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result);
  });
};

// =====================================================
// GET DASHBOARD STATS
// =====================================================

const getDashboardStats = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT
      COUNT(*) AS totalApplications,

      SUM(
        CASE
          WHEN status = 'Interview'
          THEN 1
          ELSE 0
        END
      ) AS interviews,

      SUM(
        CASE
          WHEN status = 'Offer'
          THEN 1
          ELSE 0
        END
      ) AS offers

    FROM applications

    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(
        "Dashboard Stats Error:",
        err
      );

      return res.status(500).json({
        message: err.message,
      });
    }

    const stats = result[0];

    res.json({
      totalApplications:
        Number(stats.totalApplications) || 0,

      interviews:
        Number(stats.interviews) || 0,

      offers:
        Number(stats.offers) || 0,
    });
  });
};

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

const updateApplicationStatus = (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid application status",
    });
  }

  const sql = `
    UPDATE applications
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, applicationId],
    (err, result) => {
      if (err) {
        console.log(
          "Update Application Status Error:",
          err
        );

        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.json({
        message:
          "Application status updated successfully",
      });
    }
  );
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getJobs,
  addJob,
  updateJob,
  deleteJob,

  applyJob,
  getUserApplications,
  getDashboardStats,
  updateApplicationStatus,
};