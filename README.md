
## Live application
The Live application can be found here: \
[https://chainalysis-dex.netlify.app/](https://chainalysis-dex.netlify.app/)

## Detailed instructions on how to build and run 
this can be found in each "client" and "server" directories. \
If run locally, the baseURL in "/client/src/apis/coinGecko.js" must be changed to "http://localhost:8005"

## Questionnaire:

**Are there any sub-optimal choices( or shortcuts taken due to limited time ) in your implementation?**

No there is not.

**Is any part of it over-designed? ( It is fine to over-design to showcase your skills as long as you are clear about it)**

In this app, I tried to deliver a modern design to the users given the limited time and my part-time job.

**If you have to scale your solution to 100 users/second traffic what changes would you make, if any?**

Here is a list of my go-to approaches: 
1. Ease server load by Distributing Traffic
2. Reduce read load by adding more read replicas.
3. Reduce write requests.

**What are some other enhancements you would have made, if you had more time to do this implementation**

If I had more time I would definitely implemented more exchange/service providers and added more currencies to the dex.\
I would also have enhanced the UX & the UI by adding more animation, etc...
