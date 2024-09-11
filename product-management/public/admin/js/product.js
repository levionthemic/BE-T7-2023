// Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const idCurrent = button.getAttribute("data-id");

      let statusChange = statusCurrent === "active" ? "inactive" : "active";
    
      const action = path + `/${statusChange}/${idCurrent}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}


// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xoá sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = path + "/" + id + "?_method=DELETE";
        formDeleteItem.action = action;

        formDeleteItem.submit();
      } else {}
    })
  })
}
