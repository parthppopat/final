// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/create_cryptoPosts?userName=KoreanInvestor3&body=
exports.handler = async function(event) {

  // get the two querystring parameters and store in memory
  let userName = event.queryStringParameters.userName
  let body = event.queryStringParameters.body

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post, wait for it to return
  await db.collection('cryptoPosts').add({
    userName: userName,
    body: body,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })

  return {
    statusCode: 200
  }
}
