// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let url = new URL(window.location.href);

    let keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      const url = new URL(window.location.href);
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắn muốn xoá những sản phẩm này?");
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length) {
      let ids = [];
      inputsChecked.forEach(item => {
        const id = item.value;
        ids.push(id);
      })
      formChangeMulti.querySelector("input[name='ids']").value = ids.join(", ");
      
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
