import axios from "axios";

async function updateUser(userId) {
  const res = await axios.patch(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`
  );

  return res;
}

async function createCounsel() {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`
  );

  return res;
}

async function getCounsel(counsel_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}`
  );

  return res;
}

async function getStory(userId) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${userId}`
  );

  return res;
}

async function getCounselList() {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`
  );

  return res;
}

async function getCounselor(user_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${user_id}`
  );

  return res;
}

async function getReservedCounselList() {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/reserved`
  );

  return res;
}

async function deleteCounselorSchedule(userId, id) {
  const res = await axios.delete(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}/counselor/availableDates/${id}`
  );

  return res;
}

export default {
  updateUser,
  createCounsel,
  getCounsel,
  getStory,
  getCounselList,
  getCounselor,
  getReservedCounselList,
  deleteCounselorSchedule,
};
