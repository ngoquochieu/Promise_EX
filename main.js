var users = [
  {
    id: 1,
    name: 'Kien Dam'
  },
  {
    id: 2,
    name: 'Son Dang'
  },
  {
    id: 3,
    name: 'Hung Dam'
  },
  //....
];

var comments = [
  {
    id: 1,
    user_id: 1,
    content: 'abc'
  },
  {
    id: 2,
    user_id: 2,
    content: 'def'
  }
];

function getComment() {
  return new Promise ((resolve, reject) => {
    setTimeout(function () {
        resolve(comments);
    }, 1000);
  });
}

getComment()
  .then(comments => {
    var userIds  = comments.map( comment => {
        return comment.user_id;
    });

    return getUsersByIds(userIds)
      .then (users => {
          return {
            users: users,
            comments: comments,
          } 
      });
  })
  .then (data => {
    var commentsBoxElement = document.querySelector('#comments-box');
    var html = '';
    data.comments.forEach(element => {
      var user = data.users.find(user => {
        return user.id === element.user_id;
      });
      html += `<li>${user.name}:${element.content}</li>`;
    });
    commentsBoxElement.innerHTML = html;
  })



function getUsersByIds(usersId) {
    return new Promise ((resolve, reject) => {

      var result = users.filter(user => {
        return usersId.includes(user.id);
      });

      setTimeout(() => {
        resolve(result);
      }, 1000);    
  });
}





