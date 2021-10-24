# Trucking Dispatcher Features


## Graceful Conflict Handling
![conflict-handling-1](https://s7.gifyu.com/images/time-options-few.png)
Fig 1. One way I was able to handle conflicts was to only offer the dipatcher available times when booking appointments. 

![conflict-handling-2](https://s7.gifyu.com/images/conflict-handling.png)
Fig 2. If the dispatcher wants to check the availability for a given timeslot on a given day, he can use the __check availability__ feature. Here, the dispatcher can specify the week, day, start time, end time, task type and location before seeing if this task would conflict with existing tasks. The dispatcher can see the number of conflicting tasks and total tasks booked for each driver on that specific day. He can then choose to book the task with any of the three drivers. Booking with a driver that has conflicting tasks would result in the deletion of those conflicting tasks. After submission, the task is added to the schedule and the dispatcher is redirected to the driver's timetable on the corresponding week where he can review the task newly booked task. 

## Skip to Week/Back to Current Week
In order to avoid repeatedly clicking on the left and right arrows to get to a given week, the dispatcher can use this feature to skip to a specified week (1-52). The dispatcher can also use the __current week__ feature to get back to the current week (which is dynamically calculated, not hard coded).

## Deployment
You can find a live version of my project hosted on github pages [here](https://sophdubs.github.io/dispatcher/)

## Known Issues
Overall, I am very happy with the functionality and features of my app. 
However, due to to my current enrollement in a full time web development bootcamp, I was unable to address certain issues in my project. Here is a list of things I wish I could have done:
- Thoroughly test all of the functions in my  ```helpers.js``` file
- Refactor the functions in ```helper.js```
- Implement better state management
