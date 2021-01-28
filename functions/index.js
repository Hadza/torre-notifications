const functions = require('firebase-functions');
const admin = require('firebase-admin');
const initFunction = {}

exports.processNewJobs = functions.pubsub.schedule('every 1 minutes').onRun(() => {
    const axios = require('axios');
    initFirebase(admin, 'processNewJobs')

    admin.firestore().collection('users').get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                let user = doc.data()
                const previous_jobs = user.jobs ? user.jobs:[]
                let new_jobs = []

                const query = {and:[{bestfor:{username:user.profile.username}},{status:{"code":"open"}}]}
                const page = "https://search.torre.co/opportunities/_search/?size=10"

                axios.post(page, query)
                    .then(res => {
                        functions.logger.log(res)
                        res.data.results.forEach(job => {
                            if(previous_jobs.findIndex(x => x.id === job.id) === -1)
                                new_jobs.push({
                                    id: job.id,
                                    objective: job.objective,
                                    type: job.type,
                                    organization: job.organizations[0],
                                    status: job.status
                                })
                        })
                        if(new_jobs.length > 0){
                            sendNotification(user, new_jobs)
                            admin.firestore().collection('users').doc(user.profile.username)
                                .update({jobs:previous_jobs.concat(new_jobs)})
                        }
                    })
            })
        })
})

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
                        preferences: {}
                    }

                    if(snapshot.exists){
                        const user = snapshot.data()
                        response.preferences = user.preferences
                    }
                    return response
                })
        }).catch(() => {
            return false
    })
});

function sendNotification(user, jobs){
    const title = 'New opportunities found!'
    const image = 'https://res.cloudinary.com/torre-technologies-co/image/upload/v1601512321/origin/bio/organizations/Torre_logo_small_uubm3e.png'
    let body = ""
    let link = ""

    if(jobs.length > 1){
        body = 'You have ' + jobs.length + ' new opportunities, click to find out.'
        link = 'https://torre.co/search/jobs?q=bestfor%3A' + user.profile.username
    }else{
        body = jobs[0].organization.name + ' is looking for ' + jobs[0].objective + ', see if you are a fit.'
        link = 'https://torre.co/jobs/' + jobs[0].id
    }

    let payload = {
        token:user.preferences.token,
        notification: {
            title,
            body,
            image
        },
        webpush: {
            fcm_options: {
                link
            }
        },

    }

    admin.messaging().send(payload)
        .then(res => {
            functions.logger.log('jalo')
            functions.logger.log(res)
        }).catch(err => {
        functions.logger.log('error')
        functions.logger.log(err)
    })
}

//Checks if this instance was created previously
//and keeps firebase from initializing and impact
//performance.
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
