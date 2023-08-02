const deletePostDialog = document.getElementById("deletePostDialog")


const handleDeletePost = (id) => {
    console.log("delete post " + id)
    deletePostDialog.returnValue = id
    deletePostDialog.showModal()
    
}