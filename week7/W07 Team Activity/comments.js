export default class Comments {
    constructor() {
        this.load();
    }

    load() {
        this.commentsList = [];
        let jsonString = localStorage.getItem("commentsList");
        if(jsonString !== null) {
            this.commentsList = JSON.parse(jsonString);
        }
    }

    save() {
        let jsonString = JSON.stringify(this.commentsList);
        localStorage.setItem("commentsList", jsonString);
    }

    createCommentsListElement() {
        /*let commentsHTML = "";
        this.commentsList.forEach(comment => {
            commentsHTML += `<div>
                             <h3>${comment.name}</h3>
                             <h4>${comment.date}</h4>
                             <p>${comment.content}</p>
                             </div>`;
        });

        return commentsHTML; */

        let commentsListElement = document.createElement("div");
        let headerElement = document.createElement("h2");
        headerElement.innerHTML = "Comments";
        commentsListElement.appendChild(headerElement);

        this.commentsList.forEach(comment => {
            let nameElement = document.createElement("h3");
            let dateElement = document.createElement("h4");
            let contentElement = document.createElement("p");
            
            nameElement.innerHTML = comment.name;
            dateElement.innerHTML = comment.date;
            contentElement.innerHTML = comment.content;
            
            commentsListElement.appendChild(nameElement);
            commentsListElement.appendChild(dateElement);
            commentsListElement.appendChild(contentElement);
        });

        return commentsListElement;
    }

    createCommentForm() {
        let commentForm = document.createElement("div");

        let textInput = document.createElement("input");
        textInput.setAttribute("type", "textarea");
        textInput.setAttribute("id", "commentInput");

        let submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit Comment";
        submitButton.addEventListener("click", event => this.addComment(event));

        commentForm.appendChild(textInput);
        commentForm.appendChild(submitButton);

        return commentForm;
    }

    addComment(event) {
        let commentForm = event.target.parentNode;
        let commentContent = commentForm.firstElementChild.value;
        let hikeName = commentForm.parentNode.id.replace("_", " ");

        let comment = {
            name: hikeName,
            date: new Date(),
            content: commentContent
        };

        this.commentsList.unshift(comment);
        this.save();
    }

    removeComment(comment) {
        //find and remove comment in commentsList
        let removed = false;
        for (let i = 0; i < this.commentsList.length && !removed; i++) {
            if (this.commentsList[i] === comment) {
                this.commentsList.splice(i, 0);
                removed = true;
            }
        }

        this.save();
    }
}
