// select inout for Post ID
const postID = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;


    await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: json.stringify({
            title: title,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};


const deleteClickHandler = async function () {
    await fetch(`/api/post${postID}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

// listeners/selectors

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteClickHandler);

