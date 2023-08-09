


const handleDeletePost = async (id) => {
    console.log("called handledeletepost " + id)
    await fetch(`/post/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((_res) => {
        location.reload()
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleDeleteComment = async (id) => {
    console.log("called handledeletecomment " + id)
    await fetch(`/comment/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((_res) => {
        location.reload()
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleEditPost = async (id=null) => {
    console.log("called handleeditpost " + id)
    let title = $("#postTitle").val();
    let content = $("#postContent").val();
    console.log(title, content)
    let method = id ? "PUT" : "POST";
    await fetch(`/post/${id ? id : ""}`, {
        method: method,
        body: JSON.stringify({
            post_title: title,
            post_content: content
            }),
        headers: {
            "Content-Type": "application/json"
            },
        })
        .then((_res) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleEditComment = async (blogId) => {
    let content = $("#commentContent").val();
    await fetch('/comment/', {
        method: "POST",
        body: JSON.stringify({
            blogpost_id: blogId,
            comment_content: content
            }),
        headers: {
            "Content-Type": "application/json"
            },
        })
        .then((_res) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}

const handleSignup = async () => {
    let authorName = $("#signupAuthorName").val();
    let email = $("#signupEmail").val();
    let password = $("#signupPassword").val();
    await fetch(`/user/`, {
        method: "POST",
        body: JSON.stringify({
            author_name: authorName,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((_res) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}


//.modal for confirming a callback function
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


//modal for editing a blogpost
const editBlogpost = (id=null, content=null, title=null) => {
    let editBlogpostDialog = $(`
    <div class="modal fade" id="editPostDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <input 
                        type="text" 
                        class="form-control"  
                        id="postTitle" 
                        placeholder="blog title"
                        value="${title ? title : ""}"
                    ></textarea>
                    <button 
                        type="button" 
                        class="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <textarea 
                        class="form-control" 
                        id="postContent" 
                        placeholder="blog text"
                        rows="10"
                    >${content ? content : ""}</textarea>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary cancelButton" 
                        data-bs-dismiss="modal">Cancel</button>
                    <button 
                        type="button" 
                        class="btn btn-primary confirmButton"
                    >Post</button>
                </div>
            </div>
        </div>
    </div>
    `)

    editBlogpostDialog.find(".confirmButton").on("click", function () {
        handleEditPost(id)
        editBlogpostDialog.modal("hide");
    })

    editBlogpostDialog.modal("show");
}


const editComment = (id=null, content=null, title=null) => {
    let editCommentDialog = $(`
    <div class="modal fade" id="editPostDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                <textarea 
                    class="form-control" 
                    id="commentContent" 
                    placeholder="comment text"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" 
                        class="btn btn-secondary cancelButton" 
                        data-bs-dismiss="modal"
                    >Cancel</button>
                    <button 
                        type="button" 
                        class="btn btn-primary confirmButton"
                    >Post</button>
                </div>
            </div>
        </div>
    </div>
    `)

    editCommentDialog.find(".confirmButton").on("click", function () {
        handleEditComment(id)
        editCommentDialog.modal("hide");
    })

    editCommentDialog.modal("show");
}

const signupDialog = () => {
    let signupDialog = $(`
    <div class="modal fade" id="editPostDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                <input type="text" class="form-control" id="signupAuthorName" placeholder="author name" autocomplete="off">
                <input type="text" class="form-control" id="signupEmail" placeholder="email" autocomplete="off">
                <input type="password" class="form-control" id="signupPassword" placeholder="password" autocomplete="off">
                <div class="modal-footer">
                    <button type="button" 
                        class="btn btn-secondary cancelButton" 
                        data-bs-dismiss="modal"
                    >Cancel</button>
                    <button 
                        type="button" 
                        class="btn btn-primary confirmButton"
                    >Sign up!</button>
                </div>
            </div>
        </div>
    </div>
    `)

    signupDialog.find(".confirmButton").on("click", function () {
        handleSignup()
        signupDialog.modal("hide");
    })

    signupDialog.modal("show");
}



$(".editPostButton").on('click', (event) => {
    let id = event.target.getAttribute("data-id");
    let content = $(event.target).parent().siblings(".post-content").attr("data-post-content");
    let title = $(event.target).parent().siblings(".post-title").attr("data-post-title");
    editBlogpost(id, content, title)
})


$('#newPostButton').on('click', () => {
    console.log("new post button clicked")
    editBlogpost()
})

$('.newCommentButton').on('click', (event) => {
    let postId = event.target.getAttribute("data-id");
    editComment(postId)
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
    signupDialog()
})

