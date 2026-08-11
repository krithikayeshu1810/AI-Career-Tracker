import axios from "axios";

const API = "http://localhost:5000/api/jobs";

// Get All Jobs
export const getJobs = async () => {
  return await axios.get(API);
};

// Add Job
export const addJob = async (jobData) => {
  return await axios.post(API, jobData);
};

// Update Job
export const updateJob = async (id, jobData) => {
  return await axios.put(`${API}/${id}`, jobData);
};

// Delete Job
export const deleteJob = async (id) => {
  return await axios.delete(`${API}/${id}`);
};