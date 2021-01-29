# Torre Notifications

This project was made for Torre as a technical test.

I choose to develop a push notification system because Torre only sends
email notifications, which I feel it's pretty good right now but as 
the product grows and implements all the features highlighted on the
videos like online courses and education, I figured it would be nice to be
notified directly in my phone when a webinar or a course that interest me
will take place.

## Useful links
[Demo page](https://torre-job-notification.web.app)

[My Torre Genome](https://bio.torre.co/en/eddieisaac)

## Progress Log
```
January 26

10:52am - 2:05pm -> Explored Torre's current features, jobs/gigs, search criteria, genome and signals.

3:00pm - 5:22pm -> Started brainstorming ideas based on the current features, accessible data and time limit.
                   Two ideas came out of brainstorming, one for a coding challenge platform integration linked by username
                   but I couldn't find a coding challenge platform with a public API.
                   The second and chosen idea was a job notification feature for desktop and mobile.

5:30pm - 7:34pm -> Analyzed the problem and data model to get around the technology stack.
                   Decided on VueJS and Vuetify on the front-end and Firebase on the back-end.
                   VueJS will serve great for fast development and I'll be using Firebase Cloud Functions to run a
                   Pub/Sub that will check registered user new opportunities and send them through notifications using
                   Firebase Cloud Messaging while also storing the data on Firestore to avoid sending already sent
                   notifications.
                   The notification criteria will be limited to "best for" and "dream job" as per the time limit.

8:00pm - 9:00pm -> Created and made the initial configuration of the VueJS project, GitHub repository, Firebase project

10:28pm - 11:00pm -> Connected VueJS project with Firebase, initialized both Firestore and Messaging. Commited changes to GitHub


January 27

10:30am - 12:35am -> Designed and developed project homepage

1:00pm - 1:28pm -> Started to develop the algorithm needed to fetch user data from Torre, I tried to use axios to make the request
          directly from the browser but the api endpoint has cross-origin access disabled.
          Because of this I decided to handle requests from Cloud Functions, It's going to be a bit slow on the first fetch
          because of the cold start needed on serverless backend services.

4:00pm - 7:22pm -> Finished the fetch algorithm on cloud functions and is now showing correctly on the front-end.

7:30pm - 9:22pm -> Finished the ask for notification permissions, save, update and delete user on firebase.

10:10pm - 11:20pm -> Started developing the Pub/Sub, this will be checking every 5 minutes for new job opportunities and marking
                     the ones already sent through notifications, the first thing to do will be fetching and storing the job ID's
                     on the user document on firebase.
                     Finished the pub/sub.

January 28

11:20am - 12:19pm -> Finished basic functionality, app now registers device and username and sends a notification everytime a new job
                     is listed on "Best for me" filter.

12:28pm -> For testing purposes, I decided to show a list of the last job notifications and the ability to mark them as unread to
           force the notification to trigger again.

12:59:pm - 1:38pm -> Pub/Sub modified to store the data needed to show the last jobs on the front-end
                     Notification improved, now it gives the details of the job when it's only 1 job in the alert

2:30pm - 4:48pm -> Front-end updated to show the list of the last job notifications, this list is shown to every user but
                   there's a test mode button, this will help to delete job alerts to receive them later through notifications

5:15pm - 5:58pm -> Tidying up everything, cleaning some code, testing functionality

6:00pm -> Preparing deliverables and writing GitHub readme

```
