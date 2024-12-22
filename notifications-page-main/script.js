/* Creating the DOM */
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data:" + response.statusText);
    }
    return response.json();
  })
  .then((dataJSON) => {
    var json = dataJSON;

    const profileImgs = document.querySelectorAll(".profile-image");
    profileImgs.forEach((profileImg, index) => {
      profileImg.setAttribute("src", json[index].image);
    });

    const messages = document.querySelectorAll(".message");
    messages.forEach((message, index) => {
      if (json[index].subject !== null) {
        if (json[index].read === false) {
          message.innerHTML =
            `<a href="#" class="name">${json[index].name}</a>` +
            json[index].message +
            `<a href="#" class="subject">${json[index].subject}</a>` +
            `<span class="unread-mark"></span>` +
            `<span class="date">${json[index].date}</span>`;

          const listItem = document.querySelector(
            `.notification-list li:nth-of-type(${index + 1})`
          );
          listItem.classList.add("unread");
        } else {
          message.innerHTML =
            `<a href="#" class="name">${json[index].name}</a>` +
            json[index].message +
            `<a href="#" class="subject">${json[index].subject}</a>` +
            `<span class="date">${json[index].date}</span>`;
        }
      } else {
        if (json[index].read === false) {
          message.innerHTML =
            `<a href="#" class="name">${json[index].name}</a>` +
            json[index].message +
            `<a href="#" class="subject">${json[index].date}</a>` +
            `<span class="unread-mark"></span>` +
            `<span class="date">${json[index].date}</span>`;

          const listItem = document.querySelector(
            `.notification-list li:nth-of-type(${index + 1})`
          );
          listItem.classList.add("unread");
        } else {
          message.innerHTML =
            `<a href="#" class="name">${json[index].name}</a>` +
            json[index].message +
            `<a href="#" class="subject">${json[index].date}</a>` +
            `<span class="date">${json[index].date}</span>`;
        }
      }
    });

    const contents = document.querySelectorAll(".content");
    contents.forEach((content, index) => {
      const { content: contentData } = json[index] || {};
      if (contentData) {
        if (
          typeof contentData === "string" &&
          contentData.startsWith("assets/images")
        ) {
          const img = document.createElement("img");
          img.setAttribute("src", contentData);
          content.appendChild(img);
        } else {
          const p = document.createElement("p");
          p.textContent = contentData;
          content.appendChild(p);
        }
      } else {
        content.remove();
      }
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

/* Events */
const allReadBtn = document.querySelector(".all-read-btn");
allReadBtn.addEventListener("click", () => {
  const amount = document.querySelector(".amount div");
  const unreadItems = document.querySelectorAll("li.unread");
  const unreadMarks = document.querySelectorAll(".unread-mark");

  amount.textContent = 0;

  unreadItems.forEach((unreadItem) => {
    unreadItem.classList.remove("unread");
  });
  unreadMarks.forEach((unreadMark) => {
    unreadMark.remove();
  });
});

const notificationList = document.querySelector(".notification-list");

notificationList.addEventListener("click", (event) => {
  const target = event.target;
  const listItem = target.closest("li.unread");

  if (listItem) {
    listItem.classList.remove("unread");

    const unreadMark = listItem.querySelector(".unread-mark");
    if (unreadMark) {
      unreadMark.remove();
    }

    const amount = document.querySelector(".amount div");
    const currentCount = parseInt(amount.textContent, 10);
    if (currentCount > 0) {
      amount.textContent = currentCount - 1;
    }
  }
});
