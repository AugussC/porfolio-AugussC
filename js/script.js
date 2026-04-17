function openImage(img) {
    const carousel = img.closest(".carousel");
    if (!carousel) return;

    const items = carousel.querySelectorAll(".carousel-item img");
    const modalInner = document.getElementById("modalCarouselInner");

    if (!modalInner) return;

    modalInner.innerHTML = "";

    items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item");

        if (item.src === img.src) {
            div.classList.add("active");
        }

        const newImg = document.createElement("img");
        newImg.src = item.src;
        newImg.className = "d-block w-100";
        newImg.style.height = "100%";
        newImg.style.objectFit = "contain";

        div.appendChild(newImg);
        modalInner.appendChild(div);
    });

    const modalElement = document.getElementById("imageModal");
    // eslint-disable-next-line no-undef
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}