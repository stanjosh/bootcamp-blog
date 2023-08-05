


const handleDeletePost = async (id, postUserId) => {
    console.log("called handledeletepost " + id)
    await fetch(`/post/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            user_id: postUserId,
            comment_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((_res) => {
        window.location.href = "/"
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleDeleteComment = async (id, commentUserId) => {
    console.log("called handledeletecomment " + id)
    await fetch(`/comment/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            user_id: commentUserId,
            comment_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((_res) => {
        window.location.href = "/"
    })
}

const handleEditPost = async (id) => {
    console.log("called handleeditpost " + id)
    let title = $("#postTitle").val();
    let text = $("#postContent").val();
    await fetch(`/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title: title,
            text: text
        }),
        headers: {
            "Content-Type": "application/json"
        }
        .then((_res) => {
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err)
        })
    })
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



const editContent = (id=null, content=null, title=null) => {
    let editContentDialog = $(`
    <div class="modal fade" id="deletePostDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel"><textarea name="postTitle">${title}</textarea></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <textarea name="postContent">${content}</textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary cancelButton" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary confirmButton">Yes</button>
                </div>
            </div>
        </div>
    </div>
    `)

    editContentDialog.find(".confirmButton").on("click", function () {
        handleEditPost(id)
        editContentDialog.modal("hide");
    })

    editContentDialog.modal("show");
}

$(".editPostButton").on('click', (event) => {
    editContent(id)
})


$('newPostButton').on('click', () => {
    console.log("new post button clicked")
})


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

$("#signupButton").on('click', () => {
  
    let email = $("#userFormEmail").val();
    let password = $("#userFormPassword").val();
    console.log("sign up :" + email + " " + password)
    handleSignup(email, password);
})

const handleSignup = async (email, password) => {
    await fetch(`/user/`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
        .then((_res) => {
            window.location.href = "/"
        })
        .catch((err) => {
            console.log(err)
        })
    })
}