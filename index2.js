firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log(user)
    
    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>
    `
    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()
    
      // redirect to the home page
      document.location.href = `index.html`
    })
     
    // Build the URL for our cryptoPosts API
    let url = `/.netlify/functions/cryptoPosts`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Write the json-formatted data to the console in Chrome
    console.log(json)

    // Grab a reference to the element with class name "cryptoPosts" in memory
    let postsDiv = document.querySelector(`.cryptoPosts`)

    // Loop through the JSON data, for each Object representing a post:
    for (let i=0; i < json.length; i++) {
      // Store each object ("post") in memory
      let post = json[i]

      // Store the post's ID in memory
      let postId = post.id

      // Create an empty string for the comments
      let comments = ``

      // Loop through the post's comments
      for (let i=0; i < post.comments.length; i++) {
        // Create a variable for each comment
        let comment = post.comments[i]

        // Add HTML markup for the comment to the comment string
        comments = comments + `<div><strong>${comment.userName}</strong> ${comment.body}</div>`
      }

      // Create some markup using the post data, insert into the "cryptoPosts" element
      postsDiv.insertAdjacentHTML(`beforeend`, `
      <div class="md:mt-16 mt-8">
          <div class="md:mx-0 mx-4 mt-8">
            <span class="font-bold text-xl">${post.userName}</span>
          </div>
      
          <div class="my-8">
            <span class>"${post.body}"</span> 
          </div>

          <div class="text-3xl md:mx-0 mx-4 mb-4">
            <button id="like-button-${postId}">❤️</button>
            ${post.numOfLikes}
          </div>

          ${comments}

          <form class="mt-4">
            <input type="text" id="comment-${postId}" class="mr-2 rounded-lg border px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Add a comment...">
            <button id="post-comment-button-${postId}" class="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-purple-600 focus:outline-none">Post</button>
          </form>
        </div>
      `)

      // comments
      // get a reference to the newly created post comment button
      let postCommentButton = document.querySelector(`#post-comment-button-${postId}`)

      // event listener for the post comment button
      postCommentButton.addEventListener(`click`, async function(event) {
        // ignore the default behavior
        event.preventDefault()

        // get a reference to the newly created comment input
        let commentInput = document.querySelector(`#comment-${postId}`)

        // get the body of the comment
        let commentBody = commentInput.value

        // Build the URL for our posts API
        let url = `/.netlify/functions/create_cryptoComments?postId=${postId}&userName=${user.displayName}&body=${commentBody}`

        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
        
        // refresh the page
        location.reload()
      })

      // 🔥 Lab - like button
      // get a reference to the newly created post comment button
      let likeButton = document.querySelector(`#like-button-${postId}`)

      // event handler for the "like" button
      likeButton.addEventListener(`click`, async function(event) {
        // create the URL for our "create like" lambda function
        let url = `/.netlify/functions/create_cryptoLikes?userId=${user.uid}&postId=${postId}`

        // fetch the URL, wait for the response, store the response in memory
        let response = await fetch(url)

        // refresh the page
        location.reload()
      })
      
    }

    // get a reference to the "Post" button
    let postButton = document.querySelector(`#post-button`)

    // handle the clicking of the "Post" button
    postButton.addEventListener(`click`, async function(event) {
      // prevent the default behavior (submitting the form)
      event.preventDefault()

      // get a reference to the input holding the image URL
      let bodyInput = document.querySelector(`#cryptoPostsBody`)

      // store the user-inputted image URL in memory
      let postBody = bodyInput.value

      // create the URL for our "create post" lambda function
      let url = `/.netlify/functions/create_cryptoPosts?userName=${user.displayName}&body=${postBody}`

      // fetch the URL, wait for the response, store the response in memory
      let response = await fetch(url)

      // refresh the page
      location.reload()
    })

  }  

  else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index2.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
