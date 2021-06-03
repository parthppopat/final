// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_cryptoComment?postId=xxxxxxxxx&userName=xxx&body=xxxx
exports.handler = async function(event) {

  // get the three querystring parameters and store in memory
  let postId = event.queryStringParameters.postId
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection('cryptoComments').add({
    postId: postId,
    userName: userName,
    body: body,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}