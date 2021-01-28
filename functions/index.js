const functions = require('firebase-functions');
const admin = require('firebase-admin');
const initFunction = {}


exports.getUserData = functions.https.onCall((data) => {
    const axios = require('axios');
    const username = data.username

    return axios.get("https://torre.bio/api/bios/" + username)
        .then(res => {
            initFirebase(admin, 'getUserInfo')
            return admin.firestore().collection('users').doc(username)
                .get()
                .then(snapshot => {
                    let response = {
                        profile: {
                            name: res.data.person.name,
                            picture: res.data.person.picture
                        },
                        preferences: undefined
                    }

                    if(snapshot.exists){
                        response.preferences = snapshot.data()
                    }
                    return response
                })
        }).catch(() => {
            return false
    })
});

function initFirebase(admin,name){
    if(!initFunction[name]){
        functions.logger.info(name + ' - Initialized')
        admin.initializeApp();
        initFunction[name] = true
        initFunction.counter = 1
    }else{
        initFunction.counter += 1
        functions.logger.info(name + ' - Fired again - Count ' + initFunction.counter)
    }
}
