


const handleDeletePost = async (id) => {
    console.log("called handledeletepost " + id)
    await fetch(`/api/post/${id}`, {
        method: "DELETE"
    }).then((_res) => {
        window.location.href = "/"
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleDeleteComment = async (id) => {
    console.log("called handledeletecomment " + id)
    await fetch(`/api/comment/${id}`, {
        method: "DELETE"
    }).then((_res) => {
        window.location.href = "/"
    })
}

const handleEditPost = async (id) => {
    console.log("called handleeditpost " + id)
    // await fetch(`/post/${id}`, {
    //     method: "PUT"
    // }).then((_res) => {
    //     window.location.href = "/"
    // })
}

const confirm = (title, text, callbackfn) => {
    let confirmDialog = $(`
    <div class="modal fade" id="deletePostDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">${title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${text}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancelButton" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary confirmButton">Yes</button>
                </div>
            </div>
        </div>
    </div>
    `)

    confirmDialog.find(".confirmButton").on("click", function () {
        callbackfn();
        confirmDialog.modal("hide");
    })

    confirmDialog.modal("show");
}





$(".deletePostButton").on('click', (event) => {
    let id = event.target.getAttribute("data-id");
    confirm("Delete Post", "Are you sure you want to delete this post?", () => {
        handleDeletePost(id)
    })
})

$(".deleteCommentButton").on('click', (event) => {
    let id = event.target.getAttribute("data-id");
    confirm("Delete Comment", "Are you sure you want to delete this comment?", () => {
        handleDeleteComment(id)
    })
})
