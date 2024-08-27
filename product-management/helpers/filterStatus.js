module.exports = (query) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "active"
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];
  if (query.status) {
    filterStatus.map(status => {
      if (status.status == query.status) {
        status.class = "active";
      } else {
        status.class = "";
      }
      return status;
    });
  } else {
    filterStatus[0].class = "active";
  }

  return filterStatus;
}