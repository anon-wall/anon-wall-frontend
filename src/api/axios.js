import axios from "axios";

async function getCounselor(user_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${user_id}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateUser(userId) {
  const res = await axios.patch(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`
  );

  return res;
}

async function updateCounselorSchedule(payload) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${payload.userId}/counselor/availableDates`,
    payload.availableDates,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function deleteCounselorSchedule(userId, id) {
  const res = await axios.delete(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}/counselor/availableDates/${id}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function getCounselList() {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`
  );

  return res;
}

async function getCounsel(counsel_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function getStory(userId) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${userId}`
  );

  return res;
}

async function getReservedCounselList(type, userId, page) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/reserved`,
    {
      params: {
        [type === "counselee" ? "counselee" : "counselor"]: userId,
        page,
      },
      withCredentials: true,
    }
  );

  return res;
}

async function getCounselorSchedule(counselor, user_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/schedules?counselor=${counselor._id}&counselee=${user_id}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function createCounsel(newStory) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
    newStory,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateCounselors(counsel_id, userId) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}/counselors`,
    {
      userId,
    },
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateCounsel(counsel_id, user_id) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}/counselors/${user_id}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

export {
  getCounselor,
  updateUser,
  updateCounselorSchedule,
  deleteCounselorSchedule,
  getCounselList,
  getCounsel,
  getStory,
  getReservedCounselList,
  getCounselorSchedule,
  createCounsel,
  updateCounselors,
  updateCounsel,
};
