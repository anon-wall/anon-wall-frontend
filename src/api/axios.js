import axios from "axios";

async function getCounselor(userId) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateCounselor({ userId, newCounselorInfo }) {
  const res = await axios.patch(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}`,
    newCounselorInfo,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateCounselorSchedule({ userId, availableDates }) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}/counselor/availableDates`,
    availableDates,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function deleteCounselorSchedule({ userId, dateId }) {
  const res = await axios.delete(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${userId}/counselor/availableDates/${dateId}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function getCounselList({ options }) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
    options
  );

  return res;
}

async function getCounsel({ counselId }) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counselId}`,
    {
      withCredentials: true,
    }
  );

  return res;
}

async function getReservedCounselList({ type, userId, page }) {
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

async function getCounselorSchedule({ counselorId, userId }) {
  const res = await axios.get(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/schedules?counselor=${counselorId}&counselee=${userId}`,
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

async function updateCounselors({ counselId, userId }) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counselId}/counselors`,
    {
      userId,
    },
    {
      withCredentials: true,
    }
  );

  return res;
}

async function updateCounsel({ counselId, userId, startDate, endDate }) {
  const res = await axios.post(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counselId}/counselors/${userId}`,
    {
      startDate,
      endDate,
    },
    {
      withCredentials: true,
    }
  );

  return res;
}

export {
  getCounselor,
  updateCounselor,
  updateCounselorSchedule,
  deleteCounselorSchedule,
  getCounselList,
  getCounsel,
  getReservedCounselList,
  getCounselorSchedule,
  createCounsel,
  updateCounselors,
  updateCounsel,
};
