const commentFormHandler = async function(event) {
    event.preventDefault();

    const postID = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        await fetch('/api/comments', {
            method: 'POST',
            body: json.stringify({
                postID: postID,
                body: body
            }),
            headers: { 'Content-Type': 'application/json'}
        });

        // reload
        document.location.reload();
    }

};

// select comment input and add listener to button
document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler)